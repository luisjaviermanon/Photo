import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller, Control} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import users from '../../assets/data/users.json';
import colors from '../../themes/colors';
import fonts from '../../themes/fonts';
import {IUser} from '../../types/models';
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
type IEditableUserField = 'name' | 'username' | 'bio' | 'website';
type IEditableUser = Pick<IUser, IEditableUserField>;
interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({
  control,
  label,
  name,
  multiline = false,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    rules={rules}
    name={name}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Hello"
              style={[
                styles.input,
                {borderColor: error ? colors.error : colors.border},
              ]}
              multiline={multiline}
            />
            {error && (
              <Text style={{color: colors.error}}>{error.message}</Text>
            )}
          </View>
        </View>
      );
    }}
  />
);
const EditProfile = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<IEditableUser>({
    defaultValues: {
      name: users.name,
      username: users.username,
      bio: users.bio,
      website: users.website,
    },
  });
  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };
  const onSubmit = (data: IEditableUser) => {
    console.log('submit', data);
  };
  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || users.image}}
        style={styles.avatar}
      />
      <Text style={styles.textButton} onPress={onChangePhoto}>
        Change profile photo
      </Text>
      <CustomInput
        name="name"
        control={control}
        label="name"
        rules={{required: 'Name is required'}}
      />
      <CustomInput
        name="username"
        control={control}
        label="Username"
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be more than 3 character',
          },
        }}
      />
      <CustomInput
        name="website"
        control={control}
        label="Website"
        rules={{
          required: 'Website is required',
          pattern: {value: URL_REGEX, message: 'Invalid URL'},
        }}
      />
      <CustomInput
        name="bio"
        control={control}
        label="Bio"
        multiline
        rules={{
          required: 'Bio is required',
          maxLength: {
            value: 200,
            message: 'Bio should be less than 200 character',
          },
        }}
      />
      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        Submit
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  page: {
    alignItems: 'center',
    padding: 10,
  },
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
  },
});
export default EditProfile;
