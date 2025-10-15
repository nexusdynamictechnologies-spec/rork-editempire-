import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EditorProvider } from "@/contexts/EditorContext";

if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
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

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <EditorProvider>
        <RootLayoutNav />
      </EditorProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});