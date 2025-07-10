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
          colors={categoryData.color as any}
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

  const renderMantraCard = (mantra: any) => {
    return (
      <TouchableOpacity 
        key={mantra.id} 
        style={styles.mantraCard}
        onPress={() => navigation.navigate('PlayerScreen', { track: mantra })}
      >
        <View style={styles.mantraHeader}>
          <Text style={styles.mantraName}>{mantra.name}</Text>
          <Text style={styles.mantraSanskrit}>{mantra.sanskrit}</Text>
        </View>
        <Text style={styles.mantraMeaning}>{mantra.meaning}</Text>
        <View style={styles.mantraFooter}>
          <Text style={styles.mantraDuration}>
            {Math.floor(mantra.duration / 60)} min
          </Text>
          <View style={styles.mantraBenefits}>
            {mantra.benefits.slice(0, 2).map((benefit: string, index: number) => (
              <Text key={index} style={styles.benefitText}>• {benefit}</Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Text style={styles.headerTitle}>Mind Healing</Text>
        <Text style={styles.headerSubtitle}>Heal your mind with ancient Indian wisdom</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                activeCategory === category.id && styles.activeCategoryTab,
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
                  activeCategory === category.id && styles.activeCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Current Category Content */}
        {getCurrentCategoryData() && (
          <View style={styles.categorySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{getCurrentCategoryData().name}</Text>
              <Text style={styles.sectionSubtitle}>{getCurrentCategoryData().description}</Text>
            </View>

            {/* Healing Sessions */}
            <View style={styles.sessionsContainer}>
              {getCurrentCategoryData().sessions.map(renderSessionCard)}
            </View>
          </View>
        )}

        {/* Quick Sessions */}
        <View style={styles.quickSection}>
          <Text style={styles.quickTitle}>Quick Relief Sessions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickHealingSessions.slice(0, 4).map(renderQuickSession)}
          </ScrollView>
        </View>

        {/* Popular Mantras */}
        <View style={styles.mantrasSection}>
          <Text style={styles.mantrasTitle}>Healing Mantras</Text>
          {healingMantras.slice(0, 3).map(renderMantraCard)}
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
});

export default MindScreen;
