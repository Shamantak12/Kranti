// Kranti App - Indian Spiritual Healing Content
// Structured like Calm app with authentic Indian healing content

import { MeditationTrack, MantraData, Session, SpiritualContent, YogaExercise } from '../types';

// MIND HEALING CATEGORIES - Organized by life situations like Calm app
export const mindHealingCategories = {
  sleep: {
    id: 'sleep',
    name: 'Sleep & Rest',
    sanskritName: 'निद्रा शान्ति',
    description: 'Deep healing sleep with ancient Indian wisdom',
    icon: 'moon-outline',
    color: ['#2D1B69', '#11047A'],
    sessions: [
      {
        id: 'sleep_1',
        name: '7-Minute Sleep Boost',
        effect: 'Fall asleep in 7 minutes',
        description: 'Ancient Yoga Nidra technique for instant sleep',
        duration: 420, // 7 minutes
        category: 'sleep',
        mantra: 'ॐ नमो भगवते वासुदेवाय',
        benefits: ['Instant sleep', 'Deep rest', 'Morning freshness'],
        tracks: ['sleep_mantra_1', 'sleep_raga_1']
      },
      {
        id: 'sleep_2',
        name: '21-Minute Deep Rest',
        effect: '8 hours quality sleep equivalent',
        description: 'Powerful Yoga Nidra for complete rejuvenation',
        duration: 1260, // 21 minutes
        category: 'sleep',
        mantra: 'ॐ गं गणपतये नमः',
        benefits: ['Complete rejuvenation', 'Stress release', 'Mental clarity'],
        tracks: ['sleep_deeprest_1', 'sleep_tanpura_1']
      },
      {
        id: 'sleep_3',
        name: '40-Minute Sacred Sleep',
        effect: 'Transcendental rest experience',
        description: 'Complete Yoga Nidra journey through consciousness layers',
        duration: 2400, // 40 minutes
        category: 'sleep',
        mantra: 'सो हम्',
        benefits: ['Transcendental rest', 'Subconscious healing', 'Spiritual awakening'],
        tracks: ['deep_yoga_nidra', 'cosmic_sounds']
      }
    ]
  },
  
  work: {
    id: 'work',
    name: 'Work & Focus',
    sanskritName: 'कार्य एकाग्रता',
    description: 'Enhance productivity with Vedic concentration techniques',
    icon: 'business-outline',
    color: ['#F59E0B', '#D97706'],
    sessions: [
      {
        id: 'work_1',
        name: '10-Minute Brain Supercharge',
        effect: '3 hours of laser focus',
        description: 'Activate your Sahasrara chakra for mental clarity',
        duration: 600, // 10 minutes
        category: 'work',
        mantra: 'ॐ ह्रीं श्रीं क्लीं परमेश्वरि स्वाहा',
        benefits: ['Laser focus', 'Enhanced creativity', 'Mental stamina'],
        tracks: ['focus_mantra_1', 'concentration_raga_1']
      },
      {
        id: 'work_2',
        name: '15-Minute Brain Upgrade',
        effect: 'Upgrade 10% brain to 55% capacity',
        description: 'Ancient Trataka and mantra meditation for enhanced cognition',
        duration: 900, // 15 minutes
        category: 'work',
        mantra: 'ॐ गुरवे नमः',
        benefits: ['Enhanced cognition', 'Memory boost', 'Problem-solving skills'],
        tracks: ['brain_upgrade_1', 'vedic_chant_1']
      },
      {
        id: 'work_3',
        name: '25-Minute Genius Mode',
        effect: 'Unlock peak mental performance',
        description: 'Comprehensive cognitive enhancement with sacred geometry',
        duration: 1500, // 25 minutes
        category: 'work',
        mantra: 'ॐ ऐं सरस्वत्यै नमः',
        benefits: ['Peak performance', 'Innovative thinking', 'Mental agility'],
        tracks: ['genius_activation', 'sacred_geometry_sound']
      }
    ]
  },

  stress: {
    id: 'stress',
    name: 'Stress Relief',
    sanskritName: 'तनाव मुक्ति',
    description: 'Release tension with sacred Indian healing sounds',
    icon: 'leaf-outline',
    color: ['#10B981', '#059669'],
    sessions: [
      {
        id: 'stress_1',
        name: '5-Minute Instant Calm',
        effect: 'Immediate stress relief',
        description: 'Powerful Om chanting with Anulom Vilom',
        duration: 300, // 5 minutes
        category: 'stress',
        mantra: 'ॐ शान्ति शान्ति शान्तिः',
        benefits: ['Instant calm', 'Stress release', 'Mental peace'],
        tracks: ['om_chanting_1', 'peaceful_flute_1']
      },
      {
        id: 'stress_2',
        name: '12-Minute Anxiety Release',
        effect: 'Complete emotional healing',
        description: 'Gayatri Mantra with healing ragas',
        duration: 720, // 12 minutes
        category: 'stress',
        mantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
        benefits: ['Emotional healing', 'Anxiety relief', 'Inner strength'],
        tracks: ['gayatri_healing_1', 'stress_relief_raga_1']
      },
      {
        id: 'stress_3',
        name: '30-Minute Deep Release',
        effect: 'Complete nervous system reset',
        description: 'Comprehensive stress healing with chakra balancing',
        duration: 1800, // 30 minutes
        category: 'stress',
        mantra: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
        benefits: ['System reset', 'Deep healing', 'Emotional balance'],
        tracks: ['deep_healing_1', 'chakra_balance_1']
      }
    ]
  },

  energy: {
    id: 'energy',
    name: 'Energy & Vitality',
    sanskritName: 'शक्ति संचार',
    description: 'Boost your life force with Vedic energy practices',
    icon: 'flash-outline',
    color: ['#EF4444', '#DC2626'],
    sessions: [
      {
        id: 'energy_1',
        name: '8-Minute Energy Boost',
        effect: '4 hours sustained energy',
        description: 'Activate your Manipura chakra with Surya mantras',
        duration: 480, // 8 minutes
        category: 'energy',
        mantra: 'ॐ सूर्याय नमः',
        benefits: ['Sustained energy', 'Vitality boost', 'Mental alertness'],
        tracks: ['surya_mantra_1', 'energizing_tabla_1']
      },
      {
        id: 'energy_2',
        name: '20-Minute Power Session',
        effect: 'All-day vitality boost',
        description: 'Complete chakra activation with Vedic fire ceremony',
        duration: 1200, // 20 minutes
        category: 'energy',
        mantra: 'ॐ गं गणपतये नमः ॐ ह्रीं दुर्गायै नमः',
        benefits: ['All-day energy', 'Confidence boost', 'Inner power'],
        tracks: ['chakra_activation_1', 'powerful_drums_1']
      },
      {
        id: 'energy_3',
        name: '35-Minute Transformation',
        effect: 'Complete energy system upgrade',
        description: 'Advanced Kundalini activation for life transformation',
        duration: 2100, // 35 minutes
        category: 'energy',
        mantra: 'ॐ ह्रीं क्लीं हूं फट्',
        benefits: ['System upgrade', 'Life transformation', 'Spiritual power'],
        tracks: ['kundalini_activation', 'transformation_sound']
      }
    ]
  },

  healing: {
    id: 'healing',
    name: 'Inner Healing',
    sanskritName: 'आन्तरिक चिकित्सा',
    description: 'Deep emotional and spiritual healing',
    icon: 'heart-outline',
    color: ['#8B5CF6', '#7C3AED'],
    sessions: [
      {
        id: 'healing_1',
        name: '15-Minute Heart Healing',
        effect: 'Release emotional blocks',
        description: 'Anahata chakra healing with compassion mantras',
        duration: 900, // 15 minutes
        category: 'healing',
        mantra: 'ॐ मणिपद्मे हूं',
        benefits: ['Emotional freedom', 'Heart opening', 'Compassion'],
        tracks: ['heart_healing_1', 'compassion_chant_1']
      },
      {
        id: 'healing_2',
        name: '25-Minute Soul Restoration',
        effect: 'Complete spiritual renewal',
        description: 'Ancient Vedic healing with sacred geometry sounds',
        duration: 1500, // 25 minutes
        category: 'healing',
        mantra: 'सो हम् हंसः',
        benefits: ['Soul restoration', 'Spiritual renewal', 'Inner peace'],
        tracks: ['soul_healing_1', 'sacred_geometry_1']
      },
      {
        id: 'healing_3',
        name: '45-Minute Complete Healing',
        effect: 'Total mind-body-spirit healing',
        description: 'Comprehensive healing journey through all layers of being',
        duration: 2700, // 45 minutes
        category: 'healing',
        mantra: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
        benefits: ['Complete healing', 'Holistic wellness', 'Divine connection'],
        tracks: ['complete_healing', 'divine_frequencies']
      }
    ]
  },

  confidence: {
    id: 'confidence',
    name: 'Confidence & Success',
    sanskritName: 'आत्मविश्वास सफलता',
    description: 'Build unshakeable confidence with warrior mantras',
    icon: 'shield-outline',
    color: ['#F97316', '#EA580C'],
    sessions: [
      {
        id: 'confidence_1',
        name: '12-Minute Warrior Spirit',
        effect: 'Unshakeable confidence',
        description: 'Hanuman mantras for courage and strength',
        duration: 720, // 12 minutes
        category: 'confidence',
        mantra: 'ॐ हनुमते नमः',
        benefits: ['Unshakeable confidence', 'Inner courage', 'Fearlessness'],
        tracks: ['hanuman_power', 'warrior_drums']
      },
      {
        id: 'confidence_2',
        name: '18-Minute Success Magnetism',
        effect: 'Attract opportunities and success',
        description: 'Lakshmi mantras for abundance and prosperity',
        duration: 1080, // 18 minutes
        category: 'confidence',
        mantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
        benefits: ['Success magnetism', 'Abundance mindset', 'Opportunity attraction'],
        tracks: ['lakshmi_abundance', 'prosperity_raga']
      }
    ]
  }
};

// PHYSIC HEALING CATEGORIES
export const physicHealingCategories = {
  yoga: {
    id: 'yoga',
    name: 'Yoga Asanas',
    sanskritName: 'योग आसन',
    description: 'Traditional yoga poses for physical healing',
    icon: 'body-outline',
    color: ['#F59E0B', '#D97706'],
    sessions: [
      {
        id: 'yoga_1',
        name: '10-Minute Morning Flow',
        effect: 'Energize your entire body',
        description: 'Surya Namaskara sequence for daily vitality',
        duration: 600,
        category: 'yoga',
        benefits: ['Improves flexibility', 'Boosts metabolism', 'Enhances mood'],
        difficulty: 'beginner',
        tracks: ['surya_namaskara', 'morning_chant']
      },
      {
        id: 'yoga_2',
        name: '20-Minute Power Yoga',
        effect: 'Build strength and stamina',
        description: 'Dynamic Vinyasa flow for core strength',
        duration: 1200,
        category: 'yoga',
        benefits: ['Core strength', 'Muscle tone', 'Endurance'],
        difficulty: 'intermediate',
        tracks: ['power_yoga_flow', 'energizing_tabla']
      },
      {
        id: 'yoga_3',
        name: '30-Minute Yin Yoga',
        effect: 'Deep relaxation and flexibility',
        description: 'Restorative poses for deep tissue release',
        duration: 1800,
        category: 'yoga',
        benefits: ['Deep flexibility', 'Stress relief', 'Joint mobility'],
        difficulty: 'beginner',
        tracks: ['yin_yoga_music', 'meditation_bells']
      },
      {
        id: 'yoga_4',
        name: '45-Minute Complete Practice',
        effect: 'Full-body transformation',
        description: 'Comprehensive yoga practice for all levels',
        duration: 2700,
        category: 'yoga',
        benefits: ['Complete fitness', 'Mental clarity', 'Spiritual connection'],
        difficulty: 'advanced',
        tracks: ['complete_yoga', 'sacred_mantras']
      }
    ]
  },

  pranayama: {
    id: 'pranayama',
    name: 'Breathing Practices',
    sanskritName: 'प्राणायाम',
    description: 'Sacred breathing techniques for life force control',
    icon: 'refresh-outline',
    color: ['#06B6D4', '#0891B2'],
    sessions: [
      {
        id: 'pranayama_1',
        name: '7-Minute Breath Power',
        effect: 'Instant energy and clarity',
        description: 'Bhastrika and Kapalbhati for vital energy',
        duration: 420,
        category: 'pranayama',
        benefits: ['Increases oxygen', 'Clears mind', 'Boosts immunity'],
        difficulty: 'beginner',
        tracks: ['breathing_guide', 'pranayama_music']
      },
      {
        id: 'pranayama_2',
        name: '15-Minute Wim Hof Method',
        effect: 'Superhuman vitality',
        description: 'Advanced breathwork for enhanced performance',
        duration: 900,
        category: 'pranayama',
        benefits: ['Cold resistance', 'Mental strength', 'Alkaline body'],
        difficulty: 'advanced',
        tracks: ['wim_hof_guide', 'power_breathing']
      },
      {
        id: 'pranayama_3',
        name: '12-Minute Alternate Nostril',
        effect: 'Perfect mind-body balance',
        description: 'Nadi Shodhana for nervous system harmony',
        duration: 720,
        category: 'pranayama',
        benefits: ['Mental balance', 'Stress reduction', 'Focus enhancement'],
        difficulty: 'intermediate',
        tracks: ['nadi_shodhana', 'balancing_tones']
      },
      {
        id: 'pranayama_4',
        name: '25-Minute Breath Mastery',
        effect: 'Complete respiratory transformation',
        description: 'Advanced pranayama techniques for masters',
        duration: 1500,
        category: 'pranayama',
        benefits: ['Breath mastery', 'Spiritual awakening', 'Life force control'],
        difficulty: 'advanced',
        tracks: ['advanced_pranayama', 'mystical_sounds']
      }
    ]
  },

  mudras: {
    id: 'mudras',
    name: 'Sacred Hand Gestures',
    sanskritName: 'मुद्रा योग',
    description: 'Powerful hand positions for healing and manifestation',
    icon: 'hand-left-outline',
    color: ['#8B5CF6', '#7C3AED'],
    sessions: [
      {
        id: 'mudras_1',
        name: '5-Minute Healing Mudras',
        effect: 'Instant energy balance',
        description: 'Basic mudras for health and vitality',
        duration: 300,
        category: 'mudras',
        benefits: ['Energy balance', 'Healing activation', 'Chakra alignment'],
        difficulty: 'beginner',
        tracks: ['mudra_guide', 'healing_frequencies']
      },
      {
        id: 'mudras_2',
        name: '15-Minute Wealth Mudras',
        effect: 'Attract abundance',
        description: 'Lakshmi mudras for prosperity manifestation',
        duration: 900,
        category: 'mudras',
        benefits: ['Wealth attraction', 'Success mindset', 'Opportunity flow'],
        difficulty: 'beginner',
        tracks: ['lakshmi_mudras', 'prosperity_mantras']
      },
      {
        id: 'mudras_3',
        name: '20-Minute Chakra Mudras',
        effect: 'Complete energy system activation',
        description: 'Advanced mudras for all seven chakras',
        duration: 1200,
        category: 'mudras',
        benefits: ['Chakra activation', 'Spiritual power', 'Energy mastery'],
        difficulty: 'intermediate',
        tracks: ['chakra_mudras', 'power_frequencies']
      }
    ]
  },

  ayurveda: {
    id: 'ayurveda',
    name: 'Ayurvedic Healing',
    sanskritName: 'आयुर्वेद चिकित्सा',
    description: 'Ancient Indian medicine for complete wellness',
    icon: 'leaf-outline',
    color: ['#10B981', '#059669'],
    sessions: [
      {
        id: 'ayurveda_1',
        name: '10-Minute Dosha Balance',
        effect: 'Perfect body constitution',
        description: 'Discover and balance your Vata, Pitta, Kapha',
        duration: 600,
        category: 'ayurveda',
        benefits: ['Constitutional balance', 'Health optimization', 'Natural healing'],
        difficulty: 'beginner',
        tracks: ['dosha_guide', 'healing_ragas']
      },
      {
        id: 'ayurveda_2',
        name: '20-Minute Panchakosha',
        effect: 'Five-layer body healing',
        description: 'Heal all five layers of your being',
        duration: 1200,
        category: 'ayurveda',
        benefits: ['Complete healing', 'Body purification', 'Mental clarity'],
        difficulty: 'intermediate',
        tracks: ['panchakosha', 'purification_mantras']
      },
      {
        id: 'ayurveda_3',
        name: '30-Minute Marma Therapy',
        effect: 'Vital point activation',
        description: 'Activate 107 marma points for healing',
        duration: 1800,
        category: 'ayurveda',
        benefits: ['Vital point activation', 'Energy flow', 'Disease prevention'],
        difficulty: 'advanced',
        tracks: ['marma_therapy', 'healing_frequencies']
      }
    ]
  },

  massage: {
    id: 'massage',
    name: 'Self-Massage Therapy',
    sanskritName: 'स्वयं मालिश',
    description: 'Healing touch techniques for self-care',
    icon: 'hand-right-outline',
    color: ['#EC4899', '#DB2777'],
    sessions: [
      {
        id: 'massage_1',
        name: '8-Minute Head Massage',
        effect: 'Instant stress relief',
        description: 'Champi technique for mental relaxation',
        duration: 480,
        category: 'massage',
        benefits: ['Headache relief', 'Stress reduction', 'Better sleep'],
        difficulty: 'beginner',
        tracks: ['massage_guide', 'relaxing_music']
      },
      {
        id: 'massage_2',
        name: '15-Minute Foot Reflexology',
        effect: 'Whole body healing',
        description: 'Activate healing through foot pressure points',
        duration: 900,
        category: 'massage',
        benefits: ['Whole body healing', 'Energy flow', 'Pain relief'],
        difficulty: 'beginner',
        tracks: ['reflexology_guide', 'healing_sounds']
      },
      {
        id: 'massage_3',
        name: '25-Minute Full Body',
        effect: 'Complete physical renewal',
        description: 'Comprehensive self-massage routine',
        duration: 1500,
        category: 'massage',
        benefits: ['Complete relaxation', 'Muscle tension relief', 'Improved circulation'],
        difficulty: 'intermediate',
        tracks: ['full_body_massage', 'therapeutic_music']
      }
    ]
  },

  fitness: {
    id: 'fitness',
    name: 'Spiritual Fitness',
    sanskritName: 'अध्यात्मिक फिटनेस',
    description: 'Ancient Indian fitness practices for modern life',
    icon: 'fitness-outline',
    color: ['#F97316', '#EA580C'],
    sessions: [
      {
        id: 'fitness_1',
        name: '12-Minute Warrior Workout',
        effect: 'Build warrior strength',
        description: 'Hanuman-inspired strength training',
        duration: 720,
        category: 'fitness',
        benefits: ['Functional strength', 'Mental toughness', 'Warrior spirit'],
        difficulty: 'intermediate',
        tracks: ['warrior_workout', 'power_drums']
      },
      {
        id: 'fitness_2',
        name: '20-Minute Kalari Training',
        effect: 'Ancient martial arts power',
        description: 'Kerala\'s ancient martial art for total fitness',
        duration: 1200,
        category: 'fitness',
        benefits: ['Combat fitness', 'Flexibility', 'Mental discipline'],
        difficulty: 'advanced',
        tracks: ['kalari_training', 'martial_music']
      },
      {
        id: 'fitness_3',
        name: '15-Minute Mallakhamb',
        effect: 'Gymnastic strength',
        description: 'Traditional Indian gymnastic training',
        duration: 900,
        category: 'fitness',
        benefits: ['Core strength', 'Balance', 'Coordination'],
        difficulty: 'advanced',
        tracks: ['mallakhamb', 'traditional_drums']
      }
    ]
  }
};

// POWERFUL INDIAN MANTRAS
export const healingMantras: MantraData[] = [
  {
    id: 'ganesh_mantra',
    name: 'Ganesh Mantra',
    sanskrit: 'ॐ गं गणपतये नमः',
    hindi: 'ॐ गं गणपतये नमः',
    english: 'Om Gam Ganapataye Namaha',
    meaning: 'I bow to Lord Ganesha, remover of obstacles',
    benefits: ['Removes obstacles', 'Brings success', 'Enhances wisdom'],
    duration: 300,
    audioUrl: 'ganesh_mantra.mp3',
    deity: 'Lord Ganesha',
    category: 'power'
  },
  {
    id: 'gayatri_mantra',
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    hindi: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    english: 'Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat',
    meaning: 'We meditate on the divine light that illuminates our intellect',
    benefits: ['Enhances wisdom', 'Purifies mind', 'Brings spiritual growth'],
    duration: 180,
    audioUrl: 'gayatri_mantra.mp3',
    deity: 'Sun God',
    category: 'wisdom'
  },
  {
    id: 'om_chanting',
    name: 'Om Chanting',
    sanskrit: 'ॐ',
    hindi: 'ॐ',
    english: 'Om/Aum',
    meaning: 'The primordial sound of the universe',
    benefits: ['Calms mind', 'Reduces stress', 'Connects to universal energy'],
    duration: 600,
    audioUrl: 'om_chanting.mp3',
    category: 'peace'
  }
];

// QUICK HEALING SESSIONS 
export const quickHealingSessions = [
  {
    id: 'quick_morning',
    name: '3-Minute Morning Boost',
    effect: 'Start your day with divine energy',
    description: 'Quick Surya mantra and energizing breath',
    duration: 180,
    type: 'morning',
    mantra: 'ॐ सूर्याय नमः',
    benefits: ['Instant energy', 'Positive mindset', 'Divine connection']
  },
  {
    id: 'quick_work_break',
    name: '2-Minute Desk Relief',
    effect: 'Instant stress relief at work',
    description: 'Neck movements and Om breathing',
    duration: 120,
    type: 'work',
    mantra: 'ॐ शान्ति शान्ति शान्तिः',
    benefits: ['Stress relief', 'Mental clarity', 'Physical relaxation']
  },
  {
    id: 'quick_sleep',
    name: '5-Minute Sleep Prep',
    effect: 'Prepare for deep, healing sleep',
    description: 'Gentle yoga nidra and peaceful mantras',
    duration: 300,
    type: 'sleep',
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    benefits: ['Better sleep', 'Peaceful mind', 'Stress release']
  }
];

// SPIRITUAL WISDOM
export const spiritualWisdom: SpiritualContent[] = [
  {
    id: 'bhagavad_gita_1',
    title: 'The Power of Meditation',
    sanskritTitle: 'ध्यान की शक्ति',
    description: 'Ancient wisdom from Bhagavad Gita on meditation',
    content: 'When the mind is restrained through the practice of meditation, one sees the Self through the self and rests in the Self, completely satisfied.',
    author: 'Lord Krishna',
    category: 'wisdom',
    duration: 480,
    requiresSubscription: 'free',
    tags: ['meditation', 'peace', 'self-realization']
  }
];

// INSPIRATIONAL QUOTES
export const inspirationalQuotes = [
  {
    sanskrit: 'योगः कर्मसु कौशलम्',
    hindi: 'योग कर्मों में कुशलता है',
    english: 'Yoga is skill in action',
    source: 'Bhagavad Gita',
    meaning: 'Performing actions with awareness and balance'
  },
  {
    sanskrit: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः',
    hindi: 'सभी सुखी हों, सभी निरोग हों',
    english: 'May all beings be happy, may all beings be healthy',
    source: 'Upanishads',
    meaning: 'Universal prayer for happiness and wellness'
  }
];
