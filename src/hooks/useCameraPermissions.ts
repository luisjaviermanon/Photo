/**
/**
 * Hook que solicita permisos para usar la cámara.
 * @function
 */
import {useEffect, useState} from 'react';
import {Camera} from 'react-native-vision-camera';

export const useCameraPermissions = (): {
  hasCameraPermission: boolean;
  error?: Error;
} => {
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const granted = await Camera.requestCameraPermission();
        setHasCameraPermission(granted === 'granted');
      } catch (e) {
        setError(e as Error);
      }
    })();
  }, []);

  return {hasCameraPermission, error};
};
