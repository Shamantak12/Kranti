import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps } from '../types';

const SignUpScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'plus' | 'pro'>('free');

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free Trial',
      sanskritName: 'निःशुल्क',
      price: 0,
      duration: '7 days',
      features: [
        'Basic meditation sessions',
        'Limited mantras',
        'Basic Yogi guidance',
        'Ad-supported experience',
      ],
      color: ['#667eea', '#764ba2'] as const,
    },
    {
      id: 'plus',
      name: 'Kranti Plus',
      sanskritName: 'क्रान्ति प्लस',
      price: 299,
      duration: 'month',
      features: [
        'All meditation sessions',
        'Full mantra library',
        'Unlimited Yogi conversations',
        'Basic yoga exercises',
        'Ad-free experience',
      ],
      color: ['#f093fb', '#f5576c'] as const,
    },
    {
      id: 'pro',
      name: 'Kranti Pro',
      sanskritName: 'क्रान्ति प्रो',
      price: 599,
      duration: 'month',
      features: [
        'Everything in Plus',
        'Advanced yoga programs',
        'Personal Yogi mentor',
        'Offline meditation downloads',
        'Priority support',
        'Exclusive spiritual content',
      ],
      color: ['#43e97b', '#38f9d7'] as const,
    },
  ];

  const handleSignUp = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // Simulate sign up process
    Alert.alert(
      'Welcome!',
      `Thank you for choosing ${subscriptionPlans.find(p => p.id === selectedPlan)?.name}. Your spiritual journey begins now.`,
      [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('MainTabs'),
        },
      ]
    );
  };

  const handleGoogleSignUp = () => {
    // Simulate Google sign up
    Alert.alert('Google Sign Up', 'Google authentication would be integrated here.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.headerGradient}>
            <View style={styles.headerContainer}>
              <Text style={styles.sanskritGreeting}>स्वागतम्</Text>
              <Text style={styles.subtitle}>आध्यात्मिक यात्रा प्रारम्भ करें</Text>
            </View>

            {/* Sign Up Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Google Sign Up */}
              <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Subscription Plans */}
          <View style={styles.plansContainer}>
            <Text style={styles.plansTitle}>अपना मार्ग चुनें</Text>
            <Text style={styles.plansSubtitle}>Choose Your Spiritual Path</Text>
            
            {subscriptionPlans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardSelected,
                ]}
                onPress={() => setSelectedPlan(plan.id as 'free' | 'plus' | 'pro')}
              >
                <LinearGradient
                  colors={plan.color}
                  style={[
                    styles.planGradient,
                    selectedPlan === plan.id && styles.planGradientSelected,
                  ]}
                >
                  <View style={styles.planHeader}>
                    <View>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Text style={styles.planSanskritName}>{plan.sanskritName}</Text>
                    </View>
                    <View style={styles.planPricing}>
                      {plan.price === 0 ? (
                        <Text style={styles.planPrice}>Free</Text>
                      ) : (
                        <>
                          <Text style={styles.planPrice}>₹{plan.price}</Text>
                          <Text style={styles.planDuration}>/{plan.duration}</Text>
                        </>
                      )}
                    </View>
                  </View>

                  <View style={styles.planFeatures}>
                    {plan.features.map((feature, index) => (
                      <View key={index} style={styles.featureRow}>
                        <Ionicons name="checkmark-circle" size={16} color="rgba(255,255,255,0.9)" />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  {selectedPlan === plan.id && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Start Journey Button */}
          <TouchableOpacity style={styles.startButton} onPress={handleSignUp}>
            <LinearGradient
              colors={['#43e97b', '#38f9d7']}
              style={styles.startButtonGradient}
            >
              <Text style={styles.startButtonText}>यात्रा प्रारम्भ करें</Text>
              <Text style={styles.startButtonSubtext}>Start Your Journey</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 50 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  sanskritGreeting: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginLeft: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 10,
  },
  plansContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  plansTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 5,
  },
  plansSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  planCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  planCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  planGradient: {
    padding: 25,
    position: 'relative',
  },
  planGradientSelected: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  planName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  planSanskritName: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },
  planPricing: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  planDuration: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  planFeatures: {
    marginTop: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 10,
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  startButton: {
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  startButtonSubtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
});

export default SignUpScreen;
