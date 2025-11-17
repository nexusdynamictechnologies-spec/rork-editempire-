import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function ContactScreen() {
  const email = 'Nexusdynamictechnologies@gmail.com';

  const handleEmailPress = async () => {
    try {
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(e => console.warn('Haptics failed:', e));
      }
      
      const url = `mailto:${email}`;
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        console.warn('Cannot open email client');
      }
    } catch (error) {
      console.error('Error opening email:', error);
    }
  };

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
            onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(e => console.warn('Haptics failed:', e));
              }
              router.back();
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 165, 0, 0.2)']}
              style={styles.backButtonGradient}
            >
              <ArrowLeft size={24} color="#FFD700" strokeWidth={2} />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.iconGradient}
            >
              <Mail size={48} color="#1A1A1A" strokeWidth={2} />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Get in Touch</Text>
          <Text style={styles.subtitle}>
            We&apos;d love to hear from you! Send us an email and we&apos;ll get back to you as soon as possible.
          </Text>

          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.emailButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Mail size={24} color="#1A1A1A" strokeWidth={2} />
              <Text style={styles.emailText}>{email}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.1)', 'rgba(255, 165, 0, 0.1)']}
              style={styles.infoBoxGradient}
            >
              <Text style={styles.infoTitle}>Support Hours</Text>
              <Text style={styles.infoText}>Monday - Friday: 9:00 AM - 6:00 PM EST</Text>
              <Text style={styles.infoText}>Weekend: Emergency support available</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.infoTitle}>What We Help With</Text>
              <Text style={styles.infoText}>• Technical support</Text>
              <Text style={styles.infoText}>• Feature requests</Text>
              <Text style={styles.infoText}>• Bug reports</Text>
              <Text style={styles.infoText}>• General inquiries</Text>
            </LinearGradient>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  backButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  emailButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  emailButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 12,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  infoBox: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  infoBoxGradient: {
    padding: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFD700',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    marginVertical: 20,
  },
});
