import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '@/pages/Login';
import XLayout from '@/pages/XLayout';
import NewCustomer from '@/pages/NewCustomer';
import {observer} from 'mobx-react';
const Stack = createNativeStackNavigator();

export default observer(function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NewCustomer"
          component={NewCustomer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="XLayout"
          component={XLayout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
