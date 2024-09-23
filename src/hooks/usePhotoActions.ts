import {useState} from 'react';
import {Camera} from 'react-native-vision-camera';

/**
 * Hook para manejar la captura de fotos.
 * @function
 * @param {React.RefObject<Camera>} cameraRef - Referencia a la cámara.
 * @returns {object} - Estado y funciones para manejar las fotos.
 */
export const usePhotoActions = (cameraRef: React.RefObject<Camera>) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const takePhoto = async (
    flashMode: 'on' | 'off' | 'auto',
    shutterSoundEnabled?: boolean,
  ) => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        flash: flashMode,
        enableShutterSound: shutterSoundEnabled ?? true,
      });
      setPhotos(prevPhotos => [...prevPhotos, photo.path]);
    }
  };

  return {
    photos,
    takePhoto,
  };
};
