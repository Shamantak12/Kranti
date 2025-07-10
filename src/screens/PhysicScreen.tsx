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
import { physicHealingCategories } from '../data/content';

const { width } = Dimensions.get('window');

const PhysicScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('yoga');

  // Physical healing categories
  const categories = [
    { id: 'yoga', name: 'Yoga', icon: 'body-outline', color: '#F59E0B' },
    { id: 'pranayama', name: 'Breathing', icon: 'refresh-outline', color: '#06B6D4' },
    { id: 'mudras', name: 'Mudras', icon: 'hand-left-outline', color: '#8B5CF6' },
    { id: 'ayurveda', name: 'Ayurveda', icon: 'leaf-outline', color: '#10B981' },
    { id: 'massage', name: 'Massage', icon: 'hand-right-outline', color: '#EC4899' },
    { id: 'fitness', name: 'Fitness', icon: 'fitness-outline', color: '#F97316' },
  ];

  const getCurrentCategoryData = () => {
    return physicHealingCategories[activeCategory as keyof typeof physicHealingCategories];
  };

  const renderSessionCard = (session: any) => {
    const categoryData = getCurrentCategoryData();
    
    return (
      <TouchableOpacity 
        key={session.id} 
        style={styles.sessionCard}
        onPress={() => navigation.navigate('Session', { session })}
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
            <View style={styles.difficultyContainer}>
              <Text style={styles.difficultyLabel}>Level:</Text>
              <Text style={styles.difficultyText}>{session.difficulty}</Text>
            </View>
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F59E0B" />
      
      {/* Header */}
      <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.header}>
        <Text style={styles.headerTitle}>Physic Healing</Text>
        <Text style={styles.headerSubtitle}>Heal your body with ancient Indian practices</Text>
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
              <Text style={styles.sectionSanskrit}>{getCurrentCategoryData().sanskritName}</Text>
              <Text style={styles.sectionSubtitle}>{getCurrentCategoryData().description}</Text>
            </View>

            {/* Healing Sessions */}
            <View style={styles.sessionsContainer}>
              {getCurrentCategoryData().sessions.map(renderSessionCard)}
            </View>
          </View>
        )}

        {/* Practice Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Practice Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb-outline" size={24} color="#F59E0B" />
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                Practice regularly at the same time each day for best results. Early morning is ideal for yoga and pranayama.
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="water-outline" size={24} color="#06B6D4" />
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                Stay hydrated and practice on an empty stomach. Wait at least 2 hours after meals.
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="heart-outline" size={24} color="#EF4444" />
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                Listen to your body. Never force any posture or breathing pattern that causes discomfort.
              </Text>
            </View>
          </View>
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
    backgroundColor: '#F59E0B',
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
  sectionSanskrit: {
    fontSize: 18,
    color: '#F59E0B',
    fontStyle: 'italic',
    marginBottom: 8,
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
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  difficultyLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    textTransform: 'capitalize',
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
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 15,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default PhysicScreen;
