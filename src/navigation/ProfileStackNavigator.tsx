import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfileScreen from '../screen/EditProfileScreen';
import ProfileScreen from '../screen/ProfileScreen';

import {ProfileStackNavigatorParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>();
// type momentsLogo = Image
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />

      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
