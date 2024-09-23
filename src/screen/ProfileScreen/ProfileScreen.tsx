import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import user from '../../assets/data/users.json';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView/FeedGridView';
import {
  UserProfileNavigationProp,
  UserProfileRouteProp,
  MyProfileNavigationProp,
  MyProfileRouteProp,
} from '../../types/navigation';
const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  const userId = route.params?.userId;
  // query the user with user.Id
  return (
    <FeedGridView
      data={user.posts}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      keyExtractor={(item, index) => item.id.toString() || index.toString()}
    />
  );
};

export default ProfileScreen;
