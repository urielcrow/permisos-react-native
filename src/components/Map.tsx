import React from 'react'
import { View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'; 
import { useLocation } from '../hooks/useLocation';
import { Fab } from '../components/Fab';

interface Props {
    markers?:Marker[]
}

export const Map = ({markers} :Props)=> {

    const [showRoute,setShowRoute] = React.useState(true);

    const {hasLocation,initialPosition,getCurrentLocation,followUserLocation,userLocation,stopFolowUserLocation,route} = useLocation();
  
    const mapViewRef = React.useRef<MapView>();//asignar una referencia a nuestro mapa

    const flagTouchUser = React.useRef(false);//si queremos que cuando el usuario se mueva a otro lado del pmapa deje de seguir al objetivo

    React.useEffect(()=>{
        followUserLocation();//activamos la suscripción para saber cuando el usuario se mueve
        return()=>{
            stopFolowUserLocation();//cancelamos la suscripción
        }

    },[]);

    React.useEffect(()=>{//gracias a la suscripción el userLocation(useState) nos indica el cambio

        if(flagTouchUser.current)
            return;

        const {latitude,longitude} = userLocation;
        mapViewRef.current?.animateCamera({
            center:{
                latitude,
                longitude
            }
        })
    },[userLocation]);

    const centerPosition = async()=>{
        flagTouchUser.current = false;
        const {latitude,longitude} = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center:{
                latitude,
                longitude
            }
        })
    }
    
    if(!hasLocation){
        return <Text>Cargando2...</Text>
    }

    return (
       <>
            <MapView
                ref={(el)=>mapViewRef.current = el!}
                //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{flex:1}}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onTouchStart={()=>flagTouchUser.current=true}
            >
            {

                showRoute &&
                <Polyline 
                    coordinates={route}
                    strokeColor="black"
                    strokeWidth={3}
                />
            }

            {/* <Marker
                coordinate={{
                    latitude: 20.668951,
                    longitude: -103.4002761,
                }}
                title="titulo"
                description="description"
            /> */}

            </MapView>
            <Fab 
                onPress={centerPosition} 
                style={{ 
                    bottom:10,
                    right:10
                }} 
                icon="dot-circle-o"
            />

             <Fab 
                onPress={ () => setShowRoute(!showRoute)} 
                style={{ 
                    bottom:10,
                    left:10
                }} 
                icon="user"
            />
        </>
    )
}
