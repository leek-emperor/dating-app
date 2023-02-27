import React, {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '@/pages/Login';
import XLayout from '@/pages/XLayout';
import NewCustomer from '@/pages/NewCustomer';
import {observer} from 'mobx-react';
import {useAppContext} from '@/store/index.context';
const Stack = createNativeStackNavigator();

export default observer(function Navigation() {
  const {userStore} = useAppContext();
  const {getAuth, isAuth} = userStore;
  useLayoutEffect(() => {
    getAuth();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuth ? (
          <Stack.Screen
            name="XLayout"
            component={XLayout}
            options={{headerShown: false}}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
