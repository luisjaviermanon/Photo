import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';
import colors from '../../themes/colors';
import {useCameraPermissions} from '../../hooks/useCameraPermissions';
import {useCameraSetup} from '../../hooks/useCameraSetup';
import {usePhotoActions} from '../../hooks/usePhotoActions';

const PostUploadScreen = () => {
  const {hasCameraPermission} = useCameraPermissions();
  const {
    camera,
    hdrEnabled,
    flashMode,
    shutterSoundEnabled,
    is60FPS,
    device,
    format,
    toggleHdr,
    toggleCamera,
    toggleFlash,
    toggleShutterSound,
    torchMode,
    startRecording,
    stopRecording,
    isRecording,
  } = useCameraSetup();

  const {takePhoto} = usePhotoActions(camera);

  if (!device || !format || !hasCameraPermission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Requesting Camera Permission...</Text>
      </View>
    );
  }
  const supportsHdr = format.supportsPhotoHdr;
  const getFlashIcon = () => {
    switch (flashMode) {
      case 'on':
        return 'flash-on';
      case 'auto':
        return 'flash-auto';
      case 'off':
        return 'flash-off';
      default:
        return 'flash-off';
    }
  };

  return (
    <View style={styles.page}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        photoHdr={supportsHdr && hdrEnabled}
      />
      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.while} />
        <Pressable onPress={toggleFlash}>
          <MaterialIcons name={getFlashIcon()} size={30} color={colors.while} />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.while} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.while} />

        <Button
          onPress={() => takePhoto(flashMode)}
          //   onLongPress={startRecording}
          // onPressOut={stopRecording}
        />

        <Pressable onPress={toggleCamera}>
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
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: 'hidden',
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.while,
    fontWeight: 'bold',
  },
});

export default PostUploadScreen;
