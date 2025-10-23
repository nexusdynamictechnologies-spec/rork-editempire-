import React, { useState, useRef, useEffect } from 'react';
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
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Sparkles,
  Wand2,
  Download,
  RotateCcw,
  ZoomIn,
  Mic,
  MicOff,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { useEditor } from '@/contexts/EditorContext';
import { Image as ExpoImage } from 'expo-image';

export default function EditorScreen() {
  const {
    sourceImage,
    editedImage,
    generateEdit,
    undoOne,
    saveCurrentImage,
    upscaleImage,
  } = useEditor();

  const [editPrompt, setEditPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'info' | 'error' | 'success'>('info');
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState<boolean>(false);
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingInstance, setRecordingInstance] = useState<Audio.Recording | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => {
      keyboardDidShowListener?.remove();
    };
  }, []);

  const cleanupRecording = async () => {
    console.log('🧹 Cleaning up recording...');
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
          } else {
            try {
              await recordingInstance.stopAndUnloadAsync();
            } catch (e) {
              console.warn('Recording already stopped:', e);
            }
          }
        } catch (e) {
          console.warn('Error stopping recording:', e);
          try {
            await recordingInstance.stopAndUnloadAsync();
          } catch (stopError) {
            console.warn('Could not force stop recording:', stopError);
          }
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
      console.log('🎤 Starting recording...', { isRecording, hasRecordingInstance: !!recordingInstance });
      
      if (isRecording) {
        console.log('⚠️ Already recording, ignoring start request');
        return;
      }

      await cleanupRecording();
      await new Promise(resolve => setTimeout(resolve, 100));

      if (Platform.OS === 'web') {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          Alert.alert('Not Supported', 'Voice recording is not supported in this browser.');
          return;
        }

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
        console.log('✅ Web recording started');
      } else {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Microphone access is required for voice input.');
          return;
        }

        console.log('🔧 Setting audio mode...');
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log('📱 Creating new recording instance...');
        const recording = new Audio.Recording();
        
        console.log('⚙️ Preparing to record...');
        await recording.prepareToRecordAsync({
          android: {
            extension: '.m4a',
            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
            audioEncoder: Audio.AndroidAudioEncoder.AAC,
          },
          ios: {
            extension: '.wav',
            outputFormat: Audio.IOSOutputFormat.LINEARPCM,
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          web: {},
        });

        console.log('▶️ Starting recording...');
        await recording.startAsync();
        setRecordingInstance(recording);
        setIsRecording(true);
        console.log('✅ Mobile recording started successfully');

        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }
    } catch (error: unknown) {
      console.error('❌ Failed to start recording:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
      await cleanupRecording();
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Recording Error', `Failed to start recording: ${errorMessage}\n\nPlease try again.`);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    try {
      setIsRecording(false);
      setStatusMessage('Transcribing audio...');
      setStatusType('info');

      if (Platform.OS === 'web') {
        if (!mediaRecorderRef.current) {
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

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        const response = await fetch('https://toolkit.rork.com/stt/transcribe/', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Transcription failed');
        const data = await response.json();

        if (data.text) {
          setEditPrompt(prev => prev ? `${prev} ${data.text}` : data.text);
          setStatusMessage('Voice input added successfully');
          setStatusType('success');
        }

        mediaRecorderRef.current = null;
        audioChunksRef.current = [];
      } else {
        if (!recordingInstance) {
          setStatusMessage('Recording not found');
          setStatusType('error');
          setTimeout(() => setStatusMessage(null), 2000);
          return;
        }

        await recordingInstance.stopAndUnloadAsync();
        const uri = recordingInstance.getURI();
        if (!uri) throw new Error('No recording URI');

        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        const formData = new FormData();
        formData.append('audio', {
          uri,
          name: `recording.${fileType}`,
          type: `audio/${fileType}`,
        } as any);

        const response = await fetch('https://toolkit.rork.com/stt/transcribe/', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Transcription failed');
        const data = await response.json();

        if (data.text) {
          setEditPrompt(prev => prev ? `${prev} ${data.text}` : data.text);
          setStatusMessage('Voice input added successfully');
          setStatusType('success');
          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        }

        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        setRecordingInstance(null);
      }

      setTimeout(() => setStatusMessage(null), 2000);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setStatusMessage('Failed to transcribe audio');
      setStatusType('error');
      setTimeout(() => setStatusMessage(null), 3000);
      await cleanupRecording();
    }
  };

  const handleEnhancePrompt = async () => {
    if (!editPrompt.trim()) return;

    setIsEnhancingPrompt(true);
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert at enhancing image editing prompts. Expand the user\'s prompt with technical details for better AI image editing results. Respond ONLY with the enhanced prompt, no explanations.'
            },
            { role: 'user', content: editPrompt.trim() },
          ],
        }),
      });

      if (!response.ok) throw new Error('Failed to enhance prompt');
      
      const result = await response.json();
      const enhancedText = result.completion || result.text || result.response || result.output;

      if (enhancedText && typeof enhancedText === 'string' && enhancedText.trim()) {
        setEditPrompt(enhancedText.trim());
        setStatusMessage('Prompt enhanced successfully');
        setStatusType('success');
        setTimeout(() => setStatusMessage(null), 2000);
      } else {
        throw new Error('No enhanced text received');
      }
    } catch (error) {
      console.error('Prompt enhancement error:', error);
      setStatusMessage('Failed to enhance prompt');
      setStatusType('error');
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setIsEnhancingPrompt(false);
    }
  };

  const handleGenerate = async () => {
    if (!editPrompt.trim()) {
      Alert.alert('Missing Prompt', 'Please describe what you want to edit');
      return;
    }

    if (!sourceImage) {
      Alert.alert('No Image', 'Please upload an image first');
      return;
    }

    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    Keyboard.dismiss();
    setIsGenerating(true);
    setStatusMessage('Generating your edit...');
    setStatusType('info');

    try {
      await generateEdit({
        prompt: editPrompt,
        strength: 0.8,
        identityLock: true,
        upscale: false,
        watermark: false,
      });

      setStatusMessage('Edit completed successfully!');
      setStatusType('success');
      setTimeout(() => setStatusMessage(null), 2000);

      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Generation error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to generate edit';
      setStatusMessage(errorMsg);
      setStatusType('error');
      setTimeout(() => setStatusMessage(null), 5000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpscale = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    setIsUpscaling(true);
    setStatusMessage('Enhancing quality...');
    setStatusType('info');

    try {
      await upscaleImage();
      setStatusMessage('Quality enhanced!');
      setStatusType('success');
      setTimeout(() => setStatusMessage(null), 2000);

      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Upscale error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to enhance quality';
      setStatusMessage(errorMsg);
      setStatusType('error');
      setTimeout(() => setStatusMessage(null), 5000);
    } finally {
      setIsUpscaling(false);
    }
  };

  const handleSave = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      const success = await saveCurrentImage();
      if (success) {
        setStatusMessage('Image saved successfully!');
        setStatusType('success');
        setTimeout(() => setStatusMessage(null), 2000);
        if (Platform.OS !== 'web') {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } else {
        throw new Error('Failed to save image');
      }
    } catch {
      setStatusMessage('Failed to save image');
      setStatusType('error');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const currentImage = editedImage || sourceImage;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Image</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Download size={22} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Message */}
        {statusMessage && (
          <View style={[
            styles.statusBar,
            statusType === 'error' && styles.statusError,
            statusType === 'success' && styles.statusSuccess,
          ]}>
            <Text style={styles.statusText}>{statusMessage}</Text>
          </View>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
          keyboardVerticalOffset={100}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Image Preview */}
            {currentImage && (
              <View style={styles.imageContainer}>
                <ExpoImage
                  source={{ uri: currentImage }}
                  style={styles.image}
                  contentFit="contain"
                />
              </View>
            )}

            {/* Prompt Input */}
            <View style={styles.promptSection}>
              <View style={styles.promptHeader}>
                <Text style={styles.sectionTitle}>Edit Prompt</Text>
                <View style={styles.promptActions}>
                  <TouchableOpacity
                    style={styles.enhanceButton}
                    onPress={handleEnhancePrompt}
                    disabled={isEnhancingPrompt || !editPrompt.trim()}
                    activeOpacity={0.7}
                  >
                    {isEnhancingPrompt ? (
                      <ActivityIndicator size="small" color="#FFD700" />
                    ) : (
                      <>
                        <Sparkles size={18} color="#FFD700" />
                        <Text style={styles.enhanceButtonText}>AI Enhance</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.micButton, isRecording && styles.micButtonRecording]}
                    onPress={isRecording ? stopRecording : startRecording}
                    activeOpacity={0.7}
                  >
                    {isRecording ? (
                      <MicOff size={18} color="#FF4444" />
                    ) : (
                      <Mic size={18} color="#FFD700" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TextInput
                style={styles.promptInput}
                value={editPrompt}
                onChangeText={setEditPrompt}
                placeholder="Describe what you want to edit... (e.g., 'change shirt to red')"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.primaryButton, isGenerating && styles.buttonDisabled]}
                onPress={handleGenerate}
                disabled={isGenerating || !editPrompt.trim()}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.buttonGradient}
                >
                  {isGenerating ? (
                    <ActivityIndicator size="small" color="#1A1A1A" />
                  ) : (
                    <>
                      <Wand2 size={20} color="#1A1A1A" />
                      <Text style={styles.primaryButtonText}>Generate Edit</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.secondaryButtons}>
                <TouchableOpacity
                  style={[styles.secondaryButton, isUpscaling && styles.buttonDisabled]}
                  onPress={handleUpscale}
                  disabled={isUpscaling || !currentImage}
                  activeOpacity={0.7}
                >
                  {isUpscaling ? (
                    <ActivityIndicator size="small" color="#FFD700" />
                  ) : (
                    <>
                      <ZoomIn size={18} color="#FFD700" />
                      <Text style={styles.secondaryButtonText}>Enhance Quality</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    undoOne();
                    if (Platform.OS !== 'web') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <RotateCcw size={18} color="#FFD700" />
                  <Text style={styles.secondaryButtonText}>Undo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsCard}>
              <Text style={styles.instructionsTitle}>💡 Tips for Best Results</Text>
              <Text style={styles.instructionText}>• Be specific: &ldquo;change shirt to red leather jacket&rdquo;</Text>
              <Text style={styles.instructionText}>• Use AI Enhance for better prompts</Text>
              <Text style={styles.instructionText}>• Edit cumulatively - each edit builds on the previous one</Text>
              <Text style={styles.instructionText}>• Enhance quality after all edits are complete</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  statusError: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  statusSuccess: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  statusText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  promptSection: {
    marginBottom: 24,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  promptActions: {
    flexDirection: 'row',
    gap: 8,
  },
  enhanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
  },
  enhanceButtonText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#FFD700',
  },
  micButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
  },
  micButtonRecording: {
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
  },
  promptInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#FFFFFF',
    minHeight: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#FFD700',
  },
  instructionsCard: {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  instructionsTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#FFD700',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 13,
    color: '#CCCCCC',
    marginBottom: 8,
    lineHeight: 20,
  },
});
