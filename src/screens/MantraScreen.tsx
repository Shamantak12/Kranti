// Kranti App - Mantra Screen with Sacred Indian Chants
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps, MantraData } from '../types';
import { mantras } from '../data/content';

const { width } = Dimensions.get('window');

interface MantraScreenProps extends NavigationProps {}

const MantraScreen: React.FC<MantraScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMantra, setSelectedMantra] = useState<MantraData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const categories = [
    { id: 'all', name: 'All', icon: 'apps', color: '#FF6B35' },
    { id: 'peace', name: 'Peace', icon: 'spa', color: '#4ECDC4' },
    { id: 'power', name: 'Power', icon: 'flash-on', color: '#E74C3C' },
    { id: 'wisdom', name: 'Wisdom', icon: 'lightbulb', color: '#F39C12' },
    { id: 'health', name: 'Health', icon: 'favorite', color: '#27AE60' },
    { id: 'prosperity', name: 'Prosperity', icon: 'diamond', color: '#8E44AD' },
  ];

  const filteredMantras = selectedCategory === 'all' 
    ? mantras 
    : mantras.filter(mantra => mantra.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : '#FF6B35';
  };

  const renderCategoryTab = (category: any) => {
    const isSelected = selectedCategory === category.id;
    return (
      <TouchableOpacity
        key={category.id}
        style={[styles.categoryTab, isSelected && { backgroundColor: category.color }]}
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

  const renderMantraCard = (mantra: MantraData) => (
    <TouchableOpacity
      key={mantra.id}
      style={styles.mantraCard}
      onPress={() => {
        setSelectedMantra(mantra);
        setShowDetails(true);
      }}
    >
      <LinearGradient
        colors={[getCategoryColor(mantra.category), getCategoryColor(mantra.category) + '80']}
        style={styles.mantraGradient}
      >
        <View style={styles.mantraHeader}>
          <View style={styles.mantraIconContainer}>
            <MaterialIcons 
              name={mantra.category === 'peace' ? 'spa' :
                    mantra.category === 'power' ? 'flash-on' :
                    mantra.category === 'wisdom' ? 'lightbulb' :
                    mantra.category === 'health' ? 'favorite' : 'diamond'} 
              size={32} 
              color="white" 
            />
          </View>
          
          <View style={styles.mantraInfo}>
            <Text style={styles.mantraName}>{mantra.name}</Text>
            <Text style={styles.mantraDeity}>{mantra.deity || 'Universal'}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('Player', { trackId: mantra.id, type: 'mantra' })}
          >
            <MaterialIcons name="play-arrow" size={28} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.mantraContent}>
          <Text style={styles.sanskritText} numberOfLines={2}>
            {mantra.sanskrit}
          </Text>
          
          <View style={styles.mantraMeta}>
            <View style={styles.durationContainer}>
              <MaterialIcons name="access-time" size={16} color="white" />
              <Text style={styles.duration}>{Math.floor(mantra.duration / 60)} min</Text>
            </View>
            
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                setSelectedMantra(mantra);
                setShowDetails(true);
              }}
            >
              <Text style={styles.detailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderMantraDetails = () => {
    if (!selectedMantra) return null;

    return (
      <Modal
        visible={showDetails}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[getCategoryColor(selectedMantra.category), getCategoryColor(selectedMantra.category) + '90']}
            style={styles.modalHeader}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDetails(false)}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>{selectedMantra.name}</Text>
            <Text style={styles.modalDeity}>{selectedMantra.deity || 'Universal Mantra'}</Text>
          </LinearGradient>
          
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Sanskrit Text */}
            <View style={styles.textSection}>
              <Text style={styles.sectionTitle}>Sanskrit</Text>
              <Text style={styles.sanskritTextLarge}>{selectedMantra.sanskrit}</Text>
            </View>
            
            {/* Hindi Translation */}
            <View style={styles.textSection}>
              <Text style={styles.sectionTitle}>Hindi</Text>
              <Text style={styles.hindiText}>{selectedMantra.hindi}</Text>
            </View>
            
            {/* English Translation */}
            <View style={styles.textSection}>
              <Text style={styles.sectionTitle}>English</Text>
              <Text style={styles.englishText}>{selectedMantra.english}</Text>
            </View>
            
            {/* Meaning */}
            <View style={styles.textSection}>
              <Text style={styles.sectionTitle}>Meaning & Significance</Text>
              <Text style={styles.meaningText}>{selectedMantra.meaning}</Text>
            </View>
            
            {/* Benefits */}
            <View style={styles.textSection}>
              <Text style={styles.sectionTitle}>Benefits</Text>
              {selectedMantra.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <MaterialIcons name="check-circle" size={16} color="#27AE60" />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: getCategoryColor(selectedMantra.category) }]}
                onPress={() => {
                  setShowDetails(false);
                  navigation.navigate('Player', { trackId: selectedMantra.id, type: 'mantra' });
                }}
              >
                <MaterialIcons name="play-arrow" size={24} color="white" />
                <Text style={styles.actionButtonText}>Start Chanting</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.favoriteButton}>
                <MaterialIcons name="favorite-border" size={24} color={getCategoryColor(selectedMantra.category)} />
                <Text style={[styles.favoriteButtonText, { color: getCategoryColor(selectedMantra.category) }]}>
                  Add to Favorites
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#f093fb', '#f5576c']}
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>Sacred Mantras</Text>
        <Text style={styles.heroSubtitle}>
          Ancient sounds that heal, empower, and transform
        </Text>
        
        <View style={styles.heroStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mantras.length}</Text>
            <Text style={styles.statLabel}>Mantras</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>Benefits</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Choose Your Intent</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map(renderCategoryTab)}
          </ScrollView>
        </View>

        {/* Mantras Grid */}
        <View style={styles.mantrasSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Sacred Mantras' : 
             categories.find(c => c.id === selectedCategory)?.name + ' Mantras'}
          </Text>
          
          {filteredMantras.map(renderMantraCard)}
        </View>

        {/* Information Section */}
        <View style={styles.infoSection}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.infoCard}
          >
            <MaterialIcons name="info" size={32} color="white" />
            <Text style={styles.infoTitle}>How to Use Mantras</Text>
            <Text style={styles.infoText}>
              Find a quiet space, sit comfortably, and repeat the mantra with focused intention. 
              Let the sacred sounds resonate within your being.
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {renderMantraDetails()}
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
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    marginTop: 2,
  },
  categoriesSection: {
    paddingVertical: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#e8e8e8',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  mantrasSection: {
    paddingVertical: 10,
  },
  mantraCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mantraGradient: {
    padding: 20,
  },
  mantraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  mantraIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  mantraInfo: {
    flex: 1,
  },
  mantraName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  mantraDeity: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mantraContent: {
    marginTop: 10,
  },
  sanskritText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  mantraMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
    opacity: 0.9,
  },
  detailsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  detailsText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalDeity: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  textSection: {
    marginBottom: 25,
  },
  sanskritTextLarge: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 28,
    paddingVertical: 15,
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  hindiText: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 24,
  },
  englishText: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  meaningText: {
    fontSize: 15,
    color: '#5d6d7e',
    lineHeight: 22,
    textAlign: 'justify',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 10,
    flex: 1,
  },
  actionButtons: {
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 20,
  },
});

export default MantraScreen;
