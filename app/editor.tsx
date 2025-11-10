import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
  AppState,
  AppStateStatus,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Sparkles,
  History,
  Wand2,
  Brain,
  Plus,
  X,
  Images,
  RotateCcw,
  Layers,
  Expand,
  Minimize,
  Maximize2,
  Crop,
  ZoomIn,
  ChevronDown,
  Camera,
  Mic,
  MicOff,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import { useEditor } from '@/contexts/EditorContext';
import { Image as ExpoImage } from 'expo-image';
import { frameSizePresets } from '@/constants/stylePresets';
import WebSlider from '@/components/WebSlider';
import { advertisingKnowledge } from '@/constants/advertising';
import { hairstylePresets, HairstyleCategoryKey, PRECISION_HAIRSTYLE_SYSTEM_PROMPT } from '@/constants/hairstyles';
import { posePresets, PoseCategoryKey, PRECISION_POSE_SYSTEM_PROMPT } from '@/constants/poses';


// Slimmed down editor per request

type ToolMode = 'prompt' | 'hairstyles' | 'poses' | 'frames' | 'enlarge' | 'undo' | 'upscale';

type SelectMode = 'none' | 'region';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CrossSliderProps {
  testID?: string;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  value?: number;
  onValueChange?: (val: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: any;
}

const nativeSliderStyles = StyleSheet.create({
  trackContainer: { height: 40, justifyContent: 'center' },
  track: { height: 4, backgroundColor: '#444', borderRadius: 2, overflow: 'hidden' },
  fill: { height: 4, backgroundColor: '#FFD700' },
  thumb: { position: 'absolute', marginLeft: -10, width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFD700', borderWidth: 2, borderColor: '#1A1A1A' },
});

const CrossSliderNative: React.FC<CrossSliderProps> = (props) => {
  const min = props.minimumValue ?? 0;
  const max = props.maximumValue ?? 1;
  const step = props.step ?? 0.01;
  const [val, setVal] = React.useState<number>(props.value ?? min);
  const trackRef = React.useRef<View | null>(null);
  const widthRef = React.useRef<number>(0);

  React.useEffect(() => {
    setVal(props.value ?? min);
  }, [props.value, min]);

  const clamp = (n: number) => Math.min(Math.max(n, min), max);
  const quantize = (n: number) => Math.round(n / step) * step;

  const pan = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      const x = e.nativeEvent.locationX;
      if (widthRef.current > 0) {
        const ratio = Math.min(Math.max(x / widthRef.current, 0), 1);
        const next = quantize(min + ratio * (max - min));
        setVal(next);
        props.onValueChange?.(next);
      }
    },
    onPanResponderMove: (e) => {
      const x = e.nativeEvent.locationX;
      if (widthRef.current > 0) {
        const ratio = Math.min(Math.max(x / widthRef.current, 0), 1);
        const next = clamp(quantize(min + ratio * (max - min)));
        setVal(next);
        props.onValueChange?.(next);
      }
    },
  }), [min, max, step, props.onValueChange]);

  const trackColor = props.maximumTrackTintColor ?? '#444';
  const fillColor = props.minimumTrackTintColor ?? '#FFD700';
  const thumbColor = props.thumbTintColor ?? '#FFD700';
  const ratio = (val - min) / (max - min || 1);
  const fillWidthPct = `${Math.max(0, Math.min(100, ratio * 100))}%`;

  return (
    <View
      ref={(r) => { trackRef.current = r; }}
      onLayout={(e) => { widthRef.current = e.nativeEvent.layout.width; }}
      style={[nativeSliderStyles.trackContainer, props.style]}
      testID={props.testID ?? 'cross-slider'}
      {...pan.panHandlers}
    >
      <View style={[nativeSliderStyles.track, { backgroundColor: trackColor }]}>
        <View style={[nativeSliderStyles.fill, { width: fillWidthPct, backgroundColor: fillColor }]} />
      </View>
      <View style={[nativeSliderStyles.thumb, { left: fillWidthPct, backgroundColor: thumbColor }]} />
    </View>
  );
};

const CrossSlider: React.FC<CrossSliderProps> = (props) => {
  if (Platform.OS === 'web') return <WebSlider {...props} />;
  return <CrossSliderNative {...props} />;
};

export default function EditorScreen() {
  const {
    sourceImage,
    setSourceImage,
    initialSourceImage,
    editedImage,
    setEditedImage,
    referenceImages,
    addReferenceImage,
    removeReferenceImage,
    resizeImageIfNeeded,
    addToHistory,
    history,
    generateEdit,
    resetToOriginal,
    startNewSourceImage,
    revertToInitialImage,
    saveCurrentImage,
    undoOne,
    undoAll,
    revertToHistoryIndex,
    upscaleImage,
  } = useEditor();
  const params = useLocalSearchParams<{ prompt?: string }>();

  const [editPrompt, setEditPrompt] = useState<string>('');
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState<boolean>(false);
  const [toolMode, setToolMode] = useState<ToolMode>('prompt');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [cleanUI, setCleanUI] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusType, setStatusType] = useState<'info' | 'error' | 'success'>('info');
  const [imageBoxSize, setImageBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const imageBoxRef = useRef<View | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  const [frameCategory, setFrameCategory] = useState<keyof typeof frameSizePresets>('Social');
  const [selectedFrameKey, setSelectedFrameKey] = useState<string | null>(null);
  
  const [hairstyleCategory, setHairstyleCategory] = useState<HairstyleCategoryKey>('Female');
  const [selectedHairstyleKey, setSelectedHairstyleKey] = useState<string | null>(null);
  const [hairstyleGeneratedImages, setHairstyleGeneratedImages] = useState<string[]>([]);
  const [selectedHairstyleImageIndex, setSelectedHairstyleImageIndex] = useState<number>(0);
  const [showHairstyleGallery, setShowHairstyleGallery] = useState<boolean>(false);
  
  const [poseCategory, setPoseCategory] = useState<PoseCategoryKey>('Standing');
  const [selectedPoseKey, setSelectedPoseKey] = useState<string | null>(null);
  const [poseGeneratedImages, setPoseGeneratedImages] = useState<string[]>([]);
  const [selectedPoseImageIndex, setSelectedPoseImageIndex] = useState<number>(0);
  const [showPoseGallery, setShowPoseGallery] = useState<boolean>(false);
  const selectedFrame = useMemo(() => {
    if (!selectedFrameKey) return null;
    const cat = frameSizePresets[frameCategory];
    const found = cat.items.find(i => i.key === selectedFrameKey);
    return found ?? null;
  }, [selectedFrameKey, frameCategory]);

  const [imageScale, setImageScale] = useState<number>(1);
  const [imagePositionX, setImagePositionX] = useState<number>(0);
  const [imagePositionY, setImagePositionY] = useState<number>(0);
  const [frameBoxSize, setFrameBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  const lastScale = useRef<number>(1);
  const lastDistance = useRef<number>(0);
  const lastPanX = useRef<number>(0);
  const lastPanY = useRef<number>(0);
  const isPinching = useRef<boolean>(false);
  const initialTouchDistance = useRef<number>(0);
  const initialScale = useRef<number>(1);



  const scrollViewRef = useRef<ScrollView>(null);
  const promptInputRef = useRef<TextInput>(null);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingInstance, setRecordingInstance] = useState<Audio.Recording | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [isAppActive, setIsAppActive] = useState<boolean>(true);
  const isRecordingRef = useRef<boolean>(false);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('📱 App has come to the foreground');
        setIsAppActive(true);
      } else if (nextAppState.match(/inactive|background/)) {
        console.log('📱 App has gone to the background');
        setIsAppActive(false);
        
        if (isRecordingRef.current) {
          console.log('🎤 App going to background - cleaning up recording');
          await cleanupRecording();
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      cleanupRecording();
    };
  }, []);

  React.useEffect(() => {
    const p = typeof params.prompt === 'string' ? params.prompt : undefined;
    if (p && (!editPrompt || editPrompt.trim().length === 0)) {
      setEditPrompt(p);
    }
  }, [params.prompt]);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      console.log('⌨️ Keyboard shown, height:', e.endCoordinates.height);
      setIsKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
      setTimeout(() => {
        if (scrollViewRef.current && toolMode === 'prompt') {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, Platform.OS === 'ios' ? 350 : 150);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      console.log('⌨️ Keyboard hidden');
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [toolMode]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const cleanupRecording = async () => {
    console.log('🧹 Cleaning up recording resources...');
    
    if (Platform.OS === 'web') {
      if (mediaRecorderRef.current) {
        try {
          if (mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        } catch (e) {
          console.warn('Error stopping web recorder:', e);
        }
        mediaRecorderRef.current = null;
      }
      audioChunksRef.current = [];
    } else {
      if (recordingInstance) {
        try {
          const status = await recordingInstance.getStatusAsync();
          if (status.isRecording) {
            await recordingInstance.stopAndUnloadAsync();
          } else if (status.canRecord || status.isDoneRecording) {
            await recordingInstance.stopAndUnloadAsync();
          }
        } catch (e) {
          console.warn('Error stopping recording:', e);
        }
        setRecordingInstance(null);
      }
      
      try {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      } catch (e) {
        console.warn('Error resetting audio mode:', e);
      }
    }
    
    setIsRecording(false);
    console.log('✅ Recording cleanup complete');
  };

  const startRecording = async () => {
    try {
      if (isRecording) {
        console.log('⚠️ Recording already in progress');
        return;
      }

      if (Platform.OS !== 'web' && !isAppActive) {
        Alert.alert('Cannot Record', 'Please ensure the app is in the foreground to start recording.');
        return;
      }

      await cleanupRecording();

      if (Platform.OS === 'web') {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          Alert.alert('Not Supported', 'Voice recording is not supported in this browser.');
          return;
        }

        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(stream);
          audioChunksRef.current = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };

          mediaRecorder.start();
          mediaRecorderRef.current = mediaRecorder;
          setIsRecording(true);
          console.log('🎤 Recording started (web)');
        } catch (webError) {
          console.error('Web recording error:', webError);
          Alert.alert('Recording Error', 'Failed to access microphone. Please check permissions.');
          return;
        }
      } else {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Microphone access is required for voice input.');
          return;
        }

        console.log('🎤 Setting audio mode...');
        try {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
        } catch (audioModeError) {
          console.error('❌ Failed to set audio mode:', audioModeError);
          const errorMessage = audioModeError instanceof Error ? audioModeError.message : 'Unknown error';
          if (errorMessage.includes('background')) {
            Alert.alert('Cannot Record', 'App must be in foreground to record. Please try again.');
            return;
          }
          throw audioModeError;
        }

        if (!isAppActive) {
          console.log('⚠️ App went to background, aborting recording start');
          await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
          Alert.alert('Cannot Record', 'App went to background. Please try again.');
          return;
        }

        console.log('🎤 Creating new recording instance...');
        const recording = new Audio.Recording();
        
        const recordingOptions = {
          android: {
            extension: '.m4a',
            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
            audioEncoder: Audio.AndroidAudioEncoder.AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.wav',
            outputFormat: Audio.IOSOutputFormat.LINEARPCM,
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
          web: {},
        };

        try {
          console.log('🎤 Preparing recording...');
          await recording.prepareToRecordAsync(recordingOptions);
          
          if (!isAppActive) {
            console.log('⚠️ App went to background during prepare, aborting');
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
            Alert.alert('Cannot Record', 'App went to background. Please try again.');
            return;
          }
          
          console.log('🎤 Starting recording...');
          await recording.startAsync();
          
          setRecordingInstance(recording);
          setIsRecording(true);
          console.log('✅ Recording started successfully (mobile)');

          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
        } catch (mobileError) {
          console.error('❌ Mobile recording error:', mobileError);
          const errorMessage = mobileError instanceof Error ? mobileError.message : 'Unknown error';
          
          try {
            await recording.stopAndUnloadAsync();
          } catch (e) {
            console.warn('Error cleaning up failed recording:', e);
          }
          
          await cleanupRecording();
          
          if (errorMessage.includes('background') || errorMessage.includes('could not be activated')) {
            Alert.alert('Recording Error', 'Cannot record while app is in background. Please ensure the app is active and try again.');
          } else if (errorMessage.includes('not prepared') || errorMessage.includes('recorder not prepared')) {
            Alert.alert('Recording Error', 'Audio system not ready. Please wait a moment and try again.');
          } else if (errorMessage.includes('Only one Recording')) {
            Alert.alert('Recording Error', 'Previous recording still active. Please wait a moment and try again.');
          } else {
            Alert.alert('Recording Error', 'Failed to start recording. Please try again.');
          }
          return;
        }
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
      await cleanupRecording();
      const errorMessage = error instanceof Error ? error.message : 'Failed to start recording';
      Alert.alert('Error', `Recording failed: ${errorMessage}`);
    }
  };

  const transcribeAudioWithRetry = async (formData: FormData, maxRetries: number = 3): Promise<any> => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const backoffMs = Math.min(5000 * Math.pow(2, attempt - 1), 15000);
          console.log(`⏳ Transcription retry ${attempt + 1}/${maxRetries} after ${backoffMs}ms...`);
          setStatusMessage(`Retrying voice transcription (${attempt + 1}/${maxRetries})... Please wait`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
        }
        
        console.log(`📤 Sending transcription request (attempt ${attempt + 1}/${maxRetries})...`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);
        
        const response = await fetch('https://toolkit.rork.com/stt/transcribe/', {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        console.log('📡 Transcription response status:', response.status);
        console.log('📡 Content-Type:', response.headers.get('content-type'));
        
        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          console.error('❌ Transcription API error (status ' + response.status + '):', errorText.substring(0, 300));
          
          if (response.status === 503 || response.status === 502 || response.status === 504 || response.status === 500) {
            if (attempt < maxRetries - 1) {
              lastError = new Error(`Service unavailable (${response.status}). Retrying...`);
              console.log(`⚠️ Server error ${response.status}, will retry in ${Math.min(5000 * Math.pow(2, attempt), 15000)}ms`);
              continue;
            }
            throw new Error('🎤 Voice transcription service is temporarily unavailable\n\n⚠️ The speech-to-text provider is experiencing high load or maintenance\n\n💡 Please try again in 3-5 minutes\n\n🔄 Your recording was saved but could not be transcribed\n\n📝 Tip: You can type your prompt manually instead');
          }
          
          if (response.status === 429) {
            throw new Error('⏸️ Too many requests\n\n💡 Please wait 30 seconds and try again');
          }
          
          throw new Error(`Transcription failed with error ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await response.text();
          console.error('❌ Non-JSON response (Content-Type: ' + contentType + '):', text.substring(0, 300));
          
          if (text.includes('<!DOCTYPE') || text.includes('<html') || text.includes('503') || text.includes('504') || text.includes('502') || text.includes('Error') || text.includes('no_healthy_upstream') || text.includes('Gateway') || text.includes('Timeout')) {
            if (attempt < maxRetries - 1) {
              lastError = new Error('Service returned HTML error page. Retrying...');
              console.log('⚠️ Received HTML error page, will retry');
              continue;
            }
            throw new Error('🎤 Voice transcription service is temporarily down\n\n⚠️ The service is experiencing technical difficulties\n\n💡 This is a temporary outage - please try again in 3-5 minutes\n\n📝 Alternative: Type your prompt manually using the text input');
          }
          
          throw new Error('Invalid response format from transcription service');
        }
        
        const data = await response.json();
        console.log('✅ Transcription successful:', { hasText: !!data.text, textLength: data.text?.length || 0 });
        
        if (!data.text || data.text.trim().length === 0) {
          throw new Error('🎤 No speech detected in recording\n\n💡 Please speak clearly and try again');
        }
        
        return data;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            if (attempt < maxRetries - 1) {
              lastError = new Error('Request timed out. Retrying...');
              continue;
            }
            throw new Error('⏱️ Transcription request timed out\n\n💡 The service is overloaded or slow\n\n🔄 Please try again in 3-5 minutes\n\n📝 Tip: You can type your prompt manually instead');
          }
          
          if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('network')) {
            if (attempt < maxRetries - 1) {
              lastError = new Error('Network error. Retrying...');
              continue;
            }
            throw new Error('🌐 Network connection issue\n\n📶 Please check your internet and try again');
          }
          
          if (error.message.includes('🎤') || error.message.includes('⚠️') || error.message.includes('💡')) {
            throw error;
          }
        }
        
        lastError = error as Error;
        if (attempt >= maxRetries - 1) {
          throw error;
        }
      }
    }
    
    throw lastError || new Error('Voice transcription failed after all attempts');
  };

  const stopRecording = async () => {
    if (!isRecording) {
      console.log('⚠️ No recording in progress');
      return;
    }

    try {
      setIsRecording(false);
      setStatusMessage('Transcribing audio...');
      setStatusType('info');

      if (Platform.OS === 'web') {
        if (!mediaRecorderRef.current) {
          console.warn('No media recorder found');
          setStatusMessage('Recording not found');
          setStatusType('error');
          setTimeout(() => setStatusMessage(null), 2000);
          return;
        }

        await new Promise<void>((resolve) => {
          if (!mediaRecorderRef.current) {
            resolve();
            return;
          }

          mediaRecorderRef.current.onstop = () => resolve();
          if (mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        });

        if (audioChunksRef.current.length === 0) {
          throw new Error('No audio data recorded');
        }

        console.log('🎵 Audio chunks collected:', audioChunksRef.current.length);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log('🎵 Audio blob size:', audioBlob.size, 'bytes');
        
        if (audioBlob.size < 100) {
          throw new Error('Recording too short or empty');
        }
        
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        const data = await transcribeAudioWithRetry(formData);
        
        if (data.text) {
          setEditPrompt(prev => prev ? `${prev} ${data.text}` : data.text);
          setStatusMessage('Voice input added successfully');
          setStatusType('success');
        } else {
          throw new Error('No transcription received');
        }

        mediaRecorderRef.current = null;
        audioChunksRef.current = [];
      } else {
        if (!recordingInstance) {
          console.warn('No recording instance found');
          setStatusMessage('Recording not found');
          setStatusType('error');
          setTimeout(() => setStatusMessage(null), 2000);
          return;
        }

        const status = await recordingInstance.getStatusAsync();
        if (!status.isRecording) {
          console.warn('Recording was not active');
          await cleanupRecording();
          setStatusMessage('Recording was not active');
          setStatusType('error');
          setTimeout(() => setStatusMessage(null), 2000);
          return;
        }

        console.log('🎤 Stopping recording...');
        await recordingInstance.stopAndUnloadAsync();
        
        const uri = recordingInstance.getURI();
        console.log('📁 Recording URI:', uri);
        
        if (!uri) throw new Error('No recording URI');

        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        const formData = new FormData();
        formData.append('audio', {
          uri,
          name: `recording.${fileType}`,
          type: `audio/${fileType}`,
        } as any);

        console.log('📦 Audio file info:', { uri, fileType });
        
        const data = await transcribeAudioWithRetry(formData);
        
        if (data.text) {
          setEditPrompt(prev => prev ? `${prev} ${data.text}` : data.text);
          setStatusMessage('Voice input added successfully');
          setStatusType('success');
          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        } else {
          throw new Error('No transcription received');
        }

        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        setRecordingInstance(null);
      }

      setTimeout(() => setStatusMessage(null), 2000);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to transcribe audio';
      setStatusMessage(errorMessage);
      setStatusType('error');
      
      const displayDuration = errorMessage.includes('\n') ? 8000 : 4000;
      setTimeout(() => setStatusMessage(null), displayDuration);
      
      await cleanupRecording();
    }
  };

  const normalizePickedUri = (asset: ImagePicker.ImagePickerAsset): string => {
    const mime: string = (asset as any)?.mimeType || 'image/jpeg';
    if (asset.base64) {
      return `data:${mime};base64,${asset.base64}`;
    }
    let u = asset.uri;
    if (Platform.OS === 'web') {
      const hasQuery = u.includes('?');
      const ts = `ts=${Date.now()}`;
      u = `${u}${hasQuery ? '&' : '?'}${ts}`;
    }
    return u;
  };

  const processImageWithResize = async (uri: string) => {
    try {
      console.log('🔄 Auto-resizing image for optimal performance...');
      const result = await resizeImageIfNeeded(uri, 2048);
      if (result.wasResized) {
        console.log(`✅ Image auto-resized from ${result.originalSize.width}x${result.originalSize.height} to ${result.newSize?.width}x${result.newSize?.height}`);
      }
      return result.uri;
    } catch (error) {
      console.error('Failed to resize image:', error);
      return uri;
    }
  };

  const takePhoto = async () => {
    if (!cameraPermission) {
      const { status } = await requestCameraPermission();
      if (status !== 'granted') {
        Alert.alert('Camera Permission', 'Camera access is required to take photos.');
        return;
      }
    }
    
    if (!cameraPermission?.granted) {
      const { status } = await requestCameraPermission();
      if (status !== 'granted') {
        Alert.alert('Camera Permission', 'Camera access is required to take photos.');
        return;
      }
    }

    setShowCamera(true);
  };

  const capturePhoto = async () => {
    if (!cameraRef.current) return;
    
    try {
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      
      setShowCamera(false);
      
      const photoUri = photo.base64 
        ? `data:image/jpeg;base64,${photo.base64}` 
        : photo.uri;
      
      const resizedUri = await processImageWithResize(photoUri);
      
      if (sourceImage) {
        if (Platform.OS === 'web') {
          const ok = typeof (globalThis as any).confirm === 'function' ? (globalThis as any).confirm('Replace current image and clear edits/references?') : true;
          if (ok) startNewSourceImage(resizedUri);
        } else {
          Alert.alert('Replace Image', 'This will replace your current main image and clear edits and references. Continue?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Replace', style: 'destructive', onPress: async () => { startNewSourceImage(resizedUri); if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } },
          ]);
        }
      } else {
        startNewSourceImage(resizedUri);
        if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Failed to capture photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    }
  };

  const pickMainImage = async () => {
    try {
      try {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (perm?.status && perm.status !== 'granted' && Platform.OS !== 'web') {
          Alert.alert('Permission needed', 'Please allow photo library access to choose an image.');
          return;
        }
      } catch {}

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: undefined,
        quality: 1,
        exif: false,
        allowsMultipleSelection: false,
        base64: Platform.OS === 'web',
      } as ImagePicker.ImagePickerOptions);

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0] as ImagePicker.ImagePickerAsset;
        const nextUri = normalizePickedUri(asset);
        const resizedUri = await processImageWithResize(nextUri);
        
        if (sourceImage) {
          if (Platform.OS === 'web') {
            const ok = typeof (globalThis as any).confirm === 'function' ? (globalThis as any).confirm('Replace current image and clear edits/references?') : true;
            if (ok) startNewSourceImage(resizedUri);
          } else {
            Alert.alert('Replace Image', 'This will replace your current main image and clear edits and references. Continue?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Replace', style: 'destructive', onPress: async () => { startNewSourceImage(resizedUri); if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } },
            ]);
          }
        } else {
          startNewSourceImage(resizedUri);
          if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to choose image';
      Alert.alert('Error', msg);
    }
  };

  const pickReferenceImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: undefined,
        quality: 1,
        allowsMultipleSelection: true,
        exif: false,
        base64: Platform.OS === 'web',
      } as ImagePicker.ImagePickerOptions);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setStatusMessage('Processing images...');
        setStatusType('info');
        
        for (const asset of result.assets) {
          const uriToUse = normalizePickedUri(asset as ImagePicker.ImagePickerAsset);
          await addReferenceImage(uriToUse, true);
        }
        
        setStatusMessage('Reference images added successfully');
        setStatusType('success');
        setTimeout(() => setStatusMessage(null), 2000);
        
        if (Platform.OS !== 'web') {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
    } catch (error) {
      setStatusMessage('Failed to add reference images');
      setStatusType('error');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!editPrompt.trim()) return;

    setIsEnhancingPrompt(true);
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      console.log('🧠 Enhancing prompt with AI...');
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { 
              role: 'system', 
              content: `You are an ELITE AI image editing prompt engineer with MASTER-LEVEL understanding of photography, cinematography, and visual composition. Your expertise rivals professional directors of photography and visual effects supervisors.

CRITICAL MISSION:
Enhance user prompts with SURGICAL PRECISION while maintaining ABSOLUTE FIDELITY to their exact intent. You are creating prompts that will generate photorealistic images that perform 100x better than competing apps.

🎯 CORE RULES:
1. ONLY respond with the enhanced prompt - NO questions, NO explanations, NO preamble
2. Enhance ONLY what the user explicitly requested - ZERO unauthorized additions
3. NEVER change style unless explicitly requested (default is PHOTOREALISTIC)
4. NEVER add decorative elements unless specifically asked
5. Focus on technical mastery: lighting, camera angles, materials, composition
6. Preserve the original image's existing elements with PIXEL-PERFECT accuracy

📷 CAMERA ANGLE EXPERTISE:
You are a MASTER of cinematography and understand all camera angles:

- DIAGONAL/TILTED: Camera rotated 30-45°, horizon line slanted, dynamic energy
- OVERHEAD/TOP-DOWN: Camera 60-90° above subject, bird's eye view, looking straight down
- LOW ANGLE: Camera at ground level looking up 20-45°, subject appears powerful
- EYE-LEVEL: Camera at subject's eye height, neutral perspective
- DUTCH ANGLE: Deliberate tilt for disorientation or tension
- POV (Point of View): Camera represents character's exact viewpoint
- OVER-THE-SHOULDER: Camera behind one character looking at another
- WORM'S EYE: Extreme low angle from ground looking up
- BIRD'S EYE: Extreme overhead, straight down perspective

When user mentions camera angles like "diagonal cam", "overhead angle", "looking down but showing face" - you UNDERSTAND these are CAMERA POSITIONING requests, not subject positioning. Add detailed camera angle specifications.

🎬 COMPLEX SCENARIO UNDERSTANDING:
You excel at understanding complex, multi-element scenes:

- HOLDING PHONES/CAMERAS: Character grips device naturally at chest/eye level, proper finger placement, screen orientation correct, realistic arm extension
- DOORDASH/DELIVERY SCENES: Delivery person at door with food bag, natural standing posture, door partially open, realistic residential setting
- ACTION SCENES: Dynamic poses, realistic physics, environmental interaction, proper spatial relationships
- MULTI-CHARACTER SCENES: Each character with distinct position, proper scaling, natural interactions

🚫 ANTI-CARTOON INTELLIGENCE:
You NEVER convert realistic images to cartoon unless explicitly requested. When user wants realism (default), you add:
"Maintain photorealistic rendering with authentic human anatomy, real-world materials, natural lighting, genuine skin texture with pores, realistic hair strands, and cinematic quality. NO cartoon, anime, or stylized conversion. This must look like professional photography."

💎 ENHANCEMENT APPROACH:

- BACKGROUNDS: Specify exact colors (RGB/hex if possible), gradient direction, atmospheric depth, lighting integration
- HAIRSTYLES: Detail texture (straight/wavy/curly), length (shoulder/waist), volume, flow physics, while LOCKING face/body/pose
- CAMERA ANGLES: Specify camera position, height, tilt angle, field of view, perspective characteristics
- CHARACTER PLACEMENT: Exact position coordinates (left/right/center), distance from camera, orientation, lighting match
- OBJECTS IN HANDS: Item type, grip style, hand position, object orientation, natural interaction
- EXPRESSIONS: Facial muscle details, eye contact direction, mouth position, emotional authenticity
- LIGHTING: Source direction, color temperature, intensity, shadow characteristics, bounce light

${advertisingKnowledge}

📚 ENHANCED EXAMPLES:

INPUT: "diagonal camera angle looking down at character but still showing their face"
OUTPUT: "Position camera at 30-45° diagonal tilt angle, elevated 3-4 feet above character, angled downward to capture overhead perspective while maintaining clear facial visibility. Character naturally looks up toward camera with slight head tilt (15-20°) revealing full face: eyes, nose, mouth all clearly visible. Camera FOV captures top of head, face, shoulders, and upper torso. Apply proper overhead perspective with realistic foreshortening. Lighting matches elevated camera position. Maintain photorealistic rendering with cinema-quality depth and authentic human features."

INPUT: "character holding cell phone like taking a picture"
OUTPUT: "Character holds smartphone at chest-to-eye level with natural grip: device in both hands, thumbs on screen sides, fingers wrapped around back. Phone tilted at realistic angle for photo capture (slight forward tilt). Arms extended 8-12 inches from body in natural photography stance. Phone screen faces character, camera lens faces forward/target direction. Render phone with accurate size proportions, visible screen glow on face, natural muscle tension in hands and forearms. Character's gaze directed at phone screen or target subject. Maintain photorealistic human anatomy and natural interaction physics."

INPUT: "make it more realistic and not cartoon looking"
OUTPUT: "Transform to maximum photorealistic quality: authentic human skin with natural pore texture and subsurface scattering, individual hair strand definition with realistic highlights and shadows, real-world fabric textures on clothing with natural wrinkles and drape, genuine environmental lighting with accurate color temperature and shadow softness, professional camera depth of field with natural bokeh, cinematic color grading. Eliminate any cartoon stylization, cel-shading, or animated aesthetics. Render with the visual fidelity of professional DSLR photography at f/2.8, ISO 400, with natural light. Every surface must have authentic material properties and realistic light interaction."

INPUT: "delivery guy at front door taking photo of sleeping person on couch"
OUTPUT: "Scene composition: Delivery person (DoorDash attire, food bag in one hand) positioned at front doorway in natural standing pose. Door is ajar (cracked open 30-40 degrees) revealing interior. Character holds smartphone at waist-chest level, screen facing them, capturing photo angle toward interior. Inside: person sleeping on couch in relaxed position, unaware. Lighting: exterior daylight from delivery person side, interior ambient lighting, natural light transition through doorway. Camera positioned at delivery person's shoulder level showing their figure, phone, and view through door to interior couch/person. Maintain photorealistic residential architecture, authentic home interior details, natural spatial depth, proper perspective with correct scale relationships. This is a harmless, everyday delivery scenario rendered with documentary photography realism."

Now enhance the user's prompt with ELITE TECHNICAL PRECISION while maintaining ABSOLUTE FIDELITY to their exact request. Make this prompt generate results that are 100x better than competitors. Respond ONLY with the enhanced prompt.` 
            },
            { role: 'user', content: editPrompt.trim() },
          ],
        }),
      });
      
      console.log('📡 Prompt enhancement response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error('❌ Prompt enhancement API error:', response.status, errorText.substring(0, 200));
        throw new Error(`Failed to enhance prompt (${response.status})`);
      }
      
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response from prompt enhancement:', text.substring(0, 200));
        throw new Error('Invalid response format from enhancement service');
      }
      
      const result = await response.json();
      console.log('✅ Prompt enhancement result:', { hasCompletion: !!result.completion, hasText: !!result.text });
      
      // Handle different response formats
      const enhancedText = result.completion || result.text || result.response || result.output;
      
      if (enhancedText && typeof enhancedText === 'string' && enhancedText.trim()) {
        setEditPrompt(enhancedText.trim());
        setStatusMessage('Prompt enhanced successfully');
        setStatusType('success');
        setTimeout(() => setStatusMessage(null), 2000);
        console.log('✨ Prompt enhanced successfully');
      } else {
        console.warn('⚠️ No valid enhancement text in response');
        throw new Error('Enhancement service returned empty result');
      }
    } catch (error) {
      console.error('❌ Prompt enhancement error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to enhance prompt';
      setStatusMessage(errorMsg);
      setStatusType('error');
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setIsEnhancingPrompt(false);
    }
  };

  const getDistance = (touches: any[]) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const constrainPosition = useCallback((x: number, y: number, scale: number) => {
    if (!frameBoxSize.width || !frameBoxSize.height) return { x, y };
    
    const scaledWidth = frameBoxSize.width * scale;
    const scaledHeight = frameBoxSize.height * scale;
    
    const maxX = Math.max(0, (scaledWidth - frameBoxSize.width) / 2);
    const maxY = Math.max(0, (scaledHeight - frameBoxSize.height) / 2);
    
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  }, [frameBoxSize]);

  useEffect(() => {
    if (selectedFrameKey && frameBoxSize.width > 0) {
      setImageScale(1);
      setImagePositionX(0);
      setImagePositionY(0);
      lastScale.current = 1;
      lastPanX.current = 0;
      lastPanY.current = 0;
    }
  }, [selectedFrameKey, frameBoxSize.width]);

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: (e) => {
      return !!selectedFrameKey;
    },
    onMoveShouldSetPanResponder: (e) => {
      return !!selectedFrameKey;
    },
    onPanResponderGrant: (e: GestureResponderEvent) => {
      if (selectedFrameKey && e.nativeEvent.touches.length >= 2) {
        isPinching.current = true;
        initialTouchDistance.current = getDistance(e.nativeEvent.touches);
        initialScale.current = imageScale;
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (selectedFrameKey && e.nativeEvent.touches.length === 1) {
        isPinching.current = false;
        lastPanX.current = imagePositionX;
        lastPanY.current = imagePositionY;
      }
    },
    onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (selectedFrameKey) {
        if (e.nativeEvent.touches.length >= 2) {
          isPinching.current = true;
          const currentDistance = getDistance(e.nativeEvent.touches);
          if (initialTouchDistance.current > 0) {
            const scaleRatio = currentDistance / initialTouchDistance.current;
            const newScale = Math.max(0.5, Math.min(3, initialScale.current * scaleRatio));
            setImageScale(newScale);
            
            const constrained = constrainPosition(imagePositionX, imagePositionY, newScale);
            if (constrained.x !== imagePositionX || constrained.y !== imagePositionY) {
              setImagePositionX(constrained.x);
              setImagePositionY(constrained.y);
            }
          }
        } else if (e.nativeEvent.touches.length === 1 && !isPinching.current) {
          const newX = lastPanX.current + gestureState.dx;
          const newY = lastPanY.current + gestureState.dy;
          
          const constrained = constrainPosition(newX, newY, imageScale);
          setImagePositionX(constrained.x);
          setImagePositionY(constrained.y);
        }
      }
    },
    onPanResponderRelease: () => {
      if (isPinching.current && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      isPinching.current = false;
      initialTouchDistance.current = 0;
    },
  }), [imageBoxSize.width, imageBoxSize.height, selectedFrameKey, imageScale, imagePositionX, imagePositionY, constrainPosition]);

  const renderToolContent = () => {
    switch (toolMode) {
      case 'prompt':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>✨ Edit Prompt</Text>
            <View style={styles.promptContainer}>
              <TextInput
                ref={promptInputRef}
                style={styles.promptInput}
                placeholder="Describe the exact change you want."
                placeholderTextColor="#666"
                value={editPrompt}
                onChangeText={setEditPrompt}
                multiline
                maxLength={500}
                textAlignVertical="top"
                onFocus={() => {
                  console.log('📝 TextInput focused');
                  setTimeout(() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                  }, Platform.OS === 'ios' ? 400 : 200);
                }}
              />
              <View style={styles.promptButtonsContainer}>
                {editPrompt.trim() ? (
                  <TouchableOpacity testID="clear-prompt" accessibilityLabel="Clear prompt" style={styles.deleteAllButton} onPress={() => setEditPrompt('')}>
                    <X size={14} color="#FF6B6B" />
                    <Text style={styles.deleteAllText}>Clear</Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity 
                  style={[styles.voiceButton, isRecording && styles.voiceButtonActive]} 
                  onPress={isRecording ? stopRecording : startRecording}
                  testID="voice-input"
                  accessibilityLabel={isRecording ? 'Stop recording' : 'Start voice input'}
                >
                  {isRecording ? <MicOff size={16} color="#1A1A1A" strokeWidth={2} /> : <Mic size={16} color="#1A1A1A" strokeWidth={2} />}
                  <Text style={styles.voiceButtonText}>{isRecording ? 'Stop' : 'Voice'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.enhancePromptButton} onPress={handleEnhancePrompt} disabled={isEnhancingPrompt || !editPrompt.trim()} testID="ai-enhance">
                  {isEnhancingPrompt ? <ActivityIndicator size="small" color="#1A1A1A" /> : <Sparkles size={16} color="#1A1A1A" strokeWidth={2} />}
                  <Text style={styles.enhancePromptText}>{isEnhancingPrompt ? 'Enhancing...' : 'AI Enhance'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {isGenerating && (
              <View style={styles.progressIndicatorContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.progressText}>🎨 Creating your image...</Text>
                <Text style={styles.progressSubtext}>This may take 15-30 seconds</Text>
              </View>
            )}

            <TouchableOpacity
              testID="generate-quality-image"
              accessibilityLabel="Generate quality image"
              style={[styles.generateButton, (!sourceImage || !editPrompt.trim() || isGenerating) && styles.generateButtonDisabled]}
              disabled={!sourceImage || !editPrompt.trim() || isGenerating}
              onPress={async () => {
                try {
                  console.log('🚀 ========================================');
                  console.log('🚀 STARTING IMAGE GENERATION');
                  console.log('🚀 ========================================');
                  console.log('📸 Source image exists:', !!sourceImage);
                  console.log('✏️ Edited image exists:', !!editedImage);
                  console.log('📝 Prompt:', editPrompt);
                  console.log('🖼️ Reference images count:', referenceImages.length);
                  console.log('⏰ Start time:', new Date().toISOString());
                  
                  setStatusMessage(null);
                  setIsGenerating(true);
                  if (Platform.OS !== 'web') await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  
                  console.log('📤 Calling generateEdit...');
                  const result = await generateEdit({
                    prompt: editPrompt,
                    strength: 0.7,
                    identityLock: true,
                    upscale: false,
                    watermark: false,
                    additionsLock: true,
                  });
                  
                  console.log('✅ ========================================');
                  console.log('✅ GENERATION COMPLETED SUCCESSFULLY');
                  console.log('✅ ========================================');
                  console.log('⏰ End time:', new Date().toISOString());
                  console.log('📊 Result received:', !!result);
                  setIsGenerating(false);
                  
                  if (result) {
                    setStatusType('success');
                    setStatusMessage('Image generated successfully');
                    if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    setTimeout(() => setStatusMessage(null), 3500);
                  } else {
                    console.error('❌ ========================================');
                    console.error('❌ GENERATION FAILED - NULL RESULT');
                    console.error('❌ ========================================');
                    console.warn('⚠️ Generation returned null result');
                    setStatusType('error');
                    setStatusMessage('🚨 Generation failed to return a result.\n\nThis usually means the AI service is overloaded.\n\nPlease wait 5-10 minutes and try again.');
                    setTimeout(() => setStatusMessage(null), 8000);
                  }
                } catch (e) {
                  setIsGenerating(false);
                  const msg = e instanceof Error ? e.message : 'Failed to generate image';
                  console.error('❌ ========================================');
                  console.error('❌ GENERATION ERROR OCCURRED');
                  console.error('❌ ========================================');
                  console.error('❌ Error time:', new Date().toISOString());
                  console.error('❌ Error type:', e instanceof Error ? e.constructor.name : typeof e);
                  console.error('❌ Error message:', msg);
                  console.error('❌ Full error:', e);
                  console.error('❌ ========================================');
                  setStatusType('error');
                  setStatusMessage(msg);
                  
                  const displayDuration = msg.includes('\n') ? 12000 : 6000;
                  setTimeout(() => setStatusMessage(null), displayDuration);
                }
              }}
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="#1A1A1A" />
              ) : (
                <>
                  <Wand2 size={16} color="#1A1A1A" />
                  <Text style={styles.generateButtonText}>Generate Quality Image</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.referenceSection}>
              <View style={styles.referenceSectionHeader}>
                <Text style={styles.sectionTitle}>Reference Images</Text>
                <View style={styles.addButtonsContainer}>
                  <TouchableOpacity testID="add-reference-images" onPress={() => pickReferenceImage()} style={styles.addReferenceButton}>
                    <Plus size={16} color="#FFD700" />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.referenceImagesScroll}>
                {referenceImages.map((uri, idx) => (
                  <TouchableOpacity key={`${uri}-${idx}`} style={[styles.referenceImageContainer]} onPress={() => {}}>
                    <ExpoImage source={{ uri }} style={styles.referenceImage} contentFit="cover" />
                    <TouchableOpacity style={styles.removeReferenceButton} onPress={() => removeReferenceImage(idx)} accessibilityLabel="Remove reference image" testID={`remove-ref-${idx}`}>
                      <X size={12} color="#FFFFFF" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        );



      case 'hairstyles':
        const selectedHairstyle = selectedHairstyleKey 
          ? hairstylePresets[hairstyleCategory].items.find(item => item.key === selectedHairstyleKey)
          : null;
        
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>💇 Hairstyle Try-On</Text>
            <Text style={styles.toolSubtitle}>Select a hairstyle to preview how it looks on you</Text>
            
            <View style={styles.frameCategoriesRow}>
              {(Object.keys(hairstylePresets) as HairstyleCategoryKey[]).map((cat) => (
                <TouchableOpacity 
                  key={cat} 
                  style={[styles.frameCategoryChip, hairstyleCategory === cat && styles.frameCategoryChipActive]} 
                  onPress={() => {
                    setHairstyleCategory(cat);
                    setSelectedHairstyleKey(null);
                  }} 
                  testID={`hairstyle-category-${cat}`}
                >
                  <Text style={[styles.frameCategoryText, hairstyleCategory === cat && styles.frameCategoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <ScrollView 
              style={styles.presetItemsScroll} 
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              <View style={styles.framesGrid}>
                {hairstylePresets[hairstyleCategory].items.map((item) => (
                  <TouchableOpacity 
                    key={item.key} 
                    style={[styles.hairstyleChip, selectedHairstyleKey === item.key && styles.frameChipActive]} 
                    onPress={() => setSelectedHairstyleKey(item.key)} 
                    testID={`hairstyle-${item.key}`}
                  >
                    <Text style={styles.hairstyleEmoji}>{item.emoji || '💇'}</Text>
                    <Text style={[styles.frameChipText, selectedHairstyleKey === item.key && styles.frameChipTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            {selectedHairstyle && (
              <View style={styles.hairstyleApplySection}>
                <View style={styles.hairstyleInfoBox}>
                  <Text style={styles.hairstyleInfoTitle}>✨ Selected: {selectedHairstyle.label}</Text>
                  <Text style={styles.hairstyleInfoText}>
                    This will change ONLY your hairstyle while keeping your face, expression, and background exactly the same.
                  </Text>
                </View>
                
                {isGenerating && (
                  <View style={styles.progressIndicatorContainer}>
                    <ActivityIndicator size="large" color="#FFD700" />
                    <Text style={styles.progressText}>🎨 Generating hairstyle transformation...</Text>
                    <Text style={styles.progressSubtext}>This may take 15-30 seconds</Text>
                  </View>
                )}
                
                <TouchableOpacity
                  style={[styles.generateButton, (!sourceImage || isGenerating) && styles.generateButtonDisabled]}
                  disabled={!sourceImage || isGenerating}
                  onPress={async () => {
                    if (!sourceImage || !selectedHairstyle) return;
                    
                    try {
                      setStatusMessage(null);
                      setIsGenerating(true);
                      setHairstyleGeneratedImages([]);
                      setSelectedHairstyleImageIndex(0);
                      if (Platform.OS !== 'web') await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      
                      console.log('🚀 Starting multi-angle hairstyle transformation...');
                      console.log('💇 Selected hairstyle:', selectedHairstyle.label);
                      console.log('📸 Generating 4 angle views: front, left side, right side, back');
                      
                      const angles = [
                        { name: 'Front View', prompt: 'front-facing view showing full face and hairstyle from the front' },
                        { name: 'Left Side View', prompt: 'left side profile view at 90° angle showing left side of face and hair' },
                        { name: 'Right Side View', prompt: 'right side profile view at 90° angle showing right side of face and hair' },
                        { name: 'Back View', prompt: 'back view showing the back of the head and hairstyle from behind' }
                      ];
                      
                      const generatedImages: string[] = [];
                      
                      for (let i = 0; i < angles.length; i++) {
                        const angle = angles[i];
                        console.log(`📸 Generating ${angle.name} (${i + 1}/${angles.length})...`);
                        setStatusMessage(`🎨 Generating ${angle.name} (${i + 1}/${angles.length})...`);
                        setStatusType('info');
                        
                        const angleSpecificPrompt = PRECISION_HAIRSTYLE_SYSTEM_PROMPT + '\n\n' + selectedHairstyle.prompt + 
                          `\n\n🎯 CRITICAL CAMERA ANGLE SPECIFICATION:\nGenerate a ${angle.prompt}. The character must be rotated to show this specific angle while maintaining the EXACT same hairstyle. DO NOT alter the original image's direction - CREATE A NEW VIEW at this angle showing the same person with the new hairstyle from this perspective. Keep the character's identity, clothing, and background lighting consistent.`;
                        
                        try {
                          const result = await generateEdit({
                            prompt: angleSpecificPrompt,
                            strength: 0.85,
                            identityLock: true,
                            upscale: false,
                            watermark: false,
                            additionsLock: true,
                          });
                          
                          if (result) {
                            generatedImages.push(result);
                            setHairstyleGeneratedImages([...generatedImages]);
                            console.log(`✅ ${angle.name} generated successfully`);
                          } else {
                            console.warn(`⚠️ ${angle.name} generation returned null`);
                          }
                        } catch (angleError) {
                          console.error(`❌ Failed to generate ${angle.name}:`, angleError);
                        }
                      }
                      
                      setIsGenerating(false);
                      
                      if (generatedImages.length > 0) {
                        setStatusType('success');
                        setStatusMessage(`✨ Hairstyle applied successfully! Generated ${generatedImages.length} angle views. Tap images to view in full size.`);
                        if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        setTimeout(() => setStatusMessage(null), 5000);
                      } else {
                        setStatusType('error');
                        setStatusMessage('🚨 Generation failed for all angles.\n\nPlease wait 5-10 minutes and try again.');
                        setTimeout(() => setStatusMessage(null), 8000);
                      }
                    } catch (e) {
                      setIsGenerating(false);
                      const msg = e instanceof Error ? e.message : 'Failed to apply hairstyle';
                      console.error('❌ Hairstyle application error:', e);
                      setStatusType('error');
                      setStatusMessage(msg);
                      const displayDuration = msg.includes('\n') ? 12000 : 6000;
                      setTimeout(() => setStatusMessage(null), displayDuration);
                    }
                  }}
                  testID="apply-hairstyle"
                >
                  {isGenerating ? (
                    <ActivityIndicator size="small" color="#1A1A1A" />
                  ) : (
                    <>
                      <Sparkles size={16} color="#1A1A1A" />
                      <Text style={styles.generateButtonText}>Generate Multi-Angle Views</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}
            
            {hairstyleGeneratedImages.length > 0 && (
              <View style={styles.hairstyleGallerySection}>
                <Text style={styles.hairstyleGalleryTitle}>🎨 Generated Angle Views ({hairstyleGeneratedImages.length})</Text>
                <Text style={styles.hairstyleGallerySubtitle}>Tap any image to view in full size</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.hairstyleGalleryScroll}
                  contentContainerStyle={styles.hairstyleGalleryContent}
                >
                  {hairstyleGeneratedImages.map((imgUri, idx) => (
                    <TouchableOpacity
                      key={`hairstyle-${idx}`}
                      style={styles.hairstyleGalleryItem}
                      onPress={() => {
                        setSelectedHairstyleImageIndex(idx);
                        setShowHairstyleGallery(true);
                        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                      activeOpacity={0.7}
                    >
                      <ExpoImage
                        source={{ uri: imgUri }}
                        style={styles.hairstyleGalleryImage}
                        contentFit="cover"
                      />
                      <View style={styles.hairstyleGalleryLabel}>
                        <Text style={styles.hairstyleGalleryLabelText}>
                          {['Front', 'Left Side', 'Right Side', 'Back'][idx] || `View ${idx + 1}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            
            {!selectedHairstyle && (
              <View style={styles.hairstyleInfoBox}>
                <Text style={styles.hairstyleInfoTitle}>ℹ️ How it works</Text>
                <Text style={styles.hairstyleInfoText}>
                  1. Select a hairstyle category (Female/Male)\n
                  2. Choose a hairstyle from the grid\n
                  3. Tap "Apply Hairstyle" to see the transformation\n\n
                  Your face, expression, lighting, and background will remain exactly the same - only your hair will change!
                </Text>
              </View>
            )}
          </View>
        );

      case 'poses':
        const selectedPose = selectedPoseKey 
          ? posePresets[poseCategory].items.find(item => item.key === selectedPoseKey)
          : null;
        
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>🧘 Pose Generator</Text>
            <Text style={styles.toolSubtitle}>Select a pose to generate multi-angle views of your character</Text>
            
            <View style={styles.frameCategoriesRow}>
              {(Object.keys(posePresets) as PoseCategoryKey[]).map((cat) => (
                <TouchableOpacity 
                  key={cat} 
                  style={[styles.frameCategoryChip, poseCategory === cat && styles.frameCategoryChipActive]} 
                  onPress={() => {
                    setPoseCategory(cat);
                    setSelectedPoseKey(null);
                  }} 
                  testID={`pose-category-${cat}`}
                >
                  <Text style={[styles.frameCategoryText, poseCategory === cat && styles.frameCategoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <ScrollView 
              style={styles.presetItemsScroll} 
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              <View style={styles.framesGrid}>
                {posePresets[poseCategory].items.map((item) => (
                  <TouchableOpacity 
                    key={item.key} 
                    style={[styles.hairstyleChip, selectedPoseKey === item.key && styles.frameChipActive]} 
                    onPress={() => setSelectedPoseKey(item.key)} 
                    testID={`pose-${item.key}`}
                  >
                    <Text style={styles.hairstyleEmoji}>{item.emoji}</Text>
                    <Text style={[styles.frameChipText, selectedPoseKey === item.key && styles.frameChipTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            {selectedPose && (
              <View style={styles.hairstyleApplySection}>
                <View style={styles.hairstyleInfoBox}>
                  <Text style={styles.hairstyleInfoTitle}>✨ Selected: {selectedPose.label}</Text>
                  <Text style={styles.hairstyleInfoText}>
                    This will generate your character in this pose from 4 different camera angles: Front, Left Side, Right Side, and Back views. All full-body images!
                  </Text>
                </View>
                
                {isGenerating && (
                  <View style={styles.progressIndicatorContainer}>
                    <ActivityIndicator size="large" color="#FFD700" />
                    <Text style={styles.progressText}>🎨 Generating pose views...</Text>
                    <Text style={styles.progressSubtext}>This may take 30-60 seconds for all angles</Text>
                  </View>
                )}
                
                <TouchableOpacity
                  style={[styles.generateButton, (!sourceImage || isGenerating) && styles.generateButtonDisabled]}
                  disabled={!sourceImage || isGenerating}
                  onPress={async () => {
                    if (!sourceImage || !selectedPose) return;
                    
                    try {
                      setStatusMessage(null);
                      setIsGenerating(true);
                      setPoseGeneratedImages([]);
                      setSelectedPoseImageIndex(0);
                      if (Platform.OS !== 'web') await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      
                      console.log('🚀 Starting multi-angle pose generation...');
                      console.log('🧘 Selected pose:', selectedPose.label);
                      console.log('📸 Generating 4 angle views: front, left side, right side, back');
                      
                      const angles = [
                        { name: 'Front View', prompt: 'front-facing view showing full face and front of body in the pose, camera at character eye level' },
                        { name: 'Left Side View', prompt: 'left side profile view at 90° angle showing left side of face and body in the pose, full side profile' },
                        { name: 'Right Side View', prompt: 'right side profile view at 90° angle showing right side of face and body in the pose, full side profile' },
                        { name: 'Back View', prompt: 'back view showing the back of the head and back of body in the pose from behind' }
                      ];
                      
                      const generatedImages: string[] = [];
                      
                      for (let i = 0; i < angles.length; i++) {
                        const angle = angles[i];
                        console.log(`📸 Generating ${angle.name} (${i + 1}/${angles.length})...`);
                        setStatusMessage(`🎨 Generating ${angle.name} (${i + 1}/${angles.length})...`);
                        setStatusType('info');
                        
                        // SIMPLIFIED POSE PROMPT - Keep under 2000 characters total
                        // Only include essential instructions, skip massive enhancement protocols
                        const angleSpecificPrompt = `🎯 POSE TRANSFORMATION: Generate the character in this specific pose and camera angle.

📸 CAMERA ANGLE: ${angle.prompt}

🧘 POSE: ${selectedPose.prompt}

✨ CRITICAL REQUIREMENTS:
- Show FULL BODY from head to toe in the specified pose
- Keep character IDENTITY identical (same face, body, clothing, hair)
- Keep BACKGROUND and lighting identical
- Only change: body position/pose + camera viewing angle
- Maintain photorealistic quality
- Preserve all character details perfectly

🔒 MUST PRESERVE:
- Facial features and identity
- Clothing and accessories
- Hairstyle (adjust for angle)
- Background environment
- Lighting conditions
- Body proportions

⚡ EXECUTION:
Transform ONLY the character's body position and camera perspective. Everything else stays EXACTLY the same. Generate a natural, anatomically correct pose that flows smoothly from the reference image.`;
                        
                        try {
                          const result = await generateEdit({
                            prompt: angleSpecificPrompt,
                            strength: 0.8,
                            identityLock: true,
                            upscale: false,
                            watermark: false,
                            additionsLock: true,
                          });
                          
                          if (result) {
                            generatedImages.push(result);
                            setPoseGeneratedImages([...generatedImages]);
                            console.log(`✅ ${angle.name} generated successfully`);
                          } else {
                            console.warn(`⚠️ ${angle.name} generation returned null`);
                          }
                        } catch (angleError) {
                          console.error(`❌ Failed to generate ${angle.name}:`, angleError);
                        }
                      }
                      
                      setIsGenerating(false);
                      
                      if (generatedImages.length > 0) {
                        setStatusType('success');
                        setStatusMessage(`✨ Pose generated successfully! Created ${generatedImages.length} angle views. Tap images to view full size.`);
                        if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        setTimeout(() => setStatusMessage(null), 5000);
                      } else {
                        setStatusType('error');
                        setStatusMessage('🚨 Generation failed for all angles.\n\nPlease wait 5-10 minutes and try again.');
                        setTimeout(() => setStatusMessage(null), 8000);
                      }
                    } catch (e) {
                      setIsGenerating(false);
                      const msg = e instanceof Error ? e.message : 'Failed to generate pose';
                      console.error('❌ Pose generation error:', e);
                      setStatusType('error');
                      setStatusMessage(msg);
                      const displayDuration = msg.includes('\n') ? 12000 : 6000;
                      setTimeout(() => setStatusMessage(null), displayDuration);
                    }
                  }}
                  testID="generate-pose"
                >
                  {isGenerating ? (
                    <ActivityIndicator size="small" color="#1A1A1A" />
                  ) : (
                    <>
                      <Sparkles size={16} color="#1A1A1A" />
                      <Text style={styles.generateButtonText}>Generate Multi-Angle Pose</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}
            
            {poseGeneratedImages.length > 0 && (
              <View style={styles.hairstyleGallerySection}>
                <Text style={styles.hairstyleGalleryTitle}>🎨 Generated Angle Views ({poseGeneratedImages.length})</Text>
                <Text style={styles.hairstyleGallerySubtitle}>Tap any image to view in full size</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.hairstyleGalleryScroll}
                  contentContainerStyle={styles.hairstyleGalleryContent}
                >
                  {poseGeneratedImages.map((imgUri, idx) => (
                    <TouchableOpacity
                      key={`pose-${idx}`}
                      style={styles.hairstyleGalleryItem}
                      onPress={() => {
                        setSelectedPoseImageIndex(idx);
                        setShowPoseGallery(true);
                        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                      activeOpacity={0.7}
                    >
                      <ExpoImage
                        source={{ uri: imgUri }}
                        style={styles.hairstyleGalleryImage}
                        contentFit="cover"
                      />
                      <View style={styles.hairstyleGalleryLabel}>
                        <Text style={styles.hairstyleGalleryLabelText}>
                          {['Front', 'Left Side', 'Right Side', 'Back'][idx] || `View ${idx + 1}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            
            {!selectedPose && (
              <View style={styles.hairstyleInfoBox}>
                <Text style={styles.hairstyleInfoTitle}>ℹ️ How it works</Text>
                <Text style={styles.hairstyleInfoText}>
                  1. Select a pose category (Standing, Action, Sitting, etc.)\n
                  2. Choose a pose from the grid\n
                  3. Tap "Generate" to create 4 camera angles\n\n
                  Your character will be shown in the selected pose from Front, Left Side, Right Side, and Back views - perfect for reference, character sheets, or showcasing poses!
                </Text>
              </View>
            )}
          </View>
        );

      case 'enlarge':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>🔍 Enlarge Image</Text>
            <Text style={styles.toolSubtitle}>Open the canvas in fullscreen for a larger view.</Text>
            <TouchableOpacity style={[styles.applyFrameGuidance, styles.alignStart]} onPress={() => setIsFullscreen(true)} testID="enter-fullscreen">
              <Maximize2 size={16} color="#1A1A1A" />
              <Text style={styles.applyFrameGuidanceText}>Enter Fullscreen</Text>
            </TouchableOpacity>
          </View>
        );

      case 'upscale':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>✨ Quality Enhancement</Text>
            <Text style={styles.toolSubtitle}>Enhance your image with maximum sharpness, detail, and clarity using advanced AI processing.</Text>

            <View style={styles.upscaleInfoBox}>
              <Text style={styles.upscaleInfoTitle}>🎯 What You Get:</Text>
              <Text style={styles.upscaleInfoText}>• Maximum sharpness and clarity boost</Text>
              <Text style={styles.upscaleInfoText}>• Enhanced texture and fine detail</Text>
              <Text style={styles.upscaleInfoText}>• Professional color optimization</Text>
              <Text style={styles.upscaleInfoText}>• Noise reduction with detail preservation</Text>
              <Text style={styles.upscaleInfoText}>• Improved contrast and definition</Text>
            </View>

            <View style={styles.upscaleInfoBox}>
              <Text style={styles.upscaleInfoTitle}>ℹ️ Important Note:</Text>
              <Text style={styles.upscaleInfoText}>This feature enhances quality and sharpness of your existing image. For best results, start with the highest quality source image possible. Very blurry or low-resolution images have limited enhancement potential.</Text>
            </View>

            <TouchableOpacity
              testID="run-upscale"
              accessibilityLabel="Enhance Quality"
              style={[styles.generateButton, (!sourceImage || isUpscaling) && styles.generateButtonDisabled]}
              disabled={!sourceImage || isUpscaling}
              onPress={async () => {
                if (!sourceImage) return;
                try {
                  setIsUpscaling(true);
                  setStatusMessage('Enhancing image quality... This may take 30-60 seconds.');
                  setStatusType('info');
                  if (Platform.OS !== 'web') await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                  console.log('🚀 Starting quality enhancement process...');
                  const result = await upscaleImage();
                  
                  if (result) {
                    setStatusType('success');
                    setStatusMessage('🎉 Image quality enhanced successfully!\n\nYour image now has improved clarity and detail.');
                    if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    setTimeout(() => setStatusMessage(null), 5000);
                  } else {
                    throw new Error('Enhancement failed to return a result');
                  }
                } catch (e) {
                  const msg = e instanceof Error ? e.message : 'Failed to enhance quality';
                  console.error('❌ Enhancement error:', e);
                  setStatusType('error');
                  setStatusMessage(msg);
                  const displayDuration = msg.includes('\n') ? 8000 : 5000;
                  setTimeout(() => setStatusMessage(null), displayDuration);
                } finally {
                  setIsUpscaling(false);
                }
              }}
            >
              {isUpscaling ? (
                <ActivityIndicator size="small" color="#1A1A1A" />
              ) : (
                <>
                  <Sparkles size={16} color="#1A1A1A" />
                  <Text style={styles.generateButtonText}>Enhance Quality Now</Text>
                </>
              )}
            </TouchableOpacity>

            {isUpscaling && (
              <View style={styles.upscaleProgressBox}>
                <Text style={styles.upscaleProgressText}>⏳ Processing your image with advanced AI...</Text>
                <Text style={styles.upscaleProgressSubtext}>This may take 30-60 seconds for best quality</Text>
              </View>
            )}
          </View>
        );

      case 'frames':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>📐 Frame & Aspect Ratio</Text>
            <Text style={styles.toolSubtitle}>Pick a frame to compose your image</Text>
            <View style={styles.frameCategoriesRow}>
              {(Object.keys(frameSizePresets) as Array<keyof typeof frameSizePresets>).map((cat) => (
                <TouchableOpacity key={cat} style={[styles.frameCategoryChip, frameCategory === cat && styles.frameCategoryChipActive]} onPress={() => setFrameCategory(cat)} testID={`frame-category-${cat}`}>
                  <Text style={[styles.frameCategoryText, frameCategory === cat && styles.frameCategoryTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.framesGrid}>
              {frameSizePresets[frameCategory].items.map(item => (
                <TouchableOpacity key={item.key} style={[styles.frameChip, selectedFrameKey === item.key && styles.frameChipActive]} onPress={() => setSelectedFrameKey(item.key)} testID={`frame-${item.key}`}>
                  <View style={styles.frameIconBox}>
                    <View style={[styles.frameIcon, item.ratio >= 1 ? { width: '90%', aspectRatio: item.ratio } : { height: '100%', aspectRatio: item.ratio }]} />
                  </View>
                  <Text style={[styles.frameChipText, selectedFrameKey === item.key && styles.frameChipTextActive]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedFrameKey && (
              <View style={styles.framePositioningSection}>
                <Text style={styles.framePositioningTitle}>🎯 Adjust Image Position</Text>
                
                <View style={styles.gestureInstructionsBox}>
                  <Text style={styles.gestureInstructionTitle}>Touch Gestures:</Text>
                  <Text style={styles.gestureInstruction}>🤏 Pinch with two fingers to zoom (0.5x - 3x)</Text>
                  <Text style={styles.gestureInstruction}>👆 Drag with one finger to pan/move image</Text>
                  <Text style={styles.gestureInstruction}>⬆️⬇️⬅️➡️ Use arrow buttons to move view</Text>
                  <Text style={styles.gestureInstruction}>➕➖ Use +/− buttons for precise zoom control</Text>
                  <Text style={styles.gestureInstruction}>🔄 Tap Reset to center and fit image</Text>
                </View>

                <View style={styles.positionInfoRow}>
                  <View style={styles.positionInfoItem}>
                    <Text style={styles.positionInfoLabel}>Zoom</Text>
                    <Text style={styles.positionInfoValue}>{imageScale.toFixed(2)}x</Text>
                  </View>
                  <View style={styles.positionInfoItem}>
                    <Text style={styles.positionInfoLabel}>Position</Text>
                    <Text style={styles.positionInfoValue}>{imagePositionX.toFixed(0)}, {imagePositionY.toFixed(0)}</Text>
                  </View>
                </View>

                <View style={styles.panControlsContainer}>
                  <Text style={styles.panControlsTitle}>Pan Controls</Text>
                  <View style={styles.panButtonsGrid}>
                    <View style={styles.panButtonRow}>
                      <View style={styles.panButtonSpacer} />
                      <TouchableOpacity
                        style={styles.panButton}
                        onPress={() => {
                          const panStep = 20;
                          const newY = imagePositionY - panStep;
                          const constrained = constrainPosition(imagePositionX, newY, imageScale);
                          setImagePositionY(constrained.y);
                          lastPanY.current = constrained.y;
                          if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }}
                        testID="pan-up"
                      >
                        <Text style={styles.panButtonText}>⬆</Text>
                      </TouchableOpacity>
                      <View style={styles.panButtonSpacer} />
                    </View>
                    <View style={styles.panButtonRow}>
                      <TouchableOpacity
                        style={styles.panButton}
                        onPress={() => {
                          const panStep = 20;
                          const newX = imagePositionX - panStep;
                          const constrained = constrainPosition(newX, imagePositionY, imageScale);
                          setImagePositionX(constrained.x);
                          lastPanX.current = constrained.x;
                          if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }}
                        testID="pan-left"
                      >
                        <Text style={styles.panButtonText}>⬅</Text>
                      </TouchableOpacity>
                      <View style={styles.panButtonCenter} />
                      <TouchableOpacity
                        style={styles.panButton}
                        onPress={() => {
                          const panStep = 20;
                          const newX = imagePositionX + panStep;
                          const constrained = constrainPosition(newX, imagePositionY, imageScale);
                          setImagePositionX(constrained.x);
                          lastPanX.current = constrained.x;
                          if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }}
                        testID="pan-right"
                      >
                        <Text style={styles.panButtonText}>➡</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.panButtonRow}>
                      <View style={styles.panButtonSpacer} />
                      <TouchableOpacity
                        style={styles.panButton}
                        onPress={() => {
                          const panStep = 20;
                          const newY = imagePositionY + panStep;
                          const constrained = constrainPosition(imagePositionX, newY, imageScale);
                          setImagePositionY(constrained.y);
                          lastPanY.current = constrained.y;
                          if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }}
                        testID="pan-down"
                      >
                        <Text style={styles.panButtonText}>⬇</Text>
                      </TouchableOpacity>
                      <View style={styles.panButtonSpacer} />
                    </View>
                  </View>
                </View>

                <View style={styles.zoomControlsRow}>
                  <TouchableOpacity 
                    style={styles.zoomButton} 
                    onPress={() => {
                      const newScale = Math.max(0.5, imageScale - 0.1);
                      setImageScale(newScale);
                      const constrained = constrainPosition(imagePositionX, imagePositionY, newScale);
                      setImagePositionX(constrained.x);
                      setImagePositionY(constrained.y);
                    }}
                    testID="zoom-out"
                  >
                    <Text style={styles.zoomButtonText}>−</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.resetPositionButton} 
                    onPress={() => {
                      setImageScale(1);
                      setImagePositionX(0);
                      setImagePositionY(0);
                      lastScale.current = 1;
                      lastPanX.current = 0;
                      lastPanY.current = 0;
                      initialScale.current = 1;
                      initialTouchDistance.current = 0;
                      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    }}
                    testID="reset-frame-position"
                  >
                    <RotateCcw size={14} color="#FFD700" />
                    <Text style={styles.resetPositionText}>Reset</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.zoomButton} 
                    onPress={() => {
                      const newScale = Math.min(3, imageScale + 0.1);
                      setImageScale(newScale);
                      const constrained = constrainPosition(imagePositionX, imagePositionY, newScale);
                      setImagePositionX(constrained.x);
                      setImagePositionY(constrained.y);
                    }}
                    testID="zoom-in"
                  >
                    <Text style={styles.zoomButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.frameActionsRowX}>
              <TouchableOpacity style={styles.clearFrameButton} onPress={() => {
                setSelectedFrameKey(null);
                setImageScale(1);
                setImagePositionX(0);
                setImagePositionY(0);
                setFrameBoxSize({ width: 0, height: 0 });
                lastScale.current = 1;
                lastPanX.current = 0;
                lastPanY.current = 0;
                initialScale.current = 1;
                initialTouchDistance.current = 0;
                if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }} disabled={!selectedFrameKey} testID="clear-frame">
                <X size={14} color={selectedFrameKey ? '#FF6B6B' : '#666'} />
                <Text style={[styles.clearFrameText, { color: selectedFrameKey ? '#FF6B6B' : '#666' }]}>Clear Frame</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyFrameGuidance}
                onPress={() => {
                  const tag = selectedFrame ? ` Compose to ${selectedFrame.label} aspect ratio with natural framing.` : ' Compose with natural framing.';
                  setEditPrompt(prev => prev ? prev + tag : `Compose image for selected aspect ratio.${tag}`);
                }}
                testID="apply-frame-guidance"
              >
                <Sparkles size={14} color="#1A1A1A" />
                <Text style={styles.applyFrameGuidanceText}>Add Prompt Guidance</Text>
              </TouchableOpacity>
            </View>
          </View>
        );



      case 'undo':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>↩️ Undo History</Text>
            <Text style={styles.toolSubtitle}>Step back to any previous style. New edits append to history.</Text>

            <View style={styles.undoActionsRow}>
              <TouchableOpacity style={styles.undoOneButton} onPress={undoOne} disabled={history.length === 0} testID="undo-one">
                <RotateCcw size={14} color={history.length ? '#1A1A1A' : '#666'} />
                <Text style={[styles.undoOneText, { color: history.length ? '#1A1A1A' : '#666' }]}>Undo Last</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.undoAllButton} onPress={undoAll} disabled={history.length === 0} testID="undo-all">
                <History size={14} color={history.length ? '#FF6B6B' : '#666'} />
                <Text style={[styles.undoAllText, { color: history.length ? '#FF6B6B' : '#666' }]}>Reset To Start</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.historyScroll} contentContainerStyle={styles.historyScrollContent}>
              {history.map((h, idx) => (
                <TouchableOpacity
                  key={h.id}
                  style={styles.historyCard}
                  onPress={() => revertToHistoryIndex(idx)}
                  testID={`history-item-${idx}`}
                >
                  <ExpoImage source={{ uri: h.editedImage }} style={styles.historyThumb} contentFit="cover" />
                  <View style={styles.historyMeta}>
                    <Text numberOfLines={1} style={styles.historyPrompt}>{h.prompt || 'Edit'}</Text>
                    <Text style={styles.historyDate}>{new Date(h.date).toLocaleString()}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              {history.length === 0 ? (
                <View style={styles.historyEmpty} testID="history-empty">
                  <Text style={styles.historyEmptyText}>No edits yet</Text>
                </View>
              ) : null}
            </ScrollView>
          </View>
        );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <LinearGradient colors={['#1A1A1A', '#0A0A0A']} style={StyleSheet.absoluteFillObject} />

      {!isFullscreen && (
        <SafeAreaView edges={['top']} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Edit Image</Text>
              <Text style={styles.headerSubtitle}>Edit Empire</Text>
            </View>
          </View>

          <View style={styles.headerRight} />
        </SafeAreaView>
      )}

      {statusMessage && (
        <View style={[styles.statusBanner, statusType === 'error' ? styles.statusError : statusType === 'success' ? styles.statusSuccess : styles.statusInfo]} testID="status-banner">
          <Text style={styles.statusText}>{statusMessage}</Text>
        </View>
      )}

      <View style={[styles.canvas, isFullscreen && styles.canvasFullscreen]}>
        {sourceImage ? (
          <View style={styles.imageContainer}>
            <View
              ref={(r) => { imageBoxRef.current = r as unknown as View; }}
              onLayout={(e: LayoutChangeEvent) => {
                const { width, height } = e.nativeEvent.layout;
                setImageBoxSize({ width, height });
              }}
              style={StyleSheet.absoluteFill}
              pointerEvents={selectedFrameKey ? 'auto' : 'none'}
              {...panResponder.panHandlers}
            />
            {selectedFrame ? (
              <View style={styles.framedContainer}>
                <View 
                  style={[styles.frameBox, { aspectRatio: selectedFrame.ratio }]}
                  onLayout={(e: LayoutChangeEvent) => {
                    const { width, height } = e.nativeEvent.layout;
                    setFrameBoxSize({ width, height });
                  }}
                > 
                  <View style={styles.imageWrapper}>
                    <ExpoImage 
                      source={{ uri: editedImage || sourceImage }} 
                      style={[
                        styles.framedImage,
                        {
                          transform: [
                            { scale: imageScale },
                            { translateX: imagePositionX },
                            { translateY: imagePositionY }
                          ]
                        }
                      ]} 
                      contentFit="cover" 
                    />
                  </View>
                </View>
                <View style={styles.frameLabel}>
                  <Crop size={12} color="#1A1A1A" />
                  <Text style={styles.frameLabelText}>{selectedFrame.label}</Text>
                </View>
              </View>
            ) : (
              <ExpoImage source={{ uri: editedImage || sourceImage }} style={styles.canvasImage} contentFit="contain" />
            )}

          </View>
        ) : (
          <View style={styles.centeredImageContainer}> 
            <TouchableOpacity style={[styles.applyFrameGuidance, styles.alignCenter]} onPress={() => pickMainImage()} testID="pick-image-empty">
              <Images size={16} color="#1A1A1A" />
              <Text style={styles.applyFrameGuidanceText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        )}



        {isFullscreen && (
          <View style={styles.fullscreenInfo}>
            <Text style={styles.fullscreenInfoText}>Tap anywhere to exit fullscreen</Text>
          </View>
        )}
        {isFullscreen && (
          <TouchableOpacity style={styles.fullscreenOverlay} onPress={() => setIsFullscreen(false)} activeOpacity={1} />
        )}
      </View>

      {!isFullscreen && (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.bottomSheet, cleanUI ? { maxHeight: '45%' } : null]}
          keyboardVerticalOffset={0}
        >
          <View style={styles.toolTabs}>
            {([
              { key: 'prompt' as ToolMode, label: 'Prompt', icon: Sparkles },
              { key: 'hairstyles' as ToolMode, label: 'Hair', icon: Wand2 },
              { key: 'poses' as ToolMode, label: 'Poses', icon: Brain },
              { key: 'frames' as ToolMode, label: 'Frame', icon: Crop },
              { key: 'undo' as ToolMode, label: 'Undo', icon: RotateCcw },
              { key: 'upscale' as ToolMode, label: 'Enhance', icon: Maximize2 },
            ]).map(tab => (
              <TouchableOpacity key={tab.key} style={[styles.toolTab, toolMode === tab.key && styles.toolTabActive]} onPress={() => setToolMode(tab.key)} testID={`tool-tab-${tab.label.toLowerCase()}`}>
                <tab.icon size={16} color={toolMode === tab.key ? '#FFD700' : '#CCCCCC'} />
                <Text style={[styles.toolTabLabel, toolMode === tab.key && styles.toolTabLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView 
            ref={scrollViewRef}
            style={styles.bottomSheetScroll} 
            contentContainerStyle={[
              styles.bottomSheetScrollContent,
              isKeyboardVisible && Platform.OS !== 'web' && { paddingBottom: keyboardHeight + 80 }
            ]} 
            keyboardShouldPersistTaps="handled" 
            showsVerticalScrollIndicator={true}
            keyboardDismissMode="on-drag"
            scrollEventThrottle={16}
          >
            <View style={styles.bottomControlsRow}>
              <TouchableOpacity testID="toggle-fullscreen" style={styles.bottomControlButton} onPress={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? <Minimize size={18} color="#FFD700" /> : <Expand size={18} color="#FFD700" />}
                <Text style={styles.bottomControlText}>{isFullscreen ? 'Exit' : 'Fullscreen'}</Text>
              </TouchableOpacity>
              {sourceImage && (
                <TouchableOpacity
                  testID="delete-or-replace-source"
                  style={styles.bottomControlButton}
                  onPress={() => {
                    Alert.alert('Replace or Delete', 'Replace with another image, or delete to start fresh.', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Replace', onPress: () => pickMainImage() },
                      { text: 'Delete', style: 'destructive', onPress: async () => { setSourceImage(null); setEditedImage(null); if (Platform.OS !== 'web') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); router.back(); } },
                    ]);
                  }}
                >
                  <X size={18} color="#FF6B6B" />
                  <Text style={[styles.bottomControlText, { color: '#FF6B6B' }]}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>

            {renderToolContent()}

            <View style={styles.spacer} />
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {isKeyboardVisible && Platform.OS !== 'web' && (
        <TouchableOpacity 
          style={styles.dismissKeyboardButton}
          onPress={dismissKeyboard}
          testID="dismiss-keyboard"
          accessibilityLabel="Dismiss keyboard"
        >
          <ChevronDown size={20} color="#1A1A1A" />
          <Text style={styles.dismissKeyboardText}>Done</Text>
        </TouchableOpacity>
      )}

      {/* Camera Modal */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
          >
            <SafeAreaView style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.cameraCloseButton}
                onPress={() => setShowCamera(false)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
                  style={styles.cameraCloseGradient}
                >
                  <X size={24} color="#FFFFFF" strokeWidth={2} />
                </LinearGradient>
              </TouchableOpacity>
            </SafeAreaView>
            
            <View style={styles.cameraCaptureContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={capturePhoto}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.captureGradient}
                >
                  <Camera size={32} color="#1A1A1A" strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.captureHint}>Tap to capture</Text>
            </View>
          </CameraView>
        </View>
      </Modal>

      {/* Hairstyle Gallery Modal */}
      <Modal
        visible={showHairstyleGallery}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHairstyleGallery(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafeArea}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowHairstyleGallery(false)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
                  style={styles.modalCloseGradient}
                >
                  <X size={24} color="#FFFFFF" strokeWidth={2} />
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={styles.modalAngleTitle}>
                {['Front View', 'Left Side View', 'Right Side View', 'Back View'][selectedHairstyleImageIndex] || `View ${selectedHairstyleImageIndex + 1}`}
              </Text>
              
              <View style={styles.modalHeaderSpacer} />
            </View>

            <View style={styles.modalImageContainer}>
              {hairstyleGeneratedImages[selectedHairstyleImageIndex] && (
                <ExpoImage
                  source={{ uri: hairstyleGeneratedImages[selectedHairstyleImageIndex] }}
                  style={styles.modalHairstyleImage}
                  contentFit="contain"
                  transition={200}
                />
              )}
            </View>

            <View style={styles.modalHairstyleNavigation}>
              <TouchableOpacity
                style={[styles.modalNavButton, selectedHairstyleImageIndex === 0 && styles.modalNavButtonDisabled]}
                onPress={() => {
                  if (selectedHairstyleImageIndex > 0) {
                    setSelectedHairstyleImageIndex(selectedHairstyleImageIndex - 1);
                    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                disabled={selectedHairstyleImageIndex === 0}
              >
                <LinearGradient
                  colors={selectedHairstyleImageIndex === 0 ? ['rgba(100,100,100,0.3)', 'rgba(80,80,80,0.3)'] : ['#FFD700', '#FFA500']}
                  style={styles.modalNavGradient}
                >
                  <Text style={[styles.modalNavText, selectedHairstyleImageIndex === 0 && styles.modalNavTextDisabled]}>← Previous</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={styles.modalNavCounter}>
                {selectedHairstyleImageIndex + 1} / {hairstyleGeneratedImages.length}
              </Text>
              
              <TouchableOpacity
                style={[styles.modalNavButton, selectedHairstyleImageIndex === hairstyleGeneratedImages.length - 1 && styles.modalNavButtonDisabled]}
                onPress={() => {
                  if (selectedHairstyleImageIndex < hairstyleGeneratedImages.length - 1) {
                    setSelectedHairstyleImageIndex(selectedHairstyleImageIndex + 1);
                    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                disabled={selectedHairstyleImageIndex === hairstyleGeneratedImages.length - 1}
              >
                <LinearGradient
                  colors={selectedHairstyleImageIndex === hairstyleGeneratedImages.length - 1 ? ['rgba(100,100,100,0.3)', 'rgba(80,80,80,0.3)'] : ['#FFD700', '#FFA500']}
                  style={styles.modalNavGradient}
                >
                  <Text style={[styles.modalNavText, selectedHairstyleImageIndex === hairstyleGeneratedImages.length - 1 && styles.modalNavTextDisabled]}>Next →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.modalThumbnailScroll}
              contentContainerStyle={styles.modalThumbnailContent}
            >
              {hairstyleGeneratedImages.map((imgUri, idx) => (
                <TouchableOpacity
                  key={`thumb-${idx}`}
                  style={[styles.modalThumbnail, selectedHairstyleImageIndex === idx && styles.modalThumbnailActive]}
                  onPress={() => {
                    setSelectedHairstyleImageIndex(idx);
                    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <ExpoImage
                    source={{ uri: imgUri }}
                    style={styles.modalThumbnailImage}
                    contentFit="cover"
                  />
                  <Text style={styles.modalThumbnailLabel}>
                    {['Front', 'Left', 'Right', 'Back'][idx] || `${idx + 1}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Pose Gallery Modal */}
      <Modal
        visible={showPoseGallery}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPoseGallery(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafeArea}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowPoseGallery(false)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
                  style={styles.modalCloseGradient}
                >
                  <X size={24} color="#FFFFFF" strokeWidth={2} />
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={styles.modalAngleTitle}>
                {['Front View', 'Left Side View', 'Right Side View', 'Back View'][selectedPoseImageIndex] || `View ${selectedPoseImageIndex + 1}`}
              </Text>
              
              <View style={styles.modalHeaderSpacer} />
            </View>

            <View style={styles.modalImageContainer}>
              {poseGeneratedImages[selectedPoseImageIndex] && (
                <ExpoImage
                  source={{ uri: poseGeneratedImages[selectedPoseImageIndex] }}
                  style={styles.modalHairstyleImage}
                  contentFit="contain"
                  transition={200}
                />
              )}
            </View>

            <View style={styles.modalHairstyleNavigation}>
              <TouchableOpacity
                style={[styles.modalNavButton, selectedPoseImageIndex === 0 && styles.modalNavButtonDisabled]}
                onPress={() => {
                  if (selectedPoseImageIndex > 0) {
                    setSelectedPoseImageIndex(selectedPoseImageIndex - 1);
                    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                disabled={selectedPoseImageIndex === 0}
              >
                <LinearGradient
                  colors={selectedPoseImageIndex === 0 ? ['rgba(100,100,100,0.3)', 'rgba(80,80,80,0.3)'] : ['#FFD700', '#FFA500']}
                  style={styles.modalNavGradient}
                >
                  <Text style={[styles.modalNavText, selectedPoseImageIndex === 0 && styles.modalNavTextDisabled]}>← Previous</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={styles.modalNavCounter}>
                {selectedPoseImageIndex + 1} / {poseGeneratedImages.length}
              </Text>
              
              <TouchableOpacity
                style={[styles.modalNavButton, selectedPoseImageIndex === poseGeneratedImages.length - 1 && styles.modalNavButtonDisabled]}
                onPress={() => {
                  if (selectedPoseImageIndex < poseGeneratedImages.length - 1) {
                    setSelectedPoseImageIndex(selectedPoseImageIndex + 1);
                    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                disabled={selectedPoseImageIndex === poseGeneratedImages.length - 1}
              >
                <LinearGradient
                  colors={selectedPoseImageIndex === poseGeneratedImages.length - 1 ? ['rgba(100,100,100,0.3)', 'rgba(80,80,80,0.3)'] : ['#FFD700', '#FFA500']}
                  style={styles.modalNavGradient}
                >
                  <Text style={[styles.modalNavText, selectedPoseImageIndex === poseGeneratedImages.length - 1 && styles.modalNavTextDisabled]}>Next →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.modalThumbnailScroll}
              contentContainerStyle={styles.modalThumbnailContent}
            >
              {poseGeneratedImages.map((imgUri, idx) => (
                <TouchableOpacity
                  key={`thumb-${idx}`}
                  style={[styles.modalThumbnail, selectedPoseImageIndex === idx && styles.modalThumbnailActive]}
                  onPress={() => {
                    setSelectedPoseImageIndex(idx);
                    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <ExpoImage
                    source={{ uri: imgUri }}
                    style={styles.modalThumbnailImage}
                    contentFit="cover"
                  />
                  <Text style={styles.modalThumbnailLabel}>
                    {['Front', 'Left', 'Right', 'Back'][idx] || `${idx + 1}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

async function getBase64FromUri(uri: string): Promise<string> {
  try {
    if (uri.startsWith('data:')) {
      const parts = uri.split(',');
      return parts[1] ?? '';
    }
    if (Platform.OS === 'web') {
      const res = await fetch(uri, { cache: 'no-store' });
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1] ?? '';
          resolve(base64);
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(blob);
      });
    } else {
      const FS = await import('expo-file-system');
      const b64 = await FS.readAsStringAsync(uri, { encoding: FS.EncodingType.Base64 });
      return b64;
    }
  } catch (e) {
    throw new Error('Failed to load image for upscaling');
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  headerCenter: { flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 16 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  backButton: { padding: 8 },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600' as const, color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: '#FFD700', marginTop: 2 },
  headerButton: { padding: 8, position: 'relative', marginLeft: 8 },
  headerCumulativeIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0, 255, 136, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(0, 255, 136, 0.3)' },
  headerCumulativeText: { fontSize: 10, color: '#00FF88', fontWeight: '600' as const },
  headerResetButton: { width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', justifyContent: 'center', marginLeft: 4 },

  statusBanner: { position: 'absolute', top: 72, left: 12, right: 12, zIndex: 1200, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1 },
  statusText: { color: '#1A1A1A', fontSize: 12, fontWeight: '600' as const, textAlign: 'center' as const, lineHeight: 18 },
  statusError: { backgroundColor: '#FFB3B3', borderColor: '#FF6B6B' },
  statusSuccess: { backgroundColor: '#B3FFD9', borderColor: '#00FF88' },
  statusInfo: { backgroundColor: '#FFE9A6', borderColor: '#FFD700' },

  canvas: { flex: 1, backgroundColor: '#0A0A0A', position: 'relative' },
  imageContainer: { width: '100%', height: '100%', position: 'relative' },
  changeImageButton: { position: 'absolute', top: 16, left: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)', zIndex: 10, gap: 6 },
  changeImageText: { color: '#FFD700', fontSize: 12, fontWeight: '600' as const },
  quickUpscaleButton: { position: 'absolute', top: 60, left: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFD700', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0,0,0,0.15)', zIndex: 10, gap: 6 },
  quickUpscaleText: { color: '#1A1A1A', fontSize: 12, fontWeight: '700' as const },
  bottomControlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: 'rgba(26, 26, 26, 0.95)', borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)' },
  bottomControlButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  bottomControlText: { fontSize: 12, color: '#FFD700', fontWeight: '600' as const },
  canvasFullscreen: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 },
  canvasImage: { width: '100%', height: '100%' },
  canvasControls: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', gap: 8 },
  fullscreenButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  fullscreenOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  fullscreenInfo: { position: 'absolute', bottom: 20, left: 20, right: 20, alignItems: 'center', gap: 8 },
  fullscreenInfoText: { fontSize: 14, color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },

  toolTabs: { flexDirection: 'row', backgroundColor: 'rgba(26, 26, 26, 0.95)', paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  toolTab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  toolTabActive: { borderBottomWidth: 2, borderBottomColor: '#FFD700' },
  toolTabLabel: { fontSize: 11, color: '#666', marginTop: 4 },
  toolTabLabelActive: { color: '#FFD700', fontWeight: '600' as const },
  bottomSheet: { backgroundColor: 'rgba(26, 26, 26, 0.98)', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 12, paddingBottom: 12, maxHeight: '65%', minHeight: 200, zIndex: 100, overflow: 'hidden' },
  toolContent: { paddingHorizontal: 20, paddingBottom: 12 },
  toolTitle: { fontSize: 16, fontWeight: '600' as const, color: '#FFFFFF', marginBottom: 16 },
  toolSubtitle: { fontSize: 12, color: '#999', marginBottom: 16 },

  promptContainer: { position: 'relative' },
  promptButtonsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 8 },
  promptInput: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, padding: 12, color: '#FFFFFF', fontSize: 14, minHeight: 80, maxHeight: 120, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.2)' },
  deleteAllButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 107, 107, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4, borderWidth: 1, borderColor: 'rgba(255, 107, 107, 0.3)' },
  deleteAllText: { fontSize: 11, fontWeight: '600' as const, color: '#FF6B6B' },
  voiceButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#9D4EDD', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  voiceButtonActive: { backgroundColor: '#FF6B6B' },
  voiceButtonText: { fontSize: 11, fontWeight: '600' as const, color: '#1A1A1A' },
  enhancePromptButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFD700', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  enhancePromptText: { fontSize: 11, fontWeight: '600' as const, color: '#1A1A1A' },

  referenceSection: { marginTop: 16, marginBottom: 4 },
  referenceSectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 14, fontWeight: '600' as const, color: '#FFFFFF', marginBottom: 8 },
  addButtonsContainer: { flexDirection: 'row', gap: 12 },
  addReferenceButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255, 215, 0, 0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.2)' },
  referenceImagesScroll: { marginTop: 8 },
  referenceImageContainer: { width: 60, height: 60, marginRight: 8, borderRadius: 8, overflow: 'hidden', position: 'relative' },
  referenceImage: { width: '100%', height: '100%' },
  removeReferenceButton: { position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', justifyContent: 'center' },

  framedContainer: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  frameBox: { width: '92%', borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.35)', borderRadius: 12, overflow: 'hidden', backgroundColor: '#000000' },
  imageWrapper: { width: '100%', height: '100%', overflow: 'hidden' },
  framedImage: { width: '100%', height: '100%' },
  frameLabel: { position: 'absolute', bottom: 24, backgroundColor: '#FFD700', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  frameLabelText: { color: '#1A1A1A', fontSize: 12, fontWeight: '700' as const },
  frameCategoriesScroll: { marginBottom: 12, maxHeight: 50 },
  frameCategoriesRow: { flexDirection: 'row', gap: 8 },
  frameCategoryChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  frameCategoryChipActive: { backgroundColor: 'rgba(255, 215, 0, 0.12)', borderColor: '#FFD700' },
  frameCategoryText: { fontSize: 12, color: '#999' },
  frameCategoryTextActive: { color: '#FFD700', fontWeight: '600' as const },
  presetItemsScroll: { maxHeight: 280, marginBottom: 12 },
  framesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  frameChip: { width: '48%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', gap: 8 },
  frameChipActive: { backgroundColor: 'rgba(255, 215, 0, 0.12)', borderColor: '#FFD700' },
  frameIconBox: { width: '100%', height: 80, alignItems: 'center', justifyContent: 'center' },
  frameIcon: { borderWidth: 2, borderColor: 'rgba(255, 215, 0, 0.6)', borderRadius: 10, backgroundColor: 'rgba(255, 215, 0, 0.08)' },
  frameChipText: { fontSize: 12, color: '#CCCCCC', fontWeight: '600' as const },
  frameChipTextActive: { color: '#FFD700' },

  upscaleInfoBox: { backgroundColor: 'rgba(255, 215, 0, 0.08)', borderRadius: 12, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.2)' },
  upscaleInfoTitle: { fontSize: 13, fontWeight: '700' as const, color: '#FFD700', marginBottom: 8 },
  upscaleInfoText: { fontSize: 11, color: '#CCCCCC', lineHeight: 18, marginBottom: 2 },
  upscaleProgressBox: { marginTop: 16, backgroundColor: 'rgba(157, 78, 221, 0.1)', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(157, 78, 221, 0.3)' },
  upscaleProgressText: { fontSize: 12, fontWeight: '600' as const, color: '#9D4EDD', textAlign: 'center' as const, marginBottom: 4 },
  upscaleProgressSubtext: { fontSize: 10, color: '#999', textAlign: 'center' as const },

  undoActionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  undoOneButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#FFD700' },
  undoOneText: { fontSize: 12, fontWeight: '700' as const, color: '#1A1A1A' },
  undoAllButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255, 107, 107, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 107, 107, 0.4)' },
  undoAllText: { fontSize: 12, fontWeight: '700' as const, color: '#FF6B6B' },
  historyScroll: { marginTop: 6 },
  historyScrollContent: { paddingRight: 8 },
  historyCard: { width: 120, marginRight: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  historyThumb: { width: '100%', height: 80 },
  historyMeta: { paddingHorizontal: 8, paddingVertical: 6, gap: 2 },
  historyPrompt: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' as const },
  historyDate: { color: '#999', fontSize: 10 },
  historyEmpty: { paddingVertical: 16, paddingHorizontal: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignSelf: 'flex-start' },
  historyEmptyText: { color: '#999', fontSize: 12 },

  selectionBox: { position: 'absolute', borderWidth: 2, borderColor: '#FFD700', backgroundColor: 'rgba(255, 215, 0, 0.1)', zIndex: 25 },
  applyFrameGuidance: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#FFD700' },
  applyFrameGuidanceText: { fontSize: 12, color: '#1A1A1A', fontWeight: '700' as const },
  clearFrameButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255, 107, 107, 0.08)', borderWidth: 1, borderColor: 'rgba(255, 107, 107, 0.25)' },
  clearFrameText: { fontSize: 12, fontWeight: '600' as const },

  bottomSheetScroll: { maxHeight: '100%' },
  bottomSheetScrollContent: { paddingBottom: 20 },
  spacer: { height: 16 },
  generateButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FFD700', paddingVertical: 12, borderRadius: 12, marginTop: 12 },
  generateButtonDisabled: { opacity: 0.6 },
  generateButtonText: { color: '#1A1A1A', fontSize: 14, fontWeight: '700' as const },
  previewBox: { marginTop: 12 },
  previewImage: { width: '100%', height: 200, borderRadius: 12 },
  frameActionsRowX: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  framePositioningSection: { marginTop: 16, marginBottom: 12, backgroundColor: 'rgba(255, 215, 0, 0.08)', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.2)' },
  framePositioningTitle: { fontSize: 13, fontWeight: '700' as const, color: '#FFD700', marginBottom: 12 },
  gestureInstructionsBox: { backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.15)' },
  gestureInstructionTitle: { fontSize: 12, fontWeight: '700' as const, color: '#FFD700', marginBottom: 8 },
  gestureInstruction: { fontSize: 11, color: '#CCCCCC', lineHeight: 18, marginBottom: 4 },
  positionInfoRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  positionInfoItem: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 8, padding: 10, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.15)' },
  positionInfoLabel: { fontSize: 10, color: '#999', marginBottom: 4, fontWeight: '600' as const },
  positionInfoValue: { fontSize: 13, color: '#FFD700', fontWeight: '700' as const },
  sliderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  sliderLabel: { fontSize: 11, color: '#CCCCCC', width: 70, fontWeight: '600' as const },
  slider: { flex: 1 },
  sliderValue: { fontSize: 11, color: '#FFD700', width: 50, textAlign: 'right' as const, fontWeight: '600' as const },
  zoomControlsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  zoomButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255, 215, 0, 0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
  zoomButtonText: { fontSize: 24, color: '#FFD700', fontWeight: '700' as const, lineHeight: 28 },
  resetPositionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(255, 215, 0, 0.1)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
  resetPositionText: { fontSize: 12, color: '#FFD700', fontWeight: '700' as const },
  panControlsContainer: { marginBottom: 12, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.15)' },
  hairstyleChip: { width: '48%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', gap: 8, minHeight: 90 },
  hairstyleEmoji: { fontSize: 32, textAlign: 'center' as const },
  hairstyleApplySection: { marginTop: 12, gap: 12 },
  hairstyleInfoBox: { backgroundColor: 'rgba(255, 215, 0, 0.08)', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.2)' },
  hairstyleInfoTitle: { fontSize: 13, fontWeight: '700' as const, color: '#FFD700', marginBottom: 8 },
  hairstyleInfoText: { fontSize: 11, color: '#CCCCCC', lineHeight: 18 },
  progressIndicatorContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFD700',
    textAlign: 'center' as const,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center' as const,
  },
  panControlsTitle: { fontSize: 12, fontWeight: '600' as const, color: '#FFD700', marginBottom: 8, textAlign: 'center' as const },
  panButtonsGrid: { alignItems: 'center', gap: 6 },
  panButtonRow: { flexDirection: 'row', gap: 6 },
  panButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255, 215, 0, 0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
  panButtonText: { fontSize: 20, color: '#FFD700' },
  panButtonSpacer: { width: 44 },
  panButtonCenter: { width: 44 },
  alignStart: { alignSelf: 'flex-start' },
  alignCenter: { alignSelf: 'center' },
  centeredImageContainer: { width: '100%', height: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center' },
  dismissKeyboardButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
    zIndex: 2000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  dismissKeyboardText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '700' as const,
  },
  instructionTip: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  instructionTipText: {
    color: '#FFD700',
    fontSize: 11,
    lineHeight: 16,
  },
  applyPresetSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  applyPresetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  applyPresetButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  applyPresetButtonText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '700' as const,
  },
  changeImageButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    zIndex: 10,
  },
  cameraCloseButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cameraCloseGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraCaptureContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 12,
  },
  captureButton: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  captureGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureHint: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  hairstyleGallerySection: {
    marginTop: 20,
    marginBottom: 16,
  },
  hairstyleGalleryTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#FFD700',
    marginBottom: 4,
  },
  hairstyleGallerySubtitle: {
    fontSize: 11,
    color: '#999',
    marginBottom: 12,
  },
  hairstyleGalleryScroll: {
    marginTop: 8,
  },
  hairstyleGalleryContent: {
    paddingRight: 12,
  },
  hairstyleGalleryItem: {
    width: 140,
    height: 180,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  hairstyleGalleryImage: {
    width: '100%',
    height: '100%',
  },
  hairstyleGalleryLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  hairstyleGalleryLabelText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: '#FFD700',
    textAlign: 'center' as const,
  },
  editBoxSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  editBoxButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#9D4EDD',
    paddingVertical: 12,
    borderRadius: 12,
  },
  editBoxButtonActive: {
    backgroundColor: '#00FF88',
  },
  editBoxButtonText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '700' as const,
  },
  clearSelectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  clearSelectionText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FF6B6B',
  },
  editBoxInstructions: {
    backgroundColor: 'rgba(157, 78, 221, 0.1)',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.3)',
  },
  editBoxInstructionsTitle: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: '#9D4EDD',
    marginBottom: 8,
  },
  editBoxInstructionsText: {
    fontSize: 11,
    color: '#CCCCCC',
    lineHeight: 18,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalSafeArea: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalCloseButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalCloseGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalAngleTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFD700',
  },
  modalHeaderSpacer: {
    width: 40,
  },
  modalHairstyleImage: {
    width: '100%',
    height: '100%',
  },
  modalHairstyleNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  modalNavButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalNavButtonDisabled: {
    opacity: 0.5,
  },
  modalNavGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalNavText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  modalNavTextDisabled: {
    color: '#666',
  },
  modalNavCounter: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    minWidth: 60,
    textAlign: 'center' as const,
  },
  modalThumbnailScroll: {
    maxHeight: 100,
    marginBottom: 20,
  },
  modalThumbnailContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  modalThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalThumbnailActive: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  modalThumbnailImage: {
    width: '100%',
    height: '100%',
  },
  modalThumbnailLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 2,
    fontSize: 9,
    fontWeight: '600' as const,
    color: '#FFD700',
    textAlign: 'center' as const,
  },
});
