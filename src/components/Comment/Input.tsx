import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

const Input = () => {
  const [newComment, setNewComment] = useState('');
  const onPost = () => {
    console.warn('Posting the comment');
    setNewComment('');
  };
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
        }}
        style={styles.image}
      />
      <TextInput
        placeholder="Write your comment..."
        style={styles.input}
        onChangeText={newText => setNewComment(newText)}
        value={newComment}
        multiline
      />
      <Text style={styles.button} onPress={onPost}>
        Post
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-end',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
    paddingRight: 50,
  },
  button: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});
export default Input;
