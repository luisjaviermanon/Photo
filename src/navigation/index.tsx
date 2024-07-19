import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CommentsScreen from '../screen/CommentsScreen/CommentsScreen';
import ButtonTabNavigator from './ButtonTabNavigator';
import {RootNavigationParamList} from '../types/navigation';
import AuthStackNavigator from './AuthStackNavigation';
import {useAuthContext} from '../contexts/AuthContext';
const Stack = createNativeStackNavigator<RootNavigationParamList>();
const Navigation = () => {
  const {user} = useAuthContext();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {!user ? (
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={ButtonTabNavigator}
              options={{headerShown: false}}
            />

            <Stack.Screen name="Comments" component={CommentsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
