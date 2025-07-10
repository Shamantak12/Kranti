// Kranti App - Home Screen with Beautiful Indian-inspired UI
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps, QuickBoostSession } from '../types';
import { quickBoostSessions, inspirationalQuotes } from '../data/content';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps extends NavigationProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Subh Prabhat'); // Good Morning in Hindi
    } else if (hour < 17) {
      setGreeting('Namaste'); // Greetings
    } else {
      setGreeting('Shubh Sandhya'); // Good Evening in Hindi
    }

    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  const renderQuickBoostCard = (session: QuickBoostSession) => (
    <TouchableOpacity
      key={session.id}
      style={[styles.quickBoostCard, { backgroundColor: session.color }]}
      onPress={() => navigation.navigate('Session', { sessionId: session.id })}
    >
      <MaterialIcons name={session.icon as any} size={32} color="white" />
      <Text style={styles.quickBoostTitle}>{session.name}</Text>
      <Text style={styles.quickBoostEffect}>{session.effect}</Text>
      <Text style={styles.quickBoostDuration}>{Math.floor(session.duration / 60)} min</Text>
    </TouchableOpacity>
  );

  const renderMainFeatureCard = (
    title: string,
    subtitle: string,
    icon: string,
    colors: [string, string],
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.featureCardContainer} onPress={onPress}>
      <LinearGradient colors={colors} style={styles.featureCard}>
        <MaterialIcons name={icon as any} size={48} color="white" />
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section with Quote */}
      <LinearGradient
        colors={['#FF6B35', '#F7931E', '#FFD23F']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Text style={styles.greeting}>{greeting} 🙏</Text>
          <Text style={styles.welcomeText}>Welcome to Your Inner Journey</Text>
          
          {/* Daily Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>
              {inspirationalQuotes[currentQuote].english}
            </Text>
            <Text style={styles.quoteHindi}>
              {inspirationalQuotes[currentQuote].hindi}
            </Text>
            <Text style={styles.quoteSource}>
              - {inspirationalQuotes[currentQuote].source}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Boost Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Boost Sessions ⚡</Text>
        <Text style={styles.sectionSubtitle}>Instant relief for busy lives</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickBoostContainer}>
          {quickBoostSessions.map(renderQuickBoostCard)}
        </ScrollView>
      </View>

      {/* Main Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore & Discover</Text>
        
        <View style={styles.featuresGrid}>
          {renderMainFeatureCard(
            'Meditation Library',
            'Classical ragas & guided sessions',
            'self-improvement',
            ['#667eea', '#764ba2'],
            () => navigation.navigate('Meditate')
          )}
          
          {renderMainFeatureCard(
            'Sacred Mantras',
            'Ancient chants for inner power',
            'library-music',
            ['#f093fb', '#f5576c'],
            () => navigation.navigate('Mantras')
          )}
        </View>

        <View style={styles.featuresGrid}>
          {renderMainFeatureCard(
            'Healing Sessions',
            'Chakra balancing & energy work',
            'healing',
            ['#4facfe', '#00f2fe'],
            () => navigation.navigate('Session', { category: 'healing' })
          )}
          
          {renderMainFeatureCard(
            'Sleep Sounds',
            'Peaceful night ragas for rest',
            'bedtime',
            ['#a8edea', '#fed6e3'],
            () => navigation.navigate('Session', { category: 'sleep' })
          )}
        </View>
      </View>

      {/* Today's Recommendation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Recommendation</Text>
        <TouchableOpacity 
          style={styles.recommendationCard}
          onPress={() => navigation.navigate('Session', { sessionId: 'stress_relief_session' })}
        >
          <LinearGradient
            colors={['#1e3c72', '#2a5298']}
            style={styles.recommendationGradient}
          >
            <View style={styles.recommendationContent}>
              <MaterialIcons name="spa" size={40} color="white" />
              <View style={styles.recommendationText}>
                <Text style={styles.recommendationTitle}>Complete Stress Relief</Text>
                <Text style={styles.recommendationSubtitle}>
                  30-min session with Om mantras & forest sounds
                </Text>
                <Text style={styles.recommendationBenefits}>
                  • Deep relaxation • Emotional balance • Inner peace
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Stats Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
            <MaterialIcons name="local-fire-department" size={24} color="#FF6B35" />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>240</Text>
            <Text style={styles.statLabel}>Minutes</Text>
            <MaterialIcons name="timer" size={24} color="#4ECDC4" />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Sessions</Text>
            <MaterialIcons name="check-circle" size={24} color="#45B7D1" />
          </View>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 20,
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  quoteText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 22,
  },
  quoteHindi: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 8,
  },
  quoteSource: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    opacity: 0.7,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  quickBoostContainer: {
    marginTop: 10,
  },
  quickBoostCard: {
    width: 140,
    height: 160,
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  quickBoostTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  quickBoostEffect: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 8,
  },
  quickBoostDuration: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featureCardContainer: {
    width: (width - 50) / 2,
  },
  featureCard: {
    height: 120,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  featureTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  featureSubtitle: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    marginTop: 4,
    textAlign: 'center',
  },
  recommendationCard: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  recommendationGradient: {
    padding: 20,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationText: {
    flex: 1,
    marginLeft: 15,
  },
  recommendationTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendationSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  recommendationBenefits: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statCard: {
    backgroundColor: 'white',
    width: (width - 60) / 3,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;
