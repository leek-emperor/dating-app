import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import StartPage from '@/pages/StartPage';
import Login from '@/pages/Login';
import XLayout from '@/pages/XLayout';
import NewCustomer from '@/pages/NewCustomer';
import Tan from '@/pages/Tan';
import UserPage from '@/pages/UserPage';
import {observer} from 'mobx-react';
import Chat from '@/pages/Chat';
const Stack = createNativeStackNavigator();

export default observer(function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="StartPage"
          component={StartPage}
          options={{headerShown: false, animationTypeForReplace: 'pop'}}
        /> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, animationTypeForReplace: 'pop'}}
        />
        <Stack.Screen
          name="NewCustomer"
          component={NewCustomer}
          options={{headerShown: false, animationTypeForReplace: 'pop'}}
        />
        <Stack.Screen
          name="XLayout"
          component={XLayout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tan"
          component={Tan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserPage"
          component={UserPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
