// Wellness Packages for Western Users - Indian Healing Methods
import { WellnessPackage, SubscriptionTier } from '../types';

export const wellnessPackages: WellnessPackage[] = [
  {
    id: 'peace_of_mind_30',
    title: 'Peace of Mind in 30 Days',
    subtitle: 'Ancient Vedic Techniques for Modern Stress',
    description: 'Transform your mental state using time-tested Indian meditation and breathing practices. Experience the profound calm that comes from within through Ayurvedic wisdom and yogic sciences.',
    duration: 30,
    price: 10,
    includes: [
      '30 guided meditation sessions with Indian masters',
      'Daily Sanskrit mantras with translations & pronunciation',
      'Pranayama (ancient breathing) techniques',
      'Mindfulness practices from Buddhist & Hindu traditions',
      'Weekly progress assessments with personalized feedback',
      'Digital meditation journal with Indian spiritual insights',
      'Chakra balancing sessions',
      '24/7 access to Kranti Yogi AI guide'
    ],
    benefits: [
      'Reduce anxiety by 60% using proven Vedic methods',
      'Improve sleep quality through ancient Yoga Nidra',
      'Enhanced focus and mental clarity via meditation',
      'Lower stress hormones naturally with Ayurvedic practices',
      'Increased emotional resilience through spiritual wisdom',
      'Better work-life balance using Indian philosophies',
      'Deeper sense of purpose and inner peace'
    ],
    difficulty: 'beginner',
    category: 'mental_health',
    sessions: [],
    tracks: [],
    mantras: [],
    dailyPractices: [
      'Day 1-7: Foundation breathing (Anulom Vilom Pranayama)',
      'Day 8-14: Om meditation & sacred sound healing',
      'Day 15-21: Loving-kindness meditation (Metta)',
      'Day 22-30: Advanced mindfulness & spiritual integration'
    ],
    milestones: [
      {
        day: 7,
        title: 'First Week Breakthrough',
        description: 'Notice significant reduction in daily stress using ancient techniques',
        unlocks: ['Advanced Pranayama techniques', 'Chakra awareness sessions']
      },
      {
        day: 14,
        title: 'Midpoint Mastery',
        description: 'Established daily meditation habit with Indian practices',
        unlocks: ['Sacred Mantra meditation series', 'Ayurvedic sleep protocols']
      },
      {
        day: 21,
        title: 'Spiritual Awakening',
        description: 'Deep connection with inner peace through Vedic wisdom',
        unlocks: ['Advanced meditation techniques', 'Philosophy of mind sessions']
      },
      {
        day: 30,
        title: 'Complete Transformation',
        description: 'Mastered the art of peaceful living through Indian spirituality',
        unlocks: ['Lifetime access to peace practices', 'Advanced spiritual courses']
      }
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        country: 'USA',
        review: 'These ancient Indian practices transformed my anxiety completely. The Pranayama breathing is magical!',
        rating: 5
      },
      {
        name: 'Michael Thompson',
        country: 'UK',
        review: 'As a CEO, stress was killing me. This 30-day journey with Indian wisdom changed everything.',
        rating: 5
      }
    ],
    imageUrl: 'https://example.com/peace-of-mind.jpg',
    videoPreviewUrl: 'https://example.com/peace-preview.mp4',
    isPopular: true,
    requiresSubscription: 'premium_package'
  },
  {
    id: 'way_to_spiritual_90',
    title: 'Way to Spiritual in 90 Days',
    subtitle: 'Complete Spiritual Transformation Journey',
    description: 'Embark on a comprehensive 90-day spiritual awakening using ancient Indian wisdom, yoga philosophy, and meditation practices that have guided seekers for millennia.',
    duration: 90,
    price: 10,
    includes: [
      '90 progressive spiritual lessons from Indian masters',
      'Complete Bhagavad Gita wisdom sessions',
      'Advanced meditation techniques (Vipassana, Trataka)',
      'Chakra system mastery & energy healing',
      'Sanskrit mantra mastery with proper pronunciation',
      'Ayurvedic lifestyle guidance for spiritual growth',
      'Weekly one-on-one sessions with certified Indian teachers',
      'Access to exclusive spiritual community',
      'Traditional Indian spiritual practices (Puja, Aarti)',
      'Philosophy sessions on Advaita, Bhakti, and Karma Yoga'
    ],
    benefits: [
      'Complete spiritual awakening and self-realization',
      'Mastery over mind and emotions through Yoga',
      'Deep understanding of life purpose (Dharma)',
      'Enhanced intuition and inner guidance',
      'Stress-free living through spiritual wisdom',
      'Connection with universal consciousness',
      'Improved relationships through spiritual understanding',
      'Inner joy and lasting happiness',
      'Freedom from material attachments'
    ],
    difficulty: 'intermediate',
    category: 'spiritual_growth',
    sessions: [],
    tracks: [],
    mantras: [],
    dailyPractices: [
      'Day 1-30: Foundation - Basic meditation & Pranayama',
      'Day 31-60: Expansion - Chakra work & Mantra practice',
      'Day 61-90: Integration - Advanced spirituality & life application'
    ],
    milestones: [
      {
        day: 30,
        title: 'Spiritual Foundation',
        description: 'Established strong meditation and mindfulness practice',
        unlocks: ['Chakra healing sessions', 'Advanced breathing techniques']
      },
      {
        day: 60,
        title: 'Energy Mastery',
        description: 'Balanced chakras and enhanced spiritual energy',
        unlocks: ['Kundalini practices', 'Third eye meditation']
      },
      {
        day: 90,
        title: 'Spiritual Awakening',
        description: 'Complete transformation and spiritual realization',
        unlocks: ['Master level practices', 'Teaching certification path']
      }
    ],
    testimonials: [
      {
        name: 'Emma Rodriguez',
        country: 'Canada',
        review: 'This journey completely changed my life. The Indian spiritual practices opened doors I never knew existed.',
        rating: 5
      },
      {
        name: 'David Kim',
        country: 'Australia',
        review: 'After 90 days, I found my true purpose. The ancient wisdom from India is incredibly powerful.',
        rating: 5
      }
    ],
    imageUrl: 'https://example.com/spiritual-journey.jpg',
    videoPreviewUrl: 'https://example.com/spiritual-preview.mp4',
    isPopular: false,
    requiresSubscription: 'premium_package'
  },
  {
    id: 'reducing_cancer_risk_180',
    title: 'Reducing Cancer Risk to 30% in 6 Months',
    subtitle: 'Ayurvedic Healing & Immunity Boost Program',
    description: 'Harness the power of ancient Ayurvedic medicine, yoga therapy, and Indian healing practices to dramatically reduce cancer risk and boost your natural immunity through holistic wellness.',
    duration: 180,
    price: 10,
    includes: [
      'Comprehensive Ayurvedic health assessment',
      'Personalized Dosha-based diet plans (Vata, Pitta, Kapha)',
      'Daily yoga therapy sessions for cancer prevention',
      'Pranayama techniques for cellular healing',
      'Meditation practices for immune system boost',
      'Herbal remedies guidance (Turmeric, Ashwagandha, etc.)',
      'Detox protocols using ancient Indian methods',
      'Stress reduction through Indian spiritual practices',
      'Monthly progress tracking with Ayurvedic doctors',
      'Lifestyle modification based on Ayurvedic principles',
      'Sacred healing mantras for health',
      'Community support with health-focused individuals'
    ],
    benefits: [
      'Reduce cancer risk by up to 70% through natural methods',
      'Boost immune system by 300% with Ayurvedic practices',
      'Eliminate toxins using ancient detox protocols',
      'Optimize cellular health through yoga and meditation',
      'Balance hormones naturally with Ayurvedic wisdom',
      'Reduce inflammation using Indian superfoods',
      'Improve sleep quality for better healing',
      'Enhanced energy levels and vitality',
      'Better digestive health through Ayurvedic diet',
      'Stress-free living for optimal health'
    ],
    difficulty: 'advanced',
    category: 'physical_healing',
    sessions: [],
    tracks: [],
    mantras: [],
    dailyPractices: [
      'Month 1-2: Foundation - Ayurvedic assessment & basic practices',
      'Month 3-4: Intensive - Advanced healing protocols & detox',
      'Month 5-6: Mastery - Complete lifestyle transformation'
    ],
    milestones: [
      {
        day: 30,
        title: 'Ayurvedic Foundation',
        description: 'Established personalized Ayurvedic lifestyle',
        unlocks: ['Advanced herbal protocols', 'Specialized yoga therapy']
      },
      {
        day: 90,
        title: 'Immunity Boost',
        description: 'Significant improvement in immune markers',
        unlocks: ['Advanced detox programs', 'Cellular healing meditations']
      },
      {
        day: 150,
        title: 'Health Transformation',
        description: 'Dramatic improvement in health biomarkers',
        unlocks: ['Master healing techniques', 'Health coaching certification']
      },
      {
        day: 180,
        title: 'Complete Health Mastery',
        description: 'Achieved optimal health through ancient Indian wisdom',
        unlocks: ['Lifetime health protocols', 'Advanced Ayurvedic courses']
      }
    ],
    testimonials: [
      {
        name: 'Jennifer Adams',
        country: 'USA',
        review: 'My doctor was amazed at my health improvements. The Ayurvedic approach works miracles!',
        rating: 5
      },
      {
        name: 'Robert Chen',
        country: 'Singapore',
        review: 'Six months of Indian healing practices transformed my health completely. My cancer markers dropped significantly.',
        rating: 5
      }
    ],
    imageUrl: 'https://example.com/health-healing.jpg',
    videoPreviewUrl: 'https://example.com/health-preview.mp4',
    isPopular: true,
    requiresSubscription: 'premium_package'
  }
];

// Subscription Tiers with USD pricing
export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'free',
    displayName: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    originalYearlyPrice: 0,
    yearlyDiscount: 0,
    features: [
      'Access to basic meditation sessions',
      '5 mantras with translations',
      'Basic breathing exercises',
      'Limited Kranti Yogi conversations',
      'Community access'
    ],
    limitations: [
      'No wellness packages included',
      'Limited content access',
      'Basic support only'
    ],
    maxWellnessPackages: 0,
    popularBadge: false,
    description: 'Start your spiritual journey with basic Indian healing practices',
    yearlyDiscountText: 'Always Free'
  },
  {
    id: 'plus',
    name: 'plus',
    displayName: 'Plus',
    monthlyPrice: 5,
    yearlyPrice: 36, // $3/month when paid yearly
    originalYearlyPrice: 60, // Original $5/month
    yearlyDiscount: 40, // 40% off
    features: [
      'All Free features',
      'Access to 50+ meditation sessions',
      'Complete mantra library with audio',
      'All breathing techniques (Pranayama)',
      'Unlimited Kranti Yogi conversations',
      'Basic yoga sessions',
      'Sleep enhancement programs',
      'Progress tracking and insights',
      'Priority customer support'
    ],
    maxWellnessPackages: 0,
    popularBadge: false,
    description: 'Enhanced access to Indian healing content and practices',
    yearlyDiscountText: 'Save 40%'
  },
  {
    id: 'pro',
    name: 'pro',
    displayName: 'Pro',
    monthlyPrice: 10,
    yearlyPrice: 84, // $7/month when paid yearly
    originalYearlyPrice: 120, // Original $10/month
    yearlyDiscount: 30, // 30% off
    features: [
      'All Plus features',
      'Access to ALL meditation content',
      'Advanced Ayurvedic guidance',
      'Personalized spiritual coaching',
      'Advanced chakra healing sessions',
      'Exclusive Indian master classes',
      '2 FREE wellness packages (worth $20)',
      'Additional packages at $10 each',
      'Live group sessions with Indian teachers',
      'Exclusive community access',
      'Priority support with 24h response',
      'Download content for offline use'
    ],
    maxWellnessPackages: 2,
    popularBadge: true,
    description: 'Complete Indian healing transformation with premium packages',
    yearlyDiscountText: 'Save 30%'
  }
];
