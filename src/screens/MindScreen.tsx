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
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps } from '../types';
import { mindHealingCategories, quickHealingSessions, healingMantras } from '../data/content';

const { width } = Dimensions.get('window');

const MindScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState('discover');

  // Main sections for mind healing
  const mainSections = [
    { id: 'discover', name: 'Discover', icon: 'compass-outline' },
    { id: 'tunings', name: 'Tunings', icon: 'radio-outline' },
    { id: 'mantras', name: 'Mantras', icon: 'musical-notes-outline' },
    { id: 'meditations', name: 'Meditations', icon: 'leaf-outline' },
    { id: 'breathwork', name: 'Breathwork', icon: 'respiratory-outline' },
    { id: 'wisdom', name: 'Wisdom', icon: 'library-outline' },
  ];

  // Healing Tunings - Frequency-based healing
  const healingTunings = [
    {
      id: 'solfeggio_528',
      name: '528Hz Love Frequency',
      description: 'DNA repair and heart chakra activation',
      duration: 900, // 15 minutes
      frequency: '528Hz',
      benefits: ['DNA healing', 'Heart opening', 'Love vibration'],
      color: ['#10B981', '#059669'],
      effect: 'Cellular regeneration'
    },
    {
      id: 'solfeggio_396',
      name: '396Hz Fear Release',
      description: 'Root chakra healing and trauma release',
      duration: 720, // 12 minutes
      frequency: '396Hz',
      benefits: ['Fear release', 'Grounding', 'Safety feeling'],
      color: ['#EF4444', '#DC2626'],
      effect: 'Instant fear relief'
    },
    {
      id: 'binaural_alpha',
      name: 'Alpha Brain Waves',
      description: 'Creative focus and relaxed awareness',
      duration: 1200, // 20 minutes
      frequency: '10Hz',
      benefits: ['Creative flow', 'Relaxed focus', 'Learning enhancement'],
      color: ['#8B5CF6', '#7C3AED'],
      effect: 'Enhanced creativity'
    },
    {
      id: 'tibetan_singing',
      name: 'Tibetan Bowl Harmony',
      description: 'Chakra alignment with sacred bowls',
      duration: 1800, // 30 minutes
      frequency: 'Multi-frequency',
      benefits: ['Chakra balance', 'Deep relaxation', 'Energy clearing'],
      color: ['#F59E0B', '#D97706'],
      effect: 'Complete energy reset'
    }
  ];

  // Sacred Mantras organized by purpose
  const mantraCategories = [
    {
      id: 'power_mantras',
      name: 'Power Mantras',
      description: 'Boost confidence and inner strength',
      mantras: [
        {
          id: 'hanuman_chalisa',
          name: 'Hanuman Chalisa',
          sanskrit: 'श्री हनुमान चालीसा',
          purpose: 'Courage and strength',
          duration: 2400, // 40 minutes
          benefits: ['Fearlessness', 'Physical strength', 'Obstacles removal']
        },
        {
          id: 'durga_mantra',
          name: 'Durga Maa Mantra',
          sanskrit: 'ॐ दुं दुर्गायै नमः',
          purpose: 'Divine protection',
          duration: 600, // 10 minutes
          benefits: ['Protection', 'Empowerment', 'Negativity removal']
        }
      ]
    },
    {
      id: 'peace_mantras',
      name: 'Peace Mantras',
      description: 'Cultivate inner tranquility',
      mantras: [
        {
          id: 'om_shanti',
          name: 'Om Shanti Mantra',
          sanskrit: 'ॐ शान्ति शान्ति शान्तिः',
          purpose: 'Universal peace',
          duration: 900, // 15 minutes
          benefits: ['Mental peace', 'Stress relief', 'Harmony']
        },
        {
          id: 'gayatri_mantra',
          name: 'Gayatri Mantra',
          sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं',
          purpose: 'Wisdom and illumination',
          duration: 1080, // 18 minutes
          benefits: ['Mental clarity', 'Spiritual growth', 'Divine wisdom']
        }
      ]
    }
  ];

  // Breathwork practices
  const breathworkPractices = [
    {
      id: 'pranayama_basic',
      name: 'Basic Pranayama',
      sanskrit: 'प्राणायाम',
      description: 'Foundation breathing for beginners',
      duration: 600, // 10 minutes
      technique: 'Anulom Vilom',
      benefits: ['Stress relief', 'Energy balance', 'Mental clarity'],
      difficulty: 'Beginner'
    },
    {
      id: 'bhastrika',
      name: 'Bhastrika Pranayama',
      sanskrit: 'भस्त्रिका प्राणायाम',
      description: 'Bellows breath for energy activation',
      duration: 900, // 15 minutes
      technique: 'Bellows breathing',
      benefits: ['Energy boost', 'Metabolism increase', 'Vitality'],
      difficulty: 'Intermediate'
    },
    {
      id: 'nadi_shodhana',
      name: 'Nadi Shodhana',
      sanskrit: 'नाडी शोधन',
      description: 'Channel purification breath',
      duration: 1200, // 20 minutes
      technique: 'Alternate nostril',
      benefits: ['Channel purification', 'Balance', 'Calm focus'],
      difficulty: 'Advanced'
    }
  ];

  // Meditation styles
  const meditationStyles = [
    {
      id: 'mindfulness_indian',
      name: 'Vipassana Meditation',
      style: 'Mindfulness',
      description: 'Ancient Indian insight meditation',
      duration: 1800, // 30 minutes
      benefits: ['Self-awareness', 'Emotional balance', 'Wisdom'],
      guidance: 'Guided'
    },
    {
      id: 'trataka',
      name: 'Trataka (Candle Gazing)',
      style: 'Concentration',
      description: 'Third eye activation meditation',
      duration: 1200, // 20 minutes
      benefits: ['Concentration', 'Intuition', 'Third eye opening'],
      guidance: 'Self-guided'
    },
    {
      id: 'walking_meditation',
      name: 'Walking Meditation',
      style: 'Movement',
      description: 'Mindful walking practice',
      duration: 900, // 15 minutes
      benefits: ['Mindful movement', 'Present moment', 'Integration'],
      guidance: 'Guided'
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'discover':
        return renderDiscoverSection();
      case 'tunings':
        return renderTuningsSection();
      case 'mantras':
        return renderMantrasSection();
      case 'meditations':
        return renderMeditationsSection();
      case 'breathwork':
        return renderBreathworkSection();
      case 'wisdom':
        return renderWisdomSection();
      default:
        return renderDiscoverSection();
    }
  };

  const renderDiscoverSection = () => {
    // Categories based on life situations (like Calm app)
    const categories = [
      { id: 'sleep', name: 'Sleep', icon: 'moon-outline', color: '#2D1B69' },
      { id: 'work', name: 'Focus', icon: 'business-outline', color: '#F59E0B' },
      { id: 'stress', name: 'Stress Relief', icon: 'leaf-outline', color: '#10B981' },
      { id: 'energy', name: 'Energy', icon: 'flash-outline', color: '#EF4444' },
      { id: 'healing', name: 'Healing', icon: 'heart-outline', color: '#8B5CF6' },
      { id: 'confidence', name: 'Confidence', icon: 'shield-outline', color: '#F97316' },
    ];

    return (
      <View>
        <Text style={styles.sectionTitle}>Discover Your Path</Text>
        <Text style={styles.sectionSubtitle}>Choose your healing journey</Text>
        
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { borderLeftColor: category.color }]}
              onPress={() => navigation.navigate('Session', {
                session: {
                  id: category.id,
                  name: category.name,
                  description: `Healing session for ${category.name.toLowerCase()}`,
                  duration: 900,
                  type: 'meditation',
                  tracks: [category.id],
                  difficulty: 'beginner',
                  benefits: ['Healing', 'Balance', 'Peace'],
                  imageUrl: '',
                  category: 'healing'
                }
              })}
            >
              <Ionicons name={category.icon as any} size={32} color={category.color} />
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>Heal through {category.name.toLowerCase()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderTuningsSection = () => {
    return (
      <View>
        <Text style={styles.sectionTitle}>Healing Frequencies</Text>
        <Text style={styles.sectionSubtitle}>Sacred sound vibrations for deep healing</Text>
        
        {healingTunings.map((tuning) => (
          <TouchableOpacity
            key={tuning.id}
            style={styles.tuningCard}
            onPress={() => navigation.navigate('Player', { track: tuning })}
          >
            <LinearGradient colors={tuning.color as any} style={styles.tuningGradient}>
              <View style={styles.tuningHeader}>
                <View style={styles.tuningInfo}>
                  <Text style={styles.tuningName}>{tuning.name}</Text>
                  <Text style={styles.tuningFrequency}>{tuning.frequency}</Text>
                  <Text style={styles.tuningDescription}>{tuning.description}</Text>
                </View>
                <View style={styles.tuningDuration}>
                  <Text style={styles.durationText}>{Math.floor(tuning.duration / 60)}m</Text>
                </View>
              </View>
              <Text style={styles.tuningEffect}>{tuning.effect}</Text>
              <View style={styles.benefitsContainer}>
                {tuning.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitTag}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderMantrasSection = () => {
    return (
      <View>
        <Text style={styles.sectionTitle}>Sacred Mantras</Text>
        <Text style={styles.sectionSubtitle}>Ancient sounds for transformation</Text>
        
        {mantraCategories.map((category) => (
          <View key={category.id} style={styles.mantraCategoryContainer}>
            <Text style={styles.mantraCategoryTitle}>{category.name}</Text>
            <Text style={styles.mantraCategoryDescription}>{category.description}</Text>
            
            {category.mantras.map((mantra) => (
              <TouchableOpacity
                key={mantra.id}
                style={styles.mantraCard}
                onPress={() => navigation.navigate('Player', { track: mantra })}
              >
                <View style={styles.mantraHeader}>
                  <Text style={styles.mantraName}>{mantra.name}</Text>
                  <Text style={styles.mantraSanskrit}>{mantra.sanskrit}</Text>
                </View>
                <Text style={styles.mantraPurpose}>{mantra.purpose}</Text>
                <View style={styles.mantraFooter}>
                  <Text style={styles.mantraDuration}>{Math.floor(mantra.duration / 60)} min</Text>
                  <View style={styles.mantraBenefits}>
                    {mantra.benefits.slice(0, 2).map((benefit, index) => (
                      <Text key={index} style={styles.benefitText}>• {benefit}</Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderMeditationsSection = () => {
    return (
      <View>
        <Text style={styles.sectionTitle}>Meditation Practices</Text>
        <Text style={styles.sectionSubtitle}>Ancient techniques for modern life</Text>
        
        {meditationStyles.map((meditation) => (
          <TouchableOpacity
            key={meditation.id}
            style={styles.meditationCard}
            onPress={() => navigation.navigate('Session', {
              session: {
                id: meditation.id,
                name: meditation.name,
                description: meditation.description,
                duration: meditation.duration,
                type: 'meditation',
                tracks: [meditation.id],
                difficulty: 'beginner',
                benefits: meditation.benefits,
                imageUrl: '',
                category: 'healing'
              }
            })}
          >
            <View style={styles.meditationHeader}>
              <Text style={styles.meditationName}>{meditation.name}</Text>
              <Text style={styles.meditationStyle}>{meditation.style}</Text>
            </View>
            <Text style={styles.meditationDescription}>{meditation.description}</Text>
            <View style={styles.meditationFooter}>
              <Text style={styles.meditationDuration}>{Math.floor(meditation.duration / 60)} min</Text>
              <Text style={styles.meditationGuidance}>{meditation.guidance}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderBreathworkSection = () => {
    return (
      <View>
        <Text style={styles.sectionTitle}>Pranayama Practices</Text>
        <Text style={styles.sectionSubtitle}>Master your life force through breath</Text>
        
        {breathworkPractices.map((practice) => (
          <TouchableOpacity
            key={practice.id}
            style={styles.breathworkCard}
            onPress={() => navigation.navigate('Session', {
              session: {
                id: practice.id,
                name: practice.name,
                description: practice.description,
                duration: practice.duration,
                type: 'breathing',
                tracks: [practice.id],
                difficulty: practice.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
                benefits: practice.benefits,
                imageUrl: '',
                category: 'healing'
              }
            })}
          >
            <View style={styles.breathworkHeader}>
              <Text style={styles.breathworkName}>{practice.name}</Text>
              <Text style={styles.breathworkSanskrit}>{practice.sanskrit}</Text>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{practice.difficulty}</Text>
              </View>
            </View>
            <Text style={styles.breathworkDescription}>{practice.description}</Text>
            <Text style={styles.breathworkTechnique}>Technique: {practice.technique}</Text>
            <View style={styles.breathworkFooter}>
              <Text style={styles.breathworkDuration}>{Math.floor(practice.duration / 60)} min</Text>
              <View style={styles.breathworkBenefits}>
                {practice.benefits.slice(0, 3).map((benefit, index) => (
                  <Text key={index} style={styles.benefitText}>• {benefit}</Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderWisdomSection = () => {
    const wisdomContent = [
      {
        id: 'vedic_wisdom',
        title: 'Vedic Wisdom',
        content: 'Ancient teachings for modern challenges',
        quotes: [
          'You are what your deep, driving desire is. As your desire is, so is your will.',
          'The mind is everything. What you think you become.',
          'When the mind is peaceful, the body follows.'
        ]
      },
      {
        id: 'yoga_philosophy',
        title: 'Yoga Philosophy',
        content: 'Timeless principles of living',
        quotes: [
          'Yoga is the journey of the self, through the self, to the self.',
          'The practice of yoga brings us face to face with the extraordinary complexity of our own being.',
          'Yoga is not about touching your toes. It is about what you learn on the way down.'
        ]
      }
    ];

    return (
      <View>
        <Text style={styles.sectionTitle}>Ancient Wisdom</Text>
        <Text style={styles.sectionSubtitle}>Timeless teachings for the modern soul</Text>
        
        {wisdomContent.map((wisdom) => (
          <View key={wisdom.id} style={styles.wisdomCard}>
            <Text style={styles.wisdomTitle}>{wisdom.title}</Text>
            <Text style={styles.wisdomContent}>{wisdom.content}</Text>
            {wisdom.quotes.map((quote, index) => (
              <View key={index} style={styles.quoteContainer}>
                <Text style={styles.quoteText}>"{quote}"</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Text style={styles.headerTitle}>Mind & Spirit</Text>
        <Text style={styles.headerSubtitle}>Transform your consciousness with ancient wisdom</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Navigation */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.sectionTabs}
        >
          {mainSections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionTab,
                activeSection === section.id && styles.activeSectionTab,
              ]}
              onPress={() => setActiveSection(section.id)}
            >
              <Ionicons
                name={section.icon as any}
                size={20}
                color={activeSection === section.id ? '#FFFFFF' : '#667eea'}
              />
              <Text
                style={[
                  styles.sectionTabText,
                  activeSection === section.id && styles.activeSectionTabText,
                ]}
              >
                {section.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {renderSection()}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeCategoryTab: {
    backgroundColor: '#667eea',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  categorySection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  sessionsContainer: {
    marginBottom: 30,
  },
  sessionCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  sessionGradient: {
    padding: 20,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  sessionInfo: {
    flex: 1,
    marginRight: 15,
  },
  sessionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  sessionEffect: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  sessionDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  sessionDuration: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sessionFooter: {
    marginTop: 10,
  },
  mantraText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  benefitTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  quickSection: {
    paddingLeft: 20,
    marginBottom: 30,
  },
  quickTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 15,
  },
  quickSessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginRight: 15,
    borderRadius: 15,
    width: width * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickSessionContent: {
    flex: 1,
    marginRight: 10,
  },
  quickSessionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  quickSessionEffect: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  quickSessionDuration: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  mantrasSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  mantrasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 15,
  },
  mantraCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mantraHeader: {
    marginBottom: 10,
  },
  mantraName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 5,
  },
  mantraSanskrit: {
    fontSize: 16,
    color: '#667eea',
    fontStyle: 'italic',
  },
  mantraMeaning: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 15,
    lineHeight: 20,
  },
  mantraFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mantraDuration: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  mantraBenefits: {
    flex: 1,
    marginLeft: 15,
  },
  
  // New Section Styles
  sectionTabs: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeSectionTab: {
    backgroundColor: '#667eea',
  },
  sectionTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 8,
  },
  activeSectionTabText: {
    color: 'white',
  },
  contentArea: {
    paddingHorizontal: 20,
  },
  
  // Discover Section
  categoriesGrid: {
    marginTop: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryInfo: {
    marginLeft: 15,
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  
  // Tunings Section
  tuningCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  tuningGradient: {
    padding: 20,
  },
  tuningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  tuningInfo: {
    flex: 1,
  },
  tuningName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  tuningFrequency: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 8,
  },
  tuningDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  tuningDuration: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tuningEffect: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 15,
  },
  
  // Mantras Section
  mantraCategoryContainer: {
    marginBottom: 30,
  },
  mantraCategoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  mantraCategoryDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  mantraPurpose: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  
  // Meditations Section
  meditationCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  meditationHeader: {
    marginBottom: 12,
  },
  meditationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  meditationStyle: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  meditationDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  meditationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meditationDuration: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  meditationGuidance: {
    fontSize: 12,
    color: '#95a5a6',
  },
  
  // Breathwork Section
  breathworkCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  breathworkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  breathworkName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  breathworkSanskrit: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  difficultyBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  breathworkDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  breathworkTechnique: {
    fontSize: 13,
    color: '#95a5a6',
    marginBottom: 12,
  },
  breathworkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breathworkDuration: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  breathworkBenefits: {
    flex: 1,
    marginLeft: 15,
  },
  
  // Wisdom Section
  wisdomCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wisdomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  wisdomContent: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  quoteContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 14,
    color: '#2c3e50',
    fontStyle: 'italic',
  },
});

export default MindScreen;
