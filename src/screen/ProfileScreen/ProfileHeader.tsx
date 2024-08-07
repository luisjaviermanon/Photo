import {View, Text, Image} from 'react-native';
import React from 'react';
import {signOut} from 'aws-amplify/auth';
import users from '../../assets/data/users.json';

import styles from './styles';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../types/navigation';
import {useAuthContext} from '../../contexts/AuthContext';
const ProfileHeader = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const {user, handleSignOut} = useAuthContext();

  return (
    <View style={styles.row}>
      <View style={styles.headerRow}>
        {/* profile image */}
        <Image source={{uri: users.image}} style={styles.avatar} />
        {/* post followers, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{users.posts.length}</Text>
          <Text>Post</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>88</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>100</Text>
          <Text>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{users.name}</Text>
      <Text>{users.bio}</Text>
      {/* Buttons */}
      <View style={{flexDirection: 'row'}}>
        <Button
          text="Edit Profile"
          onPress={() => navigation.navigate('Edit Profile')}
        />
        <Button text="Sign out" onPress={handleSignOut} />
      </View>
    </View>
  );
};
export default ProfileHeader;
