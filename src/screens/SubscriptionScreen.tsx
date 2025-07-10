// Subscription Screen - Pricing Plans for Western Users
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps, SubscriptionTier } from '../types';
import { subscriptionTiers } from '../data/wellnessPackages';

const { width } = Dimensions.get('window');

const SubscriptionScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [isYearly, setIsYearly] = useState(true);

  const renderFeature = (feature: string, included: boolean = true) => (
    <View key={feature} style={styles.featureRow}>
      <Ionicons 
        name={included ? "checkmark-circle" : "close-circle"} 
        size={20} 
        color={included ? "#27AE60" : "#E74C3C"} 
      />
      <Text style={[styles.featureText, !included && styles.excludedFeature]}>
        {feature}
      </Text>
    </View>
  );

  const renderSubscriptionCard = (tier: SubscriptionTier, index: number) => {
    const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
    const originalYearlyPrice = tier.originalYearlyPrice;
    const monthlyEquivalent = isYearly ? Math.round(tier.yearlyPrice / 12) : tier.monthlyPrice;
    
    return (
      <View key={tier.id} style={[
        styles.subscriptionCard,
        tier.popularBadge && styles.popularCard
      ]}>
        {tier.popularBadge && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
          </View>
        )}
        
        <LinearGradient
          colors={tier.popularBadge ? ['#667eea', '#764ba2'] : ['#f8f9fa', '#ffffff']}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <Text style={[
              styles.planName,
              tier.popularBadge && styles.popularPlanName
            ]}>
              {tier.displayName}
            </Text>
            
            <View style={styles.priceContainer}>
              {isYearly && tier.originalYearlyPrice > tier.yearlyPrice && (
                <Text style={styles.originalPrice}>
                  ${tier.originalYearlyPrice}
                </Text>
              )}
              <Text style={[
                styles.price,
                tier.popularBadge && styles.popularPrice
              ]}>
                ${price}
              </Text>
              <Text style={[
                styles.priceSubtext,
                tier.popularBadge && styles.popularPriceSubtext
              ]}>
                /{isYearly ? 'year' : 'month'}
              </Text>
              {isYearly && tier.yearlyDiscount > 0 && (
                <Text style={styles.monthlyEquivalent}>
                  (${monthlyEquivalent}/month)
                </Text>
              )}
            </View>
            
            {isYearly && tier.yearlyDiscount > 0 && (
              <View style={styles.savingsContainer}>
                <Text style={styles.savingsText}>
                  {tier.yearlyDiscountText}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.featuresContainer}>
            {tier.features.map((feature: string) => renderFeature(feature, true))}
            {tier.limitations?.map((limitation: string) => renderFeature(limitation, false))}
            
            {tier.maxWellnessPackages > 0 && (
              <View style={styles.packageInfo}>
                <Ionicons name="gift" size={20} color="#667eea" />
                <Text style={styles.packageInfoText}>
                  {tier.maxWellnessPackages === 999 ? 'Unlimited' : tier.maxWellnessPackages} wellness packages included
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={[
              styles.subscribeButton,
              tier.popularBadge && styles.popularSubscribeButton
            ]}
            onPress={() => handleSubscription(tier.id, isYearly)}
          >
            <Text style={[
              styles.subscribeButtonText,
              tier.popularBadge && styles.popularSubscribeButtonText
            ]}>
              {tier.name === 'free' ? 'Current Plan' : 'Choose Plan'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const handleSubscription = (tierId: string, yearly: boolean) => {
    if (tierId === 'free') return;
    
    // Navigate to payment screen or handle subscription logic
    navigation.navigate('Payment', {
      subscriptionId: tierId,
      isYearly: yearly,
      price: yearly ? 
        subscriptionTiers.find((t: SubscriptionTier) => t.id === tierId)?.yearlyPrice :
        subscriptionTiers.find((t: SubscriptionTier) => t.id === tierId)?.monthlyPrice
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Choose Your Path</Text>
          <Text style={styles.headerSubtitle}>
            Unlock the power of ancient Indian wisdom for modern healing
          </Text>
        </View>
      </LinearGradient>

      {/* Billing Toggle */}
      <View style={styles.billingToggle}>
        <Text style={[styles.billingText, !isYearly && styles.activeBillingText]}>
          Monthly
        </Text>
        <Switch
          value={isYearly}
          onValueChange={setIsYearly}
          trackColor={{ false: '#e0e0e0', true: '#667eea' }}
          thumbColor={isYearly ? '#ffffff' : '#f4f3f4'}
        />
        <Text style={[styles.billingText, isYearly && styles.activeBillingText]}>
          Yearly
        </Text>
        {isYearly && (
          <View style={styles.saveBadge}>
            <Text style={styles.saveBadgeText}>Save up to 40%</Text>
          </View>
        )}
      </View>

      {/* Subscription Cards */}
      <View style={styles.cardsContainer}>
        {subscriptionTiers.map((tier: SubscriptionTier, index: number) => renderSubscriptionCard(tier, index))}
      </View>

      {/* Additional Wellness Packages Info */}
      <View style={styles.additionalInfo}>
        <Text style={styles.additionalInfoTitle}>🎁 Premium Wellness Packages</Text>
        <Text style={styles.additionalInfoText}>
          Pro members get 2 transformation packages included. Additional packages available for $10 each:
        </Text>
        <View style={styles.packageList}>
          <Text style={styles.packageItem}>• Peace of Mind in 30 Days</Text>
          <Text style={styles.packageItem}>• Spiritual Awakening in 90 Days</Text>
          <Text style={styles.packageItem}>• Cancer Support in 6 Months</Text>
          <Text style={styles.packageItem}>• Executive Stress Mastery</Text>
          <Text style={styles.packageItem}>• Relationship Harmony</Text>
        </View>
      </View>

      {/* Money Back Guarantee */}
      <View style={styles.guaranteeSection}>
        <Ionicons name="shield-checkmark" size={32} color="#27AE60" />
        <Text style={styles.guaranteeTitle}>30-Day Money Back Guarantee</Text>
        <Text style={styles.guaranteeText}>
          Try any plan risk-free. If you're not completely satisfied with your transformation, 
          we'll refund your money within 30 days.
        </Text>
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
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  billingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  billingText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginHorizontal: 15,
  },
  activeBillingText: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  saveBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  saveBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subscriptionCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  popularCard: {
    borderWidth: 2,
    borderColor: '#667eea',
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    backgroundColor: '#FF6B35',
    paddingVertical: 8,
    zIndex: 1,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  cardGradient: {
    padding: 25,
    paddingTop: 35,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  popularPlanName: {
    color: 'white',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#667eea',
  },
  popularPrice: {
    color: 'white',
  },
  priceSubtext: {
    fontSize: 16,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  popularPriceSubtext: {
    color: 'rgba(255,255,255,0.8)',
  },
  savingsContainer: {
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    color: '#27AE60',
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#2c3e50',
    marginLeft: 10,
    flex: 1,
  },
  excludedFeature: {
    color: '#95a5a6',
    textDecorationLine: 'line-through',
  },
  packageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  packageInfoText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subscribeButton: {
    backgroundColor: '#667eea',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  popularSubscribeButton: {
    backgroundColor: 'white',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popularSubscribeButtonText: {
    color: '#667eea',
  },
  additionalInfo: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  packageList: {
    marginLeft: 10,
  },
  packageItem: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 6,
  },
  guaranteeSection: {
    backgroundColor: 'white',
    margin: 20,
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guaranteeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
    marginTop: 10,
    marginBottom: 8,
  },
  guaranteeText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
  originalPrice: {
    fontSize: 14,
    color: '#95a5a6',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  monthlyEquivalent: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
    marginTop: 4,
  },
  bottomPadding: {
    height: 30,
  },
});

export default SubscriptionScreen;
