// Kranti App - Meditate Screen with Indian Classical Music
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps, MeditationTrack, Session } from '../types';
import { meditationTracks, sessions } from '../data/content';

const { width } = Dimensions.get('window');

interface MeditateScreenProps extends NavigationProps {}

const MeditateScreen: React.FC<MeditateScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'classical', name: 'Classical', icon: 'music-note' },
    { id: 'guided', name: 'Guided', icon: 'record-voice-over' },
    { id: 'nature', name: 'Nature', icon: 'nature' },
    { id: 'mantra', name: 'Mantras', icon: 'self-improvement' },
    { id: 'instrumental', name: 'Instrumental', icon: 'piano' },
  ];

  const filteredTracks = selectedCategory === 'all' 
    ? meditationTracks 
    : meditationTracks.filter(track => track.category === selectedCategory);

  const renderCategoryTab = (category: any) => {
    const isSelected = selectedCategory === category.id;
    return (
      <TouchableOpacity
        key={category.id}
        style={[styles.categoryTab, isSelected && styles.selectedCategoryTab]}
        onPress={() => setSelectedCategory(category.id)}
      >
        <MaterialIcons 
          name={category.icon as any} 
          size={20} 
          color={isSelected ? 'white' : '#7f8c8d'} 
        />
        <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTrackCard = (track: MeditationTrack) => (
    <TouchableOpacity
      style={styles.trackCard}
      onPress={() => navigation.navigate('Player', { trackId: track.id })}
    >
      <View style={styles.trackImageContainer}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.trackImageGradient}
        >
          <MaterialIcons 
            name={track.category === 'classical' ? 'music-note' : 
                  track.category === 'nature' ? 'nature' :
                  track.category === 'guided' ? 'record-voice-over' : 'self-improvement'} 
            size={40} 
            color="white" 
          />
        </LinearGradient>
      </View>
      
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{track.title}</Text>
        <Text style={styles.trackDescription} numberOfLines={2}>
          {track.description}
        </Text>
        
        <View style={styles.trackMeta}>
          <View style={styles.durationContainer}>
            <MaterialIcons name="access-time" size={14} color="#7f8c8d" />
            <Text style={styles.duration}>{Math.floor(track.duration / 60)} min</Text>
          </View>
          
          <View style={styles.difficultyContainer}>
            <MaterialIcons 
              name={track.difficulty === 'beginner' ? 'stars' : 
                    track.difficulty === 'intermediate' ? 'star-half' : 'grade'} 
              size={14} 
              color="#F39C12" 
            />
            <Text style={styles.difficulty}>{track.difficulty}</Text>
          </View>
        </View>
        
        <View style={styles.benefitsContainer}>
          {track.benefits.slice(0, 2).map((benefit, index) => (
            <View key={index} style={styles.benefitTag}>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSessionCard = (session: Session) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => navigation.navigate('Session', { sessionId: session.id })}
    >
      <LinearGradient
        colors={session.category === 'stress_relief' ? ['#FF6B35', '#F7931E'] :
                session.category === 'energy_boost' ? ['#667eea', '#764ba2'] :
                session.category === 'sleep' ? ['#8E44AD', '#3498DB'] :
                session.category === 'focus' ? ['#E74C3C', '#C0392B'] :
                ['#1e3c72', '#2a5298']}
        style={styles.sessionGradient}
      >
        <View style={styles.sessionContent}>
          <Text style={styles.sessionTitle}>{session.name}</Text>
          <Text style={styles.sessionDescription} numberOfLines={2}>
            {session.description}
          </Text>
          
          <View style={styles.sessionMeta}>
            <Text style={styles.sessionDuration}>
              {Math.floor(session.duration / 60)} minutes
            </Text>
            <Text style={styles.sessionType}>• {session.type}</Text>
          </View>
          
          <View style={styles.sessionBenefits}>
            {session.benefits.slice(0, 2).map((benefit, index) => (
              <Text key={index} style={styles.sessionBenefit}>• {benefit}</Text>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>Find Your Inner Peace</Text>
        <Text style={styles.heroSubtitle}>
          Experience the healing power of Indian classical music and ancient wisdom
        </Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Curated Sessions</Text>
          <Text style={styles.sectionSubtitle}>Complete meditation experiences</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sessions.map(renderSessionCard)}
          </ScrollView>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map(renderCategoryTab)}
          </ScrollView>
        </View>

        {/* Tracks List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Tracks' : 
             categories.find(c => c.id === selectedCategory)?.name + ' Tracks'}
          </Text>
          
          {filteredTracks.map(renderTrackCard)}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  categoriesSection: {
    paddingVertical: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#e8e8e8',
  },
  selectedCategoryTab: {
    backgroundColor: '#FF6B35',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  sessionCard: {
    width: width * 0.75,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sessionGradient: {
    padding: 20,
    height: 160,
  },
  sessionContent: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  sessionDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 12,
    lineHeight: 18,
  },
  sessionMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  sessionDuration: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    fontWeight: '600',
  },
  sessionType: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    marginLeft: 5,
  },
  sessionBenefits: {
    marginTop: 4,
  },
  sessionBenefit: {
    fontSize: 11,
    color: 'white',
    opacity: 0.8,
  },
  trackCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trackImageContainer: {
    marginRight: 15,
  },
  trackImageGradient: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  trackDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 8,
    lineHeight: 18,
  },
  trackMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficulty: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  benefitTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 3,
  },
  benefitText: {
    fontSize: 10,
    color: '#27AE60',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 20,
  },
});

export default MeditateScreen;
