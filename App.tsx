import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {MyStack} from './src/navigate/MyStack';
import { PermissionProvider } from './src/context/PermissionContext';


const App = ()=> {
  return (
    <PermissionProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PermissionProvider>
  )
}

export default App;