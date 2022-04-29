import React from 'react'
import { AppState, Platform } from "react-native";
import { check,PERMISSIONS, PermissionStatus, request, openSettings} from 'react-native-permissions';

export interface PermissionState{
    locationStatus: PermissionStatus
}

export const permissionInitState : PermissionState = {
    locationStatus : "unavailable"
}

type PermissionContextProps = {
    permissions: PermissionState,
    questionLocationPermission: ()=>void,
    checkLocationPermission: ()=>void
}

export  const PermissionContext = React.createContext( {} as PermissionContextProps );

export const PermissionProvider = ({children} : {children : JSX.Element | JSX.Element[]})=>{

    const [permissions, setPermissions] = React.useState( permissionInitState );
    

    React.useEffect(() => {

       AppState.addEventListener('change', state => {
            if(state !== "active")
                return;
            
            checkLocationPermission();
            
       })

    }, []);
    
    const questionLocationPermission = async()=>{
        const status = (Platform.OS === 'ios') ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);


        if(status === "blocked"){
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus:status
        });
    }

    const checkLocationPermission = async()=>{
        const status = (Platform.OS === 'ios') ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        setPermissions({
            ...permissions,
            locationStatus:status
        });
    }

    return(
        <PermissionContext.Provider value={{
            questionLocationPermission,
            checkLocationPermission,
            permissions
        }}>
            {children}
        </PermissionContext.Provider>
    );
}