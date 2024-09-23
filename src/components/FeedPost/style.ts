import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';
import font from '../../themes/fonts';

export default StyleSheet.create({
  post: {},
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  userName: {
    fontWeight: font.weight.bold,
    color: colors.black,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  threeDots: {
    marginLeft: 'auto',
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    paddingHorizontal: 5,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: font.weight.bold,
  },
});
