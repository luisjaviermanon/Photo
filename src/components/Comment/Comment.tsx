import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../themes/colors';
import font from '../../themes/fonts';
import {Comment as CommentType} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config/index';

interface ICommentProps {
  comment: CommentType;
  includeDetails: boolean;
}
const Comment = ({comment, includeDetails = false}: ICommentProps) => {
  const [isLiked, setIsLisked] = useState(false);
  const toggleLike = () => {
    setIsLisked(v => !v);
  };
  return (
    <View style={styles.comment}>
      {includeDetails && (
        <Image
          source={{uri: comment.User?.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />
      )}

      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>{' '}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 5,
  },
  bold: {
    fontWeight: font.weight.bold,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 5,
  },
  middleColumn: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    marginRight: 5,
    color: colors.grey,
  },
});
export default Comment;
