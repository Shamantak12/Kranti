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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps } from '../types';
import { mindHealingCategories, quickHealingSessions, healingMantras } from '../data/content';

const { width } = Dimensions.get('window');

const MindScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('sleep');

  // Categories based on life situations (like Calm app)
  const categories = [
    { id: 'sleep', name: 'Sleep', icon: 'moon-outline', color: '#2D1B69' },
    { id: 'work', name: 'Focus', icon: 'business-outline', color: '#F59E0B' },
    { id: 'stress', name: 'Stress Relief', icon: 'leaf-outline', color: '#10B981' },
    { id: 'energy', name: 'Energy', icon: 'flash-outline', color: '#EF4444' },
    { id: 'healing', name: 'Healing', icon: 'heart-outline', color: '#8B5CF6' },
    { id: 'confidence', name: 'Confidence', icon: 'shield-outline', color: '#F97316' },
  ];

  const getCurrentCategoryData = () => {
    return mindHealingCategories[activeCategory as keyof typeof mindHealingCategories];
  };

  const renderSessionCard = (session: any) => {
    const categoryData = getCurrentCategoryData();
    
    return (
      <TouchableOpacity 
        key={session.id} 
        style={styles.sessionCard}
        onPress={() => navigation.navigate('SessionScreen', { session })}
      >
        <LinearGradient
          colors={categoryData.color}
          style={styles.sessionGradient}
        >
          <View style={styles.sessionHeader}>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionName}>{session.name}</Text>
              <Text style={styles.sessionEffect}>{session.effect}</Text>
              <Text style={styles.sessionDescription}>{session.description}</Text>
            </View>
            <View style={styles.sessionDuration}>
              <Text style={styles.durationText}>
                {Math.floor(session.duration / 60)}m
              </Text>
            </View>
          </View>
          
          <View style={styles.sessionFooter}>
            <Text style={styles.mantraText}>{session.mantra}</Text>
            <View style={styles.benefitsContainer}>
              {session.benefits.slice(0, 2).map((benefit: string, index: number) => (
                <View key={index} style={styles.benefitTag}>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderQuickSession = (session: any) => {
    return (
      <TouchableOpacity 
        key={session.id} 
        style={styles.quickSessionCard}
        onPress={() => navigation.navigate('SessionScreen', { session })}
      >
        <View style={styles.quickSessionContent}>
          <Text style={styles.quickSessionName}>{session.name}</Text>
          <Text style={styles.quickSessionEffect}>{session.effect}</Text>
          <Text style={styles.quickSessionDuration}>
            {Math.floor(session.duration / 60)} min
          </Text>
        </View>
        <Ionicons name="play-circle" size={40} color="#667eea" />
      </TouchableOpacity>
    );
  };
      tags: ['meditation', 'spirituality', 'transformation'],
    },
    {
      id: '3',
      title: 'Maha Mrityunjaya Mantra',
      sanskritTitle: 'महामृत्युञ्जय मन्त्र',
      description: 'The great death-conquering mantra for healing and protection',
      content: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्...',
      author: 'Lord Shiva',
      category: 'mantra',
      duration: 300,
      requiresSubscription: 'free',
      tags: ['healing', 'protection', 'shiva'],
    },
    {
      id: '4',
      title: 'The Wisdom of the Bhagavad Gita',
      description: 'Timeless teachings from the sacred Bhagavad Gita',
      content: 'Chapter 2, Verse 47: You have the right to perform action...',
      author: 'Lord Krishna',
      category: 'wisdom',
      duration: 900,
      requiresSubscription: 'pro',
      tags: ['bhagavad-gita', 'krishna', 'dharma'],
    },
    {
      id: '5',
      title: 'The Monkey and the Crocodile',
      description: 'A spiritual story about wisdom and trust',
      content: 'Once upon a time, by the banks of a great river...',
      author: 'Panchatantra',
      category: 'story',
      duration: 600,
      requiresSubscription: 'plus',
      tags: ['wisdom', 'trust', 'story'],
    },
  ];

  const filteredContent = activeCategory === 'all' 
    ? spiritualContent 
    : spiritualContent.filter(content => content.category === activeCategory);

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
    return `${minutes} min`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.header}>
        <Text style={styles.headerTitle}>Mind & Spirit</Text>
        <Text style={styles.headerSubtitle}>मन और आत्मा</Text>
        <Text style={styles.headerDescription}>
          Nourish your mind with ancient wisdom and sacred teachings
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

      {/* Content List */}
      <ScrollView style={styles.contentList} showsVerticalScrollIndicator={false}>
        {filteredContent.map((content) => {
          const badge = getSubscriptionBadge(content.requiresSubscription);
          
          return (
            <TouchableOpacity
              key={content.id}
              style={styles.contentCard}
              onPress={() => {
                // Navigate to content player or details
              }}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.contentTitle}>{content.title}</Text>
                    {content.sanskritTitle && (
                      <Text style={styles.sanskritTitle}>{content.sanskritTitle}</Text>
                    )}
                  </View>
                  <View style={[styles.subscriptionBadge, { backgroundColor: badge.color }]}>
                    <Text style={styles.badgeText}>{badge.text}</Text>
                  </View>
                </View>

                <Text style={styles.contentDescription}>{content.description}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.authorContainer}>
                    <Ionicons name="person-outline" size={16} color="#6B7280" />
                    <Text style={styles.authorText}>{content.author}</Text>
                  </View>
                  
                  <View style={styles.metaContainer}>
                    {content.duration && (
                      <View style={styles.durationContainer}>
                        <Ionicons name="time-outline" size={16} color="#6B7280" />
                        <Text style={styles.durationText}>{formatDuration(content.duration)}</Text>
                      </View>
                    )}
                    
                    <View style={styles.categoryIndicator}>
                      <Ionicons
                        name={
                          content.category === 'mantra' ? 'musical-notes-outline' :
                          content.category === 'speech' ? 'mic-outline' :
                          content.category === 'wisdom' ? 'bulb-outline' :
                          'book-outline'
                        }
                        size={16}
                        color="#667eea"
                      />
                    </View>
                  </View>
                </View>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                  {content.tags.slice(0, 3).map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        <View style={styles.upgradePrompt}>
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.upgradeGradient}>
            <Ionicons name="diamond-outline" size={32} color="#FFFFFF" />
            <Text style={styles.upgradeTitle}>Unlock Premium Content</Text>
            <Text style={styles.upgradeDescription}>
              Get access to exclusive mantras, spiritual speeches, and wisdom teachings
            </Text>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
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
  contentList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentCard: {
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
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  sanskritTitle: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  subscriptionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  durationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  categoryIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  upgradePrompt: {
    marginVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  upgradeGradient: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 10,
  },
  upgradeDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MindScreen;
