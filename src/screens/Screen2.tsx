import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { PermissionContext } from '../context/PermissionContext';

export const Screen2 = ()=> {

    const {permissions,questionLocationPermission} = React.useContext(PermissionContext);

    return (
        <View style={{
            justifyContent:'center',
            alignItems:'center',
            flex:1
        }}>
          
           <TouchableOpacity
            onPress={questionLocationPermission}
            style={{
                backgroundColor:'rgba(0,0,0,0.6)',
                borderRadius:6
            }}
           >
               <Text style={{
                   color:'white',
                   padding:10,
                   fontSize:18
               }}>Permisos</Text>
            </TouchableOpacity>

            <Text>{JSON.stringify(permissions,null,3)}</Text>

        </View>
    )
}
