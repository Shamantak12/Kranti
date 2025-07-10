import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AIRequest, AIRecommendation, NavigationProps } from '../types';

const { width, height } = Dimensions.get('window');

const KrantiAIScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [situation, setSituation] = useState('');
  const [mood, setMood] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  const moodOptions = [
    { label: 'Anxious', value: 'anxious', icon: '😰', color: '#FF6B6B' },
    { label: 'Stressed', value: 'stressed', icon: '😣', color: '#FF8E53' },
    { label: 'Tired', value: 'tired', icon: '😴', color: '#4ECDC4' },
    { label: 'Overwhelmed', value: 'overwhelmed', icon: '🤯', color: '#45B7D1' },
    { label: 'Angry', value: 'angry', icon: '😡', color: '#FF6B6B' },
    { label: 'Sad', value: 'sad', icon: '😢', color: '#6C5CE7' },
    { label: 'Restless', value: 'restless', icon: '😤', color: '#FD79A8' },
    { label: 'Peaceful', value: 'peaceful', icon: '😌', color: '#00B894' },
  ];

  const situationOptions = [
    'Work pressure',
    'Family issues',
    'Financial stress',
    'Health concerns',
    'Relationship problems',
    'Academic pressure',
    'Social anxiety',
    'Sleep issues',
    'Life transitions',
    'General overwhelm',
  ];

  const handleAIRecommendation = async () => {
    if (!situation.trim() || !mood) {
      Alert.alert('Missing Information', 'Please describe your situation and select your mood.');
      return;
    }

    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockRecommendation: AIRecommendation = {
        id: Date.now().toString(),
        situation,
        mood,
        stressLevel,
        recommendedTracks: [],
        recommendedMantras: [],
        recommendedSessions: [],
        reasoning: `Based on your ${mood} mood and stress level of ${stressLevel}/10, I recommend starting with calming mantras and gentle meditation tracks.`,
        timestamp: new Date(),
      };
      setRecommendation(mockRecommendation);
      setIsLoading(false);
    }, 2000);
  };

  const StressLevelSelector = () => (
    <View style={styles.stressLevelContainer}>
      <Text style={styles.sectionTitle}>Stress Level (1-10)</Text>
      <View style={styles.stressLevelRow}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.stressLevelButton,
              stressLevel === level && styles.stressLevelButtonActive,
              { backgroundColor: stressLevel === level ? '#FF6B6B' : '#F8F9FA' }
            ]}
            onPress={() => setStressLevel(level)}
          >
            <Text style={[
              styles.stressLevelText,
              stressLevel === level && styles.stressLevelTextActive
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.gradient}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.aiIconContainer}>
              <LinearGradient
                colors={['#FF6B6B', '#4ECDC4']}
                style={styles.aiIcon}
              >
                <Ionicons name="bulb" size={32} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Kranti AI</Text>
            <Text style={styles.subtitle}>
              Tell me what's stressing you, and I'll recommend the perfect remedy
            </Text>
          </View>

          {/* Situation Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's causing you stress?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Describe your situation... (e.g., work deadlines, family issues)"
              placeholderTextColor="#9CA3AF"
              value={situation}
              onChangeText={setSituation}
              multiline
              numberOfLines={4}
            />
            
            {/* Quick situation options */}
            <View style={styles.quickOptions}>
              {situationOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickOptionButton}
                  onPress={() => setSituation(option)}
                >
                  <Text style={styles.quickOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Mood Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How are you feeling?</Text>
            <View style={styles.moodGrid}>
              {moodOptions.map((moodOption) => (
                <TouchableOpacity
                  key={moodOption.value}
                  style={[
                    styles.moodButton,
                    mood === moodOption.value && { borderColor: moodOption.color, borderWidth: 3 }
                  ]}
                  onPress={() => setMood(moodOption.value)}
                >
                  <Text style={styles.moodEmoji}>{moodOption.icon}</Text>
                  <Text style={styles.moodLabel}>{moodOption.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Stress Level */}
          <StressLevelSelector />

          {/* Get Recommendation Button */}
          <TouchableOpacity
            style={[styles.recommendButton, isLoading && styles.recommendButtonDisabled]}
            onPress={handleAIRecommendation}
            disabled={isLoading}
          >
            <LinearGradient
              colors={isLoading ? ['#9CA3AF', '#6B7280'] : ['#FF6B6B', '#4ECDC4']}
              style={styles.recommendButtonGradient}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="hourglass" size={24} color="#FFFFFF" />
                  <Text style={styles.recommendButtonText}>AI is thinking...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Ionicons name="sparkles" size={24} color="#FFFFFF" />
                  <Text style={styles.recommendButtonText}>Get AI Recommendation</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Recommendation Result */}
          {recommendation && (
            <View style={styles.recommendationContainer}>
              <Text style={styles.recommendationTitle}>AI Recommendation</Text>
              <Text style={styles.recommendationText}>{recommendation.reasoning}</Text>
              
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Meditate')}
              >
                <Text style={styles.exploreButtonText}>Explore Recommendations</Text>
                <Ionicons name="arrow-forward" size={20} color="#667eea" />
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  aiIconContainer: {
    marginBottom: 15,
  },
  aiIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#374151',
    minHeight: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  quickOptionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
  },
  quickOptionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: (width - 60) / 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  stressLevelContainer: {
    marginBottom: 25,
  },
  stressLevelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  stressLevelButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  stressLevelButtonActive: {
    transform: [{ scale: 1.2 }],
  },
  stressLevelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  stressLevelTextActive: {
    color: '#FFFFFF',
  },
  recommendButton: {
    marginVertical: 20,
  },
  recommendButtonDisabled: {
    opacity: 0.7,
  },
  recommendButtonGradient: {
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  recommendationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  exploreButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default KrantiAIScreen;
