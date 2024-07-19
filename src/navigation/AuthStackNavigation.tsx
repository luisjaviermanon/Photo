import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreenStackNavigatorParamList} from '../types/navigation';
import SignInScreen from '../screen/AuthScreen/SignInScreen';
import SignUpScreen from '../screen/AuthScreen/SignUpScreen';
import ConfirmEmailScreen from '../screen/AuthScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screen/AuthScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screen/AuthScreen/NewPasswordScreen';

const Stack = createNativeStackNavigator<AuthScreenStackNavigatorParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign in"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Sign up" component={SignUpScreen} />
      <Stack.Screen name="Confirm email" component={ConfirmEmailScreen} />
      <Stack.Screen name="Forgot password" component={ForgotPasswordScreen} />
      <Stack.Screen name="New password" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
