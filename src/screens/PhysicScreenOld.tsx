import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps, YogaExercise } from '../types';

const { width } = Dimensions.get('window');

const PhysicScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: 'fitness-outline', color: '#43e97b' },
    { id: 'asana', name: 'Asanas', icon: 'body-outline', color: '#667eea' },
    { id: 'pranayama', name: 'Pranayama', icon: 'leaf-outline', color: '#f093fb' },
    { id: 'meditation', name: 'Meditation', icon: 'flower-outline', color: '#fa709a' },
    { id: 'mudra', name: 'Mudras', icon: 'hand-left-outline', color: '#4facfe' },
  ];

  const yogaExercises: YogaExercise[] = [
    {
      id: '1',
      name: 'Mountain Pose',
      sanskritName: 'ताड़ासन (Tadasana)',
      description: 'Foundation pose for all standing postures, improves posture and grounding',
      difficulty: 'beginner',
      duration: 60,
      instructions: [
        'Stand with feet hip-width apart',
        'Ground through all four corners of feet',
        'Engage leg muscles and lift kneecaps',
        'Lengthen spine and crown of head toward ceiling',
        'Relax shoulders away from ears',
        'Breathe deeply for 5-10 breaths',
      ],
      benefits: [
        'Improves posture',
        'Strengthens legs',
        'Increases body awareness',
        'Calms the mind',
      ],
      imageUrl: 'https://placeholder.com/300x200',
      category: 'asana',
      requiresSubscription: 'free',
    },
    {
      id: '2',
      name: 'Alternate Nostril Breathing',
      sanskritName: 'अनुलोम विलोम (Anulom Vilom)',
      description: 'Balancing pranayama technique that harmonizes left and right brain hemispheres',
      difficulty: 'beginner',
      duration: 300,
      instructions: [
        'Sit comfortably with spine erect',
        'Use right thumb to close right nostril',
        'Inhale through left nostril for 4 counts',
        'Close left nostril with ring finger',
        'Release thumb and exhale through right nostril for 4 counts',
        'Inhale through right nostril',
        'Close right nostril and exhale through left',
        'Repeat for 5-10 cycles',
      ],
      benefits: [
        'Balances nervous system',
        'Reduces stress and anxiety',
        'Improves concentration',
        'Harmonizes brain hemispheres',
      ],
      imageUrl: 'https://placeholder.com/300x200',
      category: 'pranayama',
      requiresSubscription: 'free',
    },
    {
      id: '3',
      name: 'Sun Salutation',
      sanskritName: 'सूर्य नमस्कार (Surya Namaskara)',
      description: 'Complete sequence that energizes the body and honors the sun',
      difficulty: 'intermediate',
      duration: 600,
      instructions: [
        'Start in Mountain Pose',
        'Inhale, sweep arms up (Urdhva Hastasana)',
        'Exhale, fold forward (Uttanasana)',
        'Inhale, half lift (Ardha Uttanasana)',
        'Exhale, step back to plank',
        'Lower to low push-up (Chaturanga)',
        'Inhale, upward dog (Urdhva Mukha Svanasana)',
        'Exhale, downward dog (Adho Mukha Svanasana)',
        'Hold for 5 breaths',
        'Step forward and reverse the sequence',
      ],
      benefits: [
        'Full body workout',
        'Improves flexibility',
        'Builds strength',
        'Energizes the body',
        'Improves circulation',
      ],
      imageUrl: 'https://placeholder.com/300x200',
      category: 'asana',
      requiresSubscription: 'plus',
    },
    {
      id: '4',
      name: 'Wisdom Mudra',
      sanskritName: 'ज्ञान मुद्रा (Gyan Mudra)',
      description: 'Hand gesture that enhances concentration and wisdom',
      difficulty: 'beginner',
      duration: 180,
      instructions: [
        'Sit comfortably in meditation pose',
        'Rest hands on knees or thighs',
        'Touch tip of thumb to tip of index finger',
        'Keep other three fingers straight but relaxed',
        'Close eyes and focus on breath',
        'Hold for 3-5 minutes',
      ],
      benefits: [
        'Improves concentration',
        'Enhances memory',
        'Calms the mind',
        'Increases wisdom',
      ],
      imageUrl: 'https://placeholder.com/300x200',
      category: 'mudra',
      requiresSubscription: 'free',
    },
    {
      id: '5',
      name: 'Warrior II',
      sanskritName: 'वीरभद्रासन II (Virabhadrasana II)',
      description: 'Strong standing pose that builds stamina and opens hips',
      difficulty: 'intermediate',
      duration: 120,
      instructions: [
        'Stand with feet 3.5-4 feet apart',
        'Turn right foot out 90 degrees',
        'Turn left foot in 15 degrees',
        'Bend right knee directly over ankle',
        'Extend arms parallel to floor',
        'Gaze over right fingertips',
        'Hold for 30 seconds, repeat on other side',
      ],
      benefits: [
        'Strengthens legs and core',
        'Opens hips and chest',
        'Improves stamina',
        'Builds focus and determination',
      ],
      imageUrl: 'https://placeholder.com/300x200',
      category: 'asana',
      requiresSubscription: 'plus',
    },
    {
      id: '6',
      name: 'Ocean Breath',
      sanskritName: 'उज्जायी प्राणायाम (Ujjayi Pranayama)',
      description: 'Calming breath technique that sounds like ocean waves',
      difficulty: 'intermediate',
      duration: 420,
      instructions: [
        'Sit comfortably with spine straight',
        'Breathe through nose only',
        'Slightly constrict throat on inhale and exhale',
        'Create soft "ocean" sound',
        'Inhale for 4-6 counts',
        'Exhale for 4-6 counts',
        'Continue for 5-7 minutes',
      ],
      benefits: [
        'Calms nervous system',
        'Improves concentration',
        'Generates internal heat',
        'Reduces stress',
      ],
      imageUrl: 'https://placeholder.com/300x200',
      category: 'pranayama',
      requiresSubscription: 'pro',
    },
  ];

  const filteredExercises = activeCategory === 'all' 
    ? yogaExercises 
    : yogaExercises.filter(exercise => exercise.category === activeCategory);

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: '#10B981',
      intermediate: '#F59E0B',
      advanced: '#EF4444',
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  const getSubscriptionBadge = (requirement: string) => {
    const badges = {
      free: { text: 'FREE', color: '#10B981' },
      plus: { text: 'PLUS', color: '#f093fb' },
      pro: { text: 'PRO', color: '#fa709a' },
    };
    return badges[requirement as keyof typeof badges] || badges.free;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return minutes > 0 ? `${minutes} min` : `${seconds}s`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.header}>
        <Text style={styles.headerTitle}>Body & Movement</Text>
        <Text style={styles.headerSubtitle}>शरीर और गति</Text>
        <Text style={styles.headerDescription}>
          Ancient Indian practices for physical and spiritual wellness
        </Text>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: activeCategory === category.id ? category.color : '#F3F4F6',
                },
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Ionicons
                name={category.icon as any}
                size={20}
                color={activeCategory === category.id ? '#FFFFFF' : category.color}
              />
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: activeCategory === category.id ? '#FFFFFF' : '#374151',
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercises List */}
      <ScrollView style={styles.exercisesList} showsVerticalScrollIndicator={false}>
        {filteredExercises.map((exercise) => {
          const badge = getSubscriptionBadge(exercise.requiresSubscription);
          
          return (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => {
                // Navigate to exercise details or video
              }}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.cardGradient}
              >
                {/* Exercise Image Placeholder */}
                <View style={styles.exerciseImageContainer}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.exerciseImagePlaceholder}
                  >
                    <Ionicons
                      name={
                        exercise.category === 'asana' ? 'body-outline' :
                        exercise.category === 'pranayama' ? 'leaf-outline' :
                        exercise.category === 'meditation' ? 'flower-outline' :
                        'hand-left-outline'
                      }
                      size={40}
                      color="#FFFFFF"
                    />
                  </LinearGradient>
                  <View style={[styles.subscriptionBadge, { backgroundColor: badge.color }]}>
                    <Text style={styles.badgeText}>{badge.text}</Text>
                  </View>
                </View>

                <View style={styles.exerciseContent}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(exercise.difficulty) },
                      ]}
                    >
                      <Text style={styles.difficultyText}>
                        {exercise.difficulty.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.sanskritName}>{exercise.sanskritName}</Text>
                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>

                  <View style={styles.exerciseFooter}>
                    <View style={styles.durationContainer}>
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text style={styles.durationText}>{formatDuration(exercise.duration)}</Text>
                    </View>

                    <View style={styles.benefitsPreview}>
                      <Ionicons name="heart-outline" size={16} color="#F59E0B" />
                      <Text style={styles.benefitsText}>
                        {exercise.benefits.length} benefits
                      </Text>
                    </View>
                  </View>

                  {/* Benefits Preview */}
                  <View style={styles.benefitsContainer}>
                    {exercise.benefits.slice(0, 2).map((benefit, index) => (
                      <View key={index} style={styles.benefitTag}>
                        <Text style={styles.benefitText}>{benefit}</Text>
                      </View>
                    ))}
                    {exercise.benefits.length > 2 && (
                      <View style={styles.moreBenefits}>
                        <Text style={styles.moreBenefitsText}>
                          +{exercise.benefits.length - 2} more
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        {/* Practice Program Suggestion */}
        <View style={styles.programSuggestion}>
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.programGradient}>
            <Ionicons name="calendar-outline" size={32} color="#FFFFFF" />
            <Text style={styles.programTitle}>21-Day Yoga Challenge</Text>
            <Text style={styles.programDescription}>
              Structured daily practice combining asanas, pranayama, and meditation
            </Text>
            <TouchableOpacity style={styles.programButton}>
              <Text style={styles.programButtonText}>Start Challenge</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
  },
  categoriesContainer: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  exercisesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseCard: {
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  exerciseImageContainer: {
    position: 'relative',
  },
  exerciseImagePlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  exerciseContent: {
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
    marginRight: 10,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sanskritName: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  benefitsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  benefitTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  moreBenefits: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  moreBenefitsText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  programSuggestion: {
    marginVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  programGradient: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  programTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 10,
  },
  programDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  programButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  programButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default PhysicScreen;
