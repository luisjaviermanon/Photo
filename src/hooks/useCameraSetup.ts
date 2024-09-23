import {useState, useRef} from 'react';
import {
  Camera,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';

/**
 * Hook para configurar la cámara.
 * @function
 * @returns {object} - Estado y funciones para manejar la configuración de la cámara.
 */

export const useCameraSetup = () => {
  let devices = useCameraDevices();
  const camera = useRef<Camera>(null);
  const [hdrEnabled, setHdrEnabled] = useState<boolean>(true);
  const [flashMode, setFlashMode] = useState<'on' | 'off' | 'auto'>('off');
  const [torchMode, setTorchMode] = useState<'on' | 'off'>('off');
  const [shutterSoundEnabled, setShutterSoundEnabled] = useState<boolean>(true);
  const [is60FPS, setIs60FPS] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const currentDevice = isFrontCamera
    ? devices.find(device => device.position === 'front')
    : devices.find(device => device.position === 'back');

  const format = useCameraFormat(currentDevice, [{fps: is60FPS ? 60 : 30}]);

  const toggleHdr = () => setHdrEnabled(prevState => !prevState);
  const toggleCamera = () => setIsFrontCamera(prevState => !prevState);

  const toggleFlash = () =>
    setFlashMode(prevFlashMode => {
      switch (prevFlashMode) {
        case 'off':
          return 'on';
        case 'on':
          return 'auto';
        case 'auto':
          return 'off';
        default:
          return 'off';
      }
    });
  const startRecording = async () => {
    if (camera.current) {
      setIsRecording(true);
      await camera.current.startRecording({
        flash: flashMode,
        enableShutterSound: shutterSoundEnabled,
        videoStabilizationMode: 'standard', // optional, you can choose another mode
      });
    }
  };

  const stopRecording = async () => {
    if (camera.current && isRecording) {
      setIsRecording(false);
      const video = await camera.current.stopRecording();
      // Handle the recorded video file (e.g., save it, display a preview, etc.)
      console.log('Video recorded at:', video.path);
    }
  };
  const toggleShutterSound = () =>
    setShutterSoundEnabled(prevState => !prevState);
  const toggle60FPS = () => setIs60FPS(prevState => !prevState);
  const toggleTorch = () =>
    setTorchMode(prevTorchMode => (prevTorchMode === 'on' ? 'off' : 'on'));
  return {
    camera,
    hdrEnabled,
    flashMode,
    shutterSoundEnabled,
    is60FPS,
    isFrontCamera,
    isRecording,
    device: currentDevice,
    format,
    torchMode,
    toggleHdr,
    toggleCamera,
    toggleFlash,
    toggleShutterSound,
    toggle60FPS,
    toggleTorch,
    startRecording,
    stopRecording,
  };
};
