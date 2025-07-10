// Kranti App - Enhanced Splash Screen with Background Music Integration
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';
import BackgroundMusicService from '../services/BackgroundMusicService';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const subtitleFadeAnim = useRef(new Animated.Value(0)).current;
  const musicIconFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start background music during splash
    const initializeMusic = async () => {
      try {
        await BackgroundMusicService.startBackgroundMusic();
      } catch (error) {
        console.error('Failed to start background music on splash:', error);
      }
    };

    initializeMusic();

    // Create staggered animation sequence
    const animationSequence = Animated.sequence([
      // Logo fade in and scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      
      // Logo gentle rotation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      
      // Title fade in
      Animated.timing(titleFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      
      // Subtitle and music icon fade in
      Animated.parallel([
        Animated.timing(subtitleFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(musicIconFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      
      // Hold for a moment
      Animated.delay(1500),
      
      // Fade out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleFadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleFadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(musicIconFadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animationSequence.start(() => {
      onAnimationComplete();
    });

    // Cleanup function
    return () => {
      animationSequence.stop();
    };
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background gradient with Indian-inspired colors */}
      <LinearGradient 
        colors={theme.colors.gradients.sacred} 
        style={styles.gradient}
      >
        {/* Decorative pattern overlay */}
        <View style={styles.patternOverlay}>
          {/* Create mandala-like pattern */}
          {Array.from({ length: 8 }).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.patternCircle,
                {
                  transform: [
                    { rotate: `${index * 45}deg` },
                    { 
                      scale: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      })
                    }
                  ],
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.1],
                  }),
                }
              ]}
            />
          ))}
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Logo/Icon */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { rotate: rotate },
                ],
              },
            ]}
          >
            <View style={styles.logo}>
              <Ionicons name="flower" size={80} color={theme.colors.neutral.white} />
            </View>
          </Animated.View>

          {/* App Title in Sanskrit */}
          <Animated.View style={[styles.titleContainer, { opacity: titleFadeAnim }]}>
            <Text style={styles.titleSanskrit}>क्रान्ति</Text>
            <Text style={styles.titleEnglish}>KRANTI</Text>
          </Animated.View>

          {/* Subtitle */}
          <Animated.View style={[styles.subtitleContainer, { opacity: subtitleFadeAnim }]}>
            <Text style={styles.subtitle}>आत्मा की शान्ति</Text>
            <Text style={styles.subtitleEnglish}>Peace of the Soul</Text>
          </Animated.View>

          {/* Background music indicator */}
          <Animated.View style={[styles.musicIndicator, { opacity: musicIconFadeAnim }]}>
            <Ionicons name="musical-notes" size={24} color={theme.colors.neutral.white} />
            <Text style={styles.musicText}>Ambient Indian Classical</Text>
          </Animated.View>
        </View>

        {/* Bottom decoration */}
        <Animated.View style={[styles.bottomDecoration, { opacity: fadeAnim }]}>
          <Text style={styles.mantra}>ॐ शान्ति शान्ति शान्तिः</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternOverlay: {
    position: 'absolute',
    width: width * 2,
    height: height * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternCircle: {
    position: 'absolute',
    width: width * 1.5,
    height: 4,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: 2,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleSanskrit: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.neutral.white,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  titleEnglish: {
    fontSize: 28,
    fontWeight: '300',
    color: theme.colors.neutral.cream,
    textAlign: 'center',
    letterSpacing: 4,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 20,
    color: theme.colors.neutral.white,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitleEnglish: {
    fontSize: 16,
    color: theme.colors.neutral.cream,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  musicIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  musicText: {
    color: theme.colors.neutral.white,
    fontSize: 14,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  mantra: {
    fontSize: 18,
    color: theme.colors.neutral.white,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default SplashScreen;
