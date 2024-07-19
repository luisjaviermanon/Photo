import React, {useState} from 'react';
import {View, Text, Image, SafeAreaView, Pressable} from 'react-native';
import colors from '../../themes/colors';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Comment from '../Comment';
import styles from './style';
import {IPost} from '../../types/models';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import {FeedNavigationProp} from '../../types/navigation';
interface IFeedPost {
  post: IPost;
  isVisible: boolean;
}
const FeedPost = ({post, isVisible}: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation<FeedNavigationProp>();
  const navigateToUser = () => {
    navigation.navigate('UserProfile', {userId: post.user.id});
  };
  const navigateToComments = () => {
    navigation.navigate('Comments', {
      postId: post.id,
    });
  };
  const ToggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(v => !v);
  };
  const ToggleLike = () => {
    setIsLiked(v => !v);
  };

  let content;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={ToggleLike}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={ToggleLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={ToggleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }
  return (
    <SafeAreaView style={styles.post}>
      {/*  Header*/}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user.image,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.user.username}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>
      {/*  Content*/}
      {content}
      {/*  Footer*/}
      <View>
        <View style={styles.iconContainer}>
          <Pressable onPress={ToggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>
        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>Anna</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} other</Text>
        </Text>
        {/* Post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          {post.description}
        </Text>
        <Text style={{color: colors.grey}} onPress={ToggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>
        {/* Comments */}
        <Text style={{color: colors.grey}} onPress={navigateToComments}>
          View all {post.nofComments} comment
        </Text>
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {/* Posted date */}
        <Text style={{color: colors.grey}}>{post.createdAt}</Text>
      </View>
    </SafeAreaView>
  );
};

export default FeedPost;
