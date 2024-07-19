import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {
  Camera,
  CameraType,
  FlashMode,
  CameraRecordingOptions,
  CameraPictureOptions,
  VideoQuality,
} from 'expo-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../themes/colors';

const flashMode = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];
const flashModeToIcon = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
};

const PostUploadScreen = () => {
  const camera = useRef<Camera>(null);
  const [hasPermissions, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const {status: cameraStatus} =
        await Camera.requestCameraPermissionsAsync();
      const {status: microphoneStatus} =
        await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(
        cameraStatus === 'granted' && microphoneStatus === 'granted',
      );
    };
    getPermission();
  }, []);

  const flipCamera = () => {
    setCameraType(currentCameraType =>
      currentCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back,
    );
  };

  const flipFlash = () => {
    const currentIndex = flashMode.indexOf(flash);
    const nextIndex =
      currentIndex === flashMode.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashMode[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }
    const options: CameraPictureOptions = {
      quality: 0.5,
      base64: false,
      skipProcessing: true,
    };
    const result = await camera.current.takePictureAsync(options);
  };

  const startRecording = async () => {
    console.log('Entro a grabar');
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }

    const options = {
      quality: VideoQuality['480p'],
      maxDuration: 60,
      maxFileSize: 10 * 1024 * 1024,
    };

    setIsRecording(true);
    try {
      const result = await camera.current.recordAsync(options);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    setIsRecording(false);
  };

  const stopRecording = () => {
    if (isRecording) {
      camera.current?.stopRecording();
      setIsRecording(false);
    }
  };

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermissions === false) {
    return <Text>No access to the camera</Text>;
  }
  console.log(isRecording);
  return (
    <View style={styles.page}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.while} />
        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={flashModeToIcon[flash]}
            size={30}
            color={colors.while}
          />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.while} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.while} />
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                {backgroundColor: isRecording ? colors.accent : colors.while},
              ]}
            />
          </Pressable>
        )}
        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.while}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.while,
  },
  // Add other styles as needed
});

export default PostUploadScreen;
