import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, Component, ReactNode } from "react";
import { StyleSheet, Platform, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EditorProvider } from "@/contexts/EditorContext";

if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('🚨 Error Boundary caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🚨 Error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️ Something went wrong</Text>
          <Text style={styles.errorText}>Please restart the app</Text>
          <Text style={styles.errorDetail}>{this.state.error?.message || 'Unknown error'}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ 
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: '#1A1A1A',
      },
      headerTintColor: '#FFFFFF',
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="editor" options={{ headerShown: false }} />
      <Stack.Screen name="instructions" options={{ headerShown: false }} />
      <Stack.Screen name="smart-help" options={{ headerShown: false }} />
      <Stack.Screen name="camera-angles" options={{ headerShown: false }} />
      <Stack.Screen 
        name="export" 
        options={{ 
          presentation: "modal",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="subscription" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(Platform.OS === 'web');

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Unhandled Promise Rejection:', event.reason);
      console.error('🚨 Promise:', event.promise);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
    }

    async function prepare() {
      try {
        console.log('🚀 App initializing...');
        
        if (Platform.OS === 'web') {
          setIsReady(true);
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log('✅ App ready');
      } catch (e) {
        console.error('❌ App initialization error:', e);
      } finally {
        setIsReady(true);
        if (Platform.OS !== 'web') {
          await SplashScreen.hideAsync().catch(() => {});
        }
      }
    }

    prepare().catch(err => console.error('Prepare error:', err));

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      }
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.container}>
        <EditorProvider>
          <RootLayoutNav />
        </EditorProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#FF6B6B',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center' as const,
  },
  errorDetail: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center' as const,
  },
});