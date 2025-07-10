import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps, QuickBoostSession, WellnessPackage } from '../types';
import { wellnessPackages } from '../data/wellnessPackages';
import theme, { getTimeBasedGradient, getMoodGradient } from '../theme';
import BackgroundMusicService from '../services/BackgroundMusicService';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Enhanced package gradients using theme colors
  const getPackageGradient = (category: string): readonly [string, string] => {
    switch (category) {
      case 'mental_health':
        return [theme.colors.primary.lotus, theme.colors.primary.indigo];
      case 'spiritual_growth':
        return [theme.colors.primary.saffron, theme.colors.primary.gold];
      case 'physical_healing':
        return [theme.colors.primary.emerald, theme.colors.secondary.ganges];
      case 'stress_relief':
        return [theme.colors.secondary.sunrise, theme.colors.secondary.sunset];
      default:
        return [theme.colors.primary.lotus, theme.colors.primary.indigo];
    }
  };

  // Toggle background music
  const toggleBackgroundMusic = async () => {
    try {
      if (backgroundMusicEnabled) {
        await BackgroundMusicService.pauseBackgroundMusic();
      } else {
        await BackgroundMusicService.resumeBackgroundMusic();
      }
      setBackgroundMusicEnabled(!backgroundMusicEnabled);
    } catch (error) {
      console.error('Failed to toggle background music:', error);
    }
  };

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting('Good Morning');
      } else if (hour < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateGreeting();
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: theme.animations.duration.slow,
      useNativeDriver: true,
    }).start();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const quickBoostSessions: QuickBoostSession[] = [
    {
      id: '1',
      name: 'Instant Calm',
      description: 'Om chanting for immediate peace',
      duration: 3,
      effect: 'Immediate stress relief',
      tracks: ['om_3min'],
      color: '#4ECDC4',
      icon: 'leaf',
    },
    {
      id: '2',
      name: 'Energy Surge',
      description: 'Surya mantras for vitality',
      duration: 5,
      effect: '4 hours sustained energy',
      tracks: ['surya_5min'],
      color: '#FF6B6B',
      icon: 'flash',
    },
    {
      id: '3',
      name: 'Focus Power',
      description: 'Trataka meditation for concentration',
      duration: 7,
      effect: 'Laser-sharp focus',
      tracks: ['trataka_7min'],
      color: '#667eea',
      icon: 'eye',
    },
    {
      id: '4',
      name: 'Confidence Boost',
      description: 'Hanuman mantras for courage',
      duration: 8,
      effect: 'Unshakeable confidence',
      tracks: ['hanuman_8min'],
      color: '#F97316',
      icon: 'shield',
    },
  ];

  const exploreCategories = [
    {
      id: 'mind',
      title: 'Mind Healing',
      subtitle: 'Meditation • Mantras • Mindfulness',
      description: 'Transform your mental state with ancient wisdom',
      color: ['#667eea', '#764ba2'] as const,
      icon: 'infinite',
      screen: 'Mind',
      userHook: 'Feeling stressed? Find instant calm in 3 minutes',
      stats: '10M+ users found peace',
    },
    {
      id: 'physic',
      title: 'Physical Healing',
      subtitle: 'Yoga • Pranayama • Mudras',
      description: 'Heal your body with sacred practices',
      color: ['#f093fb', '#f5576c'] as const,
      icon: 'body',
      screen: 'Physic',
      userHook: 'Ready to feel energized? Start with 7-minute breath power',
      stats: '5M+ transformations',
    },
    {
      id: 'quick',
      title: 'Quick Sessions',
      subtitle: 'Instant Results • Proven Methods',
      description: 'Immediate relief when you need it most',
      color: ['#4facfe', '#00f2fe'] as const,
      icon: 'flash',
      screen: 'Session',
      userHook: 'Need instant calm? Try our 3-minute miracle',
      stats: '95% feel better immediately',
    },
    {
      id: 'yogi',
      title: 'Kranti Yogi',
      subtitle: 'AI Guide • Personalized • 24/7 Support',
      description: 'Your personal spiritual guide',
      color: ['#a8edea', '#fed6e3'] as const,
      icon: 'chatbubble-ellipses',
      screen: 'KrantiYogi',
      userHook: 'Confused? Ask your AI spiritual guide anything',
      stats: '1M+ conversations',
    },
  ];

  const todaysSpecial = {
    title: 'Today\'s Special Practice',
    subtitle: 'Curated for your wellness journey',
    practice: 'Sunrise Meditation with Gayatri Mantra',
    duration: '15 minutes',
    benefit: 'Start your day with divine energy',
    mantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि',
    color: ['#FF8A80', '#FFD54F'] as const,
  };

  const userStats = {
    streak: 7,
    totalSessions: 45,
    minutesMeditated: 380,
    favoriteCategory: 'Mind Healing',
  };

  const dailyQuote = {
    sanskrit: 'योगः कर्मसु कौशलम्',
    english: 'Yoga is skill in action',
    meaning: 'Performing actions with awareness and balance brings perfection',
    source: 'Bhagavad Gita',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.neutral.cream }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Enhanced Hero Section with time-based gradient */}
          <LinearGradient colors={getTimeBasedGradient()} style={styles.heroSection}>
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={[styles.greeting, theme.componentStyles.text.heading2, { color: theme.colors.neutral.white }]}>
                  {greeting} 🙏
                </Text>
                <Text style={[styles.username, { color: theme.colors.neutral.cream }]}>
                  Welcome to Kranti
                </Text>
                <Text style={[styles.subtitle, { color: theme.colors.neutral.cream }]}>
                  Your spiritual transformation awaits
                </Text>
                
                {/* Enhanced User Stats */}
                <View style={[styles.statsContainer, theme.componentStyles.card.base, { backgroundColor: theme.colors.overlay.light }]}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.primary.saffron }]}>{userStats.streak}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.neutral.darkGray }]}>Day Streak</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.primary.emerald }]}>{userStats.totalSessions}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.neutral.darkGray }]}>Sessions</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.primary.indigo }]}>{userStats.minutesMeditated}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.neutral.darkGray }]}>Minutes</Text>
                  </View>
                </View>
              </View>
              
              {/* Background Music Control */}
              <View style={styles.headerActions}>
                <TouchableOpacity 
                  style={[styles.musicButton, { backgroundColor: theme.colors.overlay.light }]} 
                  onPress={toggleBackgroundMusic}
                >
                  <Ionicons 
                    name={backgroundMusicEnabled ? "musical-notes" : "musical-notes-outline"} 
                    size={20} 
                    color={backgroundMusicEnabled ? theme.colors.primary.saffron : theme.colors.neutral.gray} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.notificationButton, { backgroundColor: theme.colors.overlay.light }]}>
                  <Ionicons name="notifications-outline" size={20} color={theme.colors.neutral.darkGray} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Enhanced Daily Quote */}
            <View style={[styles.quoteContainer, theme.componentStyles.card.sacred]}>
              <Text style={[styles.quoteTextSanskrit, theme.componentStyles.text.sanskrit]}>
                {dailyQuote.sanskrit}
              </Text>
              <Text style={[styles.quoteTextEnglish, { color: theme.colors.neutral.charcoal, fontSize: theme.typography.sizes.lg }]}>
                "{dailyQuote.english}"
              </Text>
              <Text style={[styles.quoteMeaning, { color: theme.colors.neutral.darkGray, fontSize: theme.typography.sizes.sm }]}>
                {dailyQuote.meaning}
              </Text>
              <Text style={[styles.quoteAuthor, { color: theme.colors.primary.saffron, fontSize: theme.typography.sizes.xs }]}>
                - {dailyQuote.source}
              </Text>
            </View>
          </LinearGradient>

        {/* Today's Special Practice */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.specialPracticeCard}
            onPress={() => navigation.navigate('Session', { 
              session: {
                id: 'todays_special',
                name: todaysSpecial.practice,
                description: todaysSpecial.benefit,
                duration: parseInt(todaysSpecial.duration.replace(' minutes', '')) * 60,
                type: 'meditation',
                tracks: ['gayatri_mantra'],
                difficulty: 'beginner',
                benefits: ['Divine energy', 'Mental clarity', 'Spiritual awakening'],
                imageUrl: '',
                category: 'energy_boost'
              }
            })}
          >
            <LinearGradient colors={todaysSpecial.color} style={styles.specialPracticeGradient}>
              <View style={styles.specialPracticeContent}>
                <View style={styles.specialPracticeHeader}>
                  <Text style={styles.specialPracticeTitle}>{todaysSpecial.title}</Text>
                  <Text style={styles.specialPracticeSubtitle}>{todaysSpecial.subtitle}</Text>
                </View>
                <Text style={styles.specialPracticeName}>{todaysSpecial.practice}</Text>
                <Text style={styles.specialPracticeMantra}>{todaysSpecial.mantra}</Text>
                <View style={styles.specialPracticeFooter}>
                  <Text style={styles.specialPracticeDuration}>{todaysSpecial.duration}</Text>
                  <Text style={styles.specialPracticeBenefit}>{todaysSpecial.benefit}</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Boost Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Healing Sessions</Text>
          <Text style={styles.sectionSubtitle}>Instant relief when you need it most</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {quickBoostSessions.map((session) => (
              <TouchableOpacity
                key={session.id}
                style={[styles.quickBoostCard, { backgroundColor: session.color }]}
                onPress={() => navigation.navigate('Session', { 
                  session: {
                    id: session.id,
                    name: session.name,
                    description: session.description,
                    duration: session.duration * 60, // Convert minutes to seconds
                    type: 'meditation',
                    tracks: session.tracks,
                    difficulty: 'beginner',
                    benefits: [session.effect],
                    imageUrl: '',
                    category: 'stress_relief'
                  }
                })}
              >
                <View style={styles.cardHeader}>
                  <Ionicons name={session.icon as any} size={32} color="#FFFFFF" />
                  <Text style={styles.cardDuration}>{session.duration} min</Text>
                </View>
                <Text style={styles.cardTitle}>{session.name}</Text>
                <Text style={styles.cardDescription}>{session.description}</Text>
                <Text style={styles.cardEffect}>{session.effect}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Explore Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Your Healing Journey</Text>
          <Text style={styles.sectionSubtitle}>Choose your path to transformation</Text>
          
          {exploreCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.exploreCategoryCard}
              onPress={() => {
                if (category.screen === 'Session') {
                  // Navigate to a quick stress relief session
                  navigation.navigate('Session', { 
                    session: {
                      id: 'quick_stress_relief',
                      name: 'Quick Stress Relief',
                      description: 'Immediate relief when you need it most',
                      duration: 300, // 5 minutes
                      type: 'meditation',
                      tracks: ['om_chanting'],
                      difficulty: 'beginner',
                      benefits: ['Instant calm', 'Stress relief', 'Mental clarity'],
                      imageUrl: '',
                      category: 'stress_relief'
                    }
                  });
                } else {
                  navigation.navigate(category.screen);
                }
              }}
            >
              <LinearGradient
                colors={category.color}
                style={styles.exploreCategoryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.exploreCategoryContent}>
                  <View style={styles.exploreCategoryHeader}>
                    <View style={styles.exploreCategoryIconContainer}>
                      <Ionicons name={category.icon as any} size={28} color="#FFFFFF" />
                    </View>
                    <View style={styles.exploreCategoryTextContainer}>
                      <Text style={styles.exploreCategoryTitle}>{category.title}</Text>
                      <Text style={styles.exploreCategorySubtitle}>{category.subtitle}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.exploreCategoryDescription}>{category.description}</Text>
                  
                  <View style={styles.exploreCategoryFooter}>
                    <Text style={styles.exploreCategoryHook}>{category.userHook}</Text>
                    <Text style={styles.exploreCategoryStats}>{category.stats}</Text>
                  </View>
                  
                  <View style={styles.exploreCategoryArrow}>
                    <Ionicons name="arrow-forward" size={20} color="rgba(255,255,255,0.8)" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wellness Packages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 Transformation Packages</Text>
          <Text style={styles.sectionSubtitle}>Life-changing journeys with ancient Indian wisdom</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {wellnessPackages.slice(0, 3).map((pkg: WellnessPackage) => (
              <TouchableOpacity
                key={pkg.id}
                style={styles.packageCard}
                onPress={() => navigation.navigate('PackageDetails', { package: pkg })}
              >
                <LinearGradient
                  colors={getPackageGradient(pkg.category)}
                  style={styles.packageGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {pkg.isPopular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>MOST POPULAR</Text>
                    </View>
                  )}
                  
                  <View style={styles.packageContent}>
                    <Text style={styles.packageTitle}>{pkg.title}</Text>
                    <Text style={styles.packageSubtitle}>{pkg.subtitle}</Text>
                    <Text style={styles.packageDescription}>{pkg.description}</Text>
                    
                    <View style={styles.packageDetails}>
                      <View style={styles.packageDuration}>
                        <Ionicons name="calendar" size={16} color="#FFFFFF" />
                        <Text style={styles.packageDurationText}>{pkg.duration} Days</Text>
                      </View>
                      
                      <View style={styles.packagePrice}>
                        <Text style={styles.packagePriceText}>${pkg.price}</Text>
                        <Text style={styles.packagePriceSubtext}>one-time</Text>
                      </View>
                    </View>
                    
                    <View style={styles.packageBenefits}>
                      <Text style={styles.packageBenefitsTitle}>Key Benefits:</Text>
                      {pkg.benefits.slice(0, 2).map((benefit: string, index: number) => (
                        <Text key={index} style={styles.packageBenefit}>• {benefit}</Text>
                      ))}
                    </View>
                    
                    <View style={styles.packageCTA}>
                      <Text style={styles.packageCTAText}>Start Your Journey</Text>
                      <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.viewAllPackagesButton}
            onPress={() => navigation.navigate('AllPackages')}
          >
            <Text style={styles.viewAllPackagesText}>View All Transformation Packages</Text>
            <Ionicons name="arrow-forward" size={16} color="#667eea" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },
  headerActions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  musicButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.soft,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  quoteText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
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
    marginBottom: 20,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  quickBoostCard: {
    width: 160,
    height: 180,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDuration: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
  },
  cardEffect: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  categoryCard: {
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  categoryIconContainer: {
    marginLeft: 20,
  },
  recommendationCard: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  recommendationGradient: {
    borderRadius: 20,
    padding: 20,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  quoteTextSanskrit: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteTextEnglish: {
    fontSize: 16,
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteMeaning: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 8,
  },
  specialPracticeCard: {
    marginBottom: 10,
  },
  specialPracticeGradient: {
    borderRadius: 20,
    padding: 25,
  },
  specialPracticeContent: {
    alignItems: 'center',
  },
  specialPracticeHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  specialPracticeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  specialPracticeSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  specialPracticeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  specialPracticeMantra: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  specialPracticeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  specialPracticeDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  specialPracticeBenefit: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    flex: 1,
    textAlign: 'right',
  },
  exploreCategoryCard: {
    marginBottom: 15,
  },
  exploreCategoryGradient: {
    borderRadius: 20,
    padding: 25,
    position: 'relative',
  },
  exploreCategoryContent: {
    position: 'relative',
  },
  exploreCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  exploreCategoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exploreCategoryTextContainer: {
    flex: 1,
  },
  exploreCategoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  exploreCategorySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  exploreCategoryDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
    lineHeight: 22,
  },
  exploreCategoryFooter: {
    marginBottom: 10,
  },
  exploreCategoryHook: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  exploreCategoryStats: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  exploreCategoryArrow: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  // Wellness Package Styles
  packageCard: {
    width: width * 0.85,
    marginRight: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  packageGradient: {
    padding: 25,
    minHeight: 400,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  packageContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  packageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 28,
  },
  packageSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  packageDescription: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 20,
    opacity: 0.95,
  },
  packageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  packageDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageDurationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  packagePrice: {
    alignItems: 'flex-end',
  },
  packagePriceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  packagePriceSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  packageBenefits: {
    marginBottom: 20,
  },
  packageBenefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  packageBenefit: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
    lineHeight: 20,
  },
  packageCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  packageCTAText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  viewAllPackagesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 15,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  viewAllPackagesText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginRight: 8,
  },
});

export default HomeScreen;
