import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Screen1 } from '../screens/Screen1';
import { Screen2 } from '../screens/Screen2';
import { PermissionContext } from '../context/PermissionContext';


const Stack = createStackNavigator();

export const MyStack = () => {
  const {permissions} = React.useContext(PermissionContext);

  if( permissions.locationStatus === "unavailable" )
    return(<Text>Cargando...</Text>)

  return (
    <Stack.Navigator
      initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle:{
          backgroundColor:'white'
        }
      }}
    >
    {
      permissions.locationStatus === "granted" ?
      <Stack.Screen name="MapScreen" component={Screen1} /> :
      <Stack.Screen name="PermissionsScreen" component={Screen2} />
    }
    </Stack.Navigator>
  );
}

