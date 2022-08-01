import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Fab = ( {onPress,style,icon} : {onPress : ()=>void , style : any,icon:string} )=> {
    return (
        <View style={{
            ...style,
            zIndex:999,
            position:'absolute',
            justifyContent:'center',
            alignItems:'center',
            width:50,
            height:50,
            borderRadius:10,
            backgroundColor:'#2980B9',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        }}>
           <TouchableOpacity
            activeOpacity={.8}
            onPress={onPress}
           >
                <Icon name={icon} size={35} color="#fff"/>
           </TouchableOpacity>
        </View>
    )
}
