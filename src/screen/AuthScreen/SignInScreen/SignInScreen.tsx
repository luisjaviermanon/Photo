import {useState} from 'react';
import {
  Alert,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signIn} from 'aws-amplify/auth';
import {useForm} from 'react-hook-form';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useAuthContext} from '../../../contexts/AuthContext';
import {SignInNavigationProp} from '../../../types/navigation';
type SignInData = {
  email: string;
  password: string;
};
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<SignInNavigationProp>();
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthContext();
  const {control, handleSubmit, reset} = useForm<SignInData>();
  const Logo = require('../../../assets/images/logo.png');
  const onSignInPressed = async ({email, password}: SignInData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const cognitoUser = await signIn({username: email, password});
      // Todo save user data in context
      setUser(cognitoUser);
    } catch (e) {
      if ((e as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('Confirm email', {email});
      }
      Alert.alert('Ops', (e as Error).message);
    } finally {
      setLoading(false);
      reset();
    }
    // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <FormInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
