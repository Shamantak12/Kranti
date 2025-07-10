import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps, OnboardingSlide } from '../types';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onboardingSlides: OnboardingSlide[] = [
    {
      id: '1',
      sanskritText: 'शान्ति शान्ति शान्तिः',
      englishTranslation: '',
      instruction: '',
      backgroundGradient: ['#667eea', '#764ba2'] as const,
      icon: 'leaf-outline',
    },
    {
      id: '2',
      sanskritText: 'सर्वे भवन्तु सुखिनः',
      englishTranslation: '',
      instruction: '',
      backgroundGradient: ['#f093fb', '#f5576c'] as const,
      icon: 'heart-outline',
    },
    {
      id: '3',
      sanskritText: 'तत् त्वम् असि',
      englishTranslation: '',
      instruction: '',
      backgroundGradient: ['#4facfe', '#00f2fe'] as const,
      icon: 'infinite-outline',
    },
    {
      id: '4',
      sanskritText: 'अहं ब्रह्मास्मि',
      englishTranslation: '',
      instruction: '',
      backgroundGradient: ['#43e97b', '#38f9d7'] as const,
      icon: 'globe-outline',
    },
    {
      id: '5',
      sanskritText: 'ॐ गं गणपतये नमः',
      englishTranslation: '',
      instruction: '',
      backgroundGradient: ['#fa709a', '#fee140'] as const,
      icon: 'remove-circle-outline',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide < onboardingSlides.length - 1) {
        // Fade out current slide
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentSlide(currentSlide + 1);
          // Fade in next slide
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
        });
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentSlide, fadeAnim, scaleAnim]);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentSlide(currentSlide + 1);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      navigation.navigate('SignUp');
    }
  };

  const handleSkip = () => {
    navigation.navigate('SignUp');
  };

  const currentSlideData = onboardingSlides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={currentSlideData.backgroundGradient}
        style={styles.gradient}
      >
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Main Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons
              name={currentSlideData.icon as any}
              size={80}
              color="rgba(255,255,255,0.9)"
            />
          </View>

          {/* Sanskrit Text */}
          <Text style={styles.sanskritText}>
            {currentSlideData.sanskritText}
          </Text>

          {/* Progress Dots */}
          <View style={styles.progressContainer}>
            {onboardingSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  {
                    backgroundColor:
                      index === currentSlide
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(255,255,255,0.3)',
                    width: index === currentSlide ? 30 : 8,
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <View style={styles.nextButtonInner}>
            {currentSlide === onboardingSlides.length - 1 ? (
              <Text style={styles.nextButtonText}>Begin Journey</Text>
            ) : (
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
            )}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
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
    padding: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 60,
    padding: 20,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sanskritText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 80,
    fontFamily: 'System',
    lineHeight: 55,
  },
  translationText: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  instructionText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 60,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
  nextButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OnboardingScreen;
