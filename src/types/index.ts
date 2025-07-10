// Kranti App - Stress Relief with Indian Touch
// Type definitions for the application

export interface MeditationTrack {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  category: 'mantra' | 'classical' | 'nature' | 'guided' | 'instrumental';
  audioUrl: string;
  imageUrl: string;
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'hindi' | 'sanskrit' | 'english' | 'instrumental';
  tags: string[];
}

export interface MantraData {
  id: string;
  name: string;
  sanskrit: string;
  hindi: string;
  english: string;
  meaning: string;
  benefits: string[];
  duration: number;
  audioUrl: string;
  deity?: string;
  category: 'power' | 'peace' | 'prosperity' | 'health' | 'wisdom';
}

export interface Session {
  id: string;
  name: string;
  description: string;
  duration: number;
  type: 'meditation' | 'breathing' | 'mantra' | 'music' | 'guided';
  tracks: string[]; // Track IDs
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  imageUrl: string;
  category: 'stress_relief' | 'energy_boost' | 'sleep' | 'focus' | 'healing';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    favoriteCategories: string[];
    defaultSessionDuration: number;
    reminderEnabled: boolean;
    reminderTime: string;
  };
  progress: {
    totalSessions: number;
    totalMinutes: number;
    streakDays: number;
    completedTracks: string[];
    favoriteTraks: string[];
  };
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface AudioState {
  isPlaying: boolean;
  currentTrack: string | null;
  position: number;
  duration: number;
  volume: number;
}

export interface QuickBoostSession {
  id: string;
  name: string;
  description: string;
  duration: number; // 5, 10, 15 minutes
  effect: string; // "3 hours energy", "instant calm", etc.
  tracks: string[];
  color: string;
  icon: string;
}

export interface YogiRecommendation {
  id: string;
  userMessage: string;
  yogiResponse: string;
  situation: string;
  mood: string;
  stressLevel: number; // 1-10
  recommendedTracks: MeditationTrack[];
  recommendedMantras: MantraData[];
  recommendedSessions: Session[];
  wisdom: string; // Spiritual advice from the Yogi
  timestamp: Date;
}

export interface YogiConversation {
  id: string;
  userMessage: string;
  yogiResponse: string;
  timestamp: Date;
  hasRecommendations: boolean;
  recommendations?: {
    tracks: MeditationTrack[];
    mantras: MantraData[];
    sessions: Session[];
  };
}

export interface KrantiYogi {
  greeting: string;
  backgroundMusic: string;
  personality: 'wise' | 'compassionate' | 'gentle' | 'encouraging';
  responses: {
    stress: string[];
    anxiety: string[];
    sadness: string[];
    anger: string[];
    general: string[];
  };
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  yogiHistory: YogiRecommendation[];
  conversations: YogiConversation[];
}

export interface SubscriptionTier {
  id: string;
  name: 'free' | 'plus' | 'pro';
  displayName: string;
  monthlyPrice: number; // in USD
  yearlyPrice: number; // in USD (discounted)
  originalYearlyPrice: number; // original price before discount
  yearlyDiscount: number; // percentage
  features: string[];
  limitations?: string[];
  maxWellnessPackages: number; // 0 for free, 2 for pro, unlimited for premium
  popularBadge?: boolean;
  description: string;
  yearlyDiscountText: string; // e.g., "Save 40%"
}

export interface UserSubscription {
  tier: 'free' | 'plus' | 'pro';
  expiryDate?: Date;
  isActive: boolean;
  autoRenew: boolean;
}

export interface OnboardingSlide {
  id: string;
  sanskritText: string;
  englishTranslation: string;
  instruction: string;
  backgroundGradient: string[];
  icon: string;
}

export interface YogaExercise {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  instructions: string[];
  benefits: string[];
  imageUrl: string;
  videoUrl?: string;
  category: 'asana' | 'pranayama' | 'meditation' | 'mudra';
  requiresSubscription: 'free' | 'plus' | 'pro';
}

export interface SpiritualContent {
  id: string;
  title: string;
  sanskritTitle?: string;
  description: string;
  content: string;
  author: string;
  category: 'mantra' | 'speech' | 'wisdom' | 'story';
  audioUrl?: string;
  duration?: number;
  requiresSubscription: 'free' | 'plus' | 'pro';
  tags: string[];
}

export interface WellnessPackage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: number; // in days
  price: number; // in USD
  originalPrice?: number; // for showing discount
  includes: string[];
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'mental_health' | 'spiritual_growth' | 'physical_healing' | 'stress_relief';
  sessions: Session[];
  tracks: MeditationTrack[];
  mantras: MantraData[];
  dailyPractices: string[];
  milestones: {
    day: number;
    title: string;
    description: string;
    unlocks: string[];
  }[];
  testimonials?: {
    name: string;
    country: string;
    review: string;
    rating: number;
  }[];
  imageUrl: string;
  videoPreviewUrl?: string;
  isPopular?: boolean;
  requiresSubscription: 'pro' | 'premium_package';
}

export interface PremiumPackageSubscription {
  packageId: string;
  userId: string;
  purchaseDate: Date;
  expiryDate: Date;
  isActive: boolean;
  progress: {
    currentDay: number;
    completedSessions: string[];
    streakDays: number;
  };
}
