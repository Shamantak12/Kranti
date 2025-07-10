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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps, QuickBoostSession } from '../types';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

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
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const quickBoostSessions: QuickBoostSession[] = [
    {
      id: '1',
      name: 'Quick Calm',
      description: 'Instant stress relief',
      duration: 5,
      effect: 'Immediate peace',
      tracks: ['1'],
      color: '#4ECDC4',
      icon: 'leaf',
    },
    {
      id: '2',
      name: 'Energy Boost',
      description: 'Revitalize your spirit',
      duration: 10,
      effect: '3 hours energy',
      tracks: ['2'],
      color: '#FF6B6B',
      icon: 'flash',
    },
    {
      id: '3',
      name: 'Focus Flow',
      description: 'Deep concentration',
      duration: 15,
      effect: 'Enhanced focus',
      tracks: ['3'],
      color: '#667eea',
      icon: 'eye',
    },
  ];

  const featuredCategories = [
    {
      title: 'Meditation',
      subtitle: 'Find inner peace',
      color: ['#667eea', '#764ba2'] as const,
      icon: 'flower',
      screen: 'Meditate',
    },
    {
      title: 'Mantras',
      subtitle: 'Sacred vibrations',
      color: ['#f093fb', '#f5576c'] as const,
      icon: 'musical-notes',
      screen: 'Mantras',
    },
    {
      title: 'AI Assistant',
      subtitle: 'Personal guidance',
      color: ['#4facfe', '#00f2fe'] as const,
      icon: 'bulb',
      screen: 'KrantiAI',
    },
  ];

  const dailyQuote = {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.heroSection}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.username}>Welcome to Kranti</Text>
              <Text style={styles.subtitle}>Your journey to inner peace begins here</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Daily Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>"{dailyQuote.text}"</Text>
            <Text style={styles.quoteAuthor}>- {dailyQuote.author}</Text>
          </View>
        </LinearGradient>

        {/* Quick Boost Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Boost Sessions</Text>
          <Text style={styles.sectionSubtitle}>Instant relief, lasting impact</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {quickBoostSessions.map((session) => (
              <TouchableOpacity
                key={session.id}
                style={[styles.quickBoostCard, { backgroundColor: session.color }]}
                onPress={() => navigation.navigate('Session', { sessionId: session.id })}
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

        {/* Featured Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <Text style={styles.sectionSubtitle}>Discover your path to wellness</Text>
          
          {featuredCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(category.screen)}
            >
              <LinearGradient
                colors={category.color}
                style={styles.categoryCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.categoryContent}>
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                  </View>
                  <View style={styles.categoryIconContainer}>
                    <Ionicons name={category.icon as any} size={40} color="rgba(255,255,255,0.9)" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Recommendation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommendation</Text>
          <TouchableOpacity
            style={styles.recommendationCard}
            onPress={() => navigation.navigate('KrantiAI')}
          >
            <LinearGradient
              colors={['#FF6B6B', '#4ECDC4']}
              style={styles.recommendationGradient}
            >
              <View style={styles.recommendationContent}>
                <Ionicons name="bulb" size={24} color="#FFFFFF" />
                <Text style={styles.recommendationText}>
                  Get personalized recommendations based on your mood and stress level
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
});

export default HomeScreen;
