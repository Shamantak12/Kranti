import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppState, AppStateStatus } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';
import BackgroundMusicService from './src/services/BackgroundMusicService';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle app state changes
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // Resume background music when app comes to foreground
        BackgroundMusicService.resumeBackgroundMusic();
      } else if (nextAppState === 'background') {
        // Pause background music when app goes to background
        BackgroundMusicService.pauseBackgroundMusic();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup on unmount
    return () => {
      subscription?.remove();
      BackgroundMusicService.cleanup();
    };
  }, []);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  return (
    <>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <AppNavigator />
    </>
  );
}
