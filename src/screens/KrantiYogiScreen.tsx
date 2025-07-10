import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { YogiConversation, MeditationTrack, MantraData, Session } from '../types';

const { width, height } = Dimensions.get('window');

interface KrantiYogiScreenProps {
  navigation: any;
}

export default function KrantiYogiScreen({ navigation }: KrantiYogiScreenProps) {
  const [conversations, setConversations] = useState<YogiConversation[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const yogiGreetings = [
    "🙏 Namaste, my child. I sense you carry something in your heart today. Please, share what troubles you.",
    "🕉️ Welcome, dear soul. The universe has brought you here for a reason. What weighs upon your mind?",
    "🌸 Blessed child, I am here to guide you on your journey to inner peace. What brings you to seek guidance today?",
    "🧘‍♀️ Peace be with you, my dear one. Your spirit calls for healing. Tell me, what disturbs your inner harmony?"
  ];

  const yogiResponses = {
    stress: [
      "Ah, my child, stress is like a storm cloud - it appears mighty, but it too shall pass. Let me share some sacred mantras that will calm your restless mind...",
      "I understand your burden, dear one. In our ancient wisdom, we say 'This too shall pass.' Allow me to guide you to practices that will restore your peace...",
      "Stress is the mind's way of forgetting its true nature. Come, let us reconnect you with your inner stillness through these blessed sounds..."
    ],
    anxiety: [
      "Anxiety whispers lies to the soul, my child. But you have the power to silence those voices. These sacred vibrations will anchor you in the present moment...",
      "Dear one, anxiety is like trying to solve tomorrow's problems with today's energy. Let these ancient mantras bring you back to this sacred moment..."
    ],
    sadness: [
      "Tears are the soul's way of cleansing, my child. Honor your feelings, but do not let them define you. These healing sounds will lift your spirit...",
      "Sadness visits us all, dear one. It teaches us compassion. Allow these sacred melodies to remind you of the joy that lives within..."
    ],
    anger: [
      "Anger is a fire that burns the one who holds it, my child. Let us transform this energy into something beautiful. These mantras will cool your inner flame...",
      "I see the fire in your heart, dear one. Anger has wisdom to offer, but it must be channeled wisely. These sacred sounds will help you find balance..."
    ],
    general: [
      "Every soul seeks peace, my child. You have taken the first step by coming here. Let me share some gifts from our ancient tradition...",
      "The path to inner peace is walked one step at a time, dear one. These sacred practices will support your journey..."
    ]
  };

  useEffect(() => {
    initializeYogi();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const initializeYogi = async () => {
    // Start background meditation music (optional)
    try {
      // For now, we'll skip the audio to avoid errors
      // Later, add: const { sound: newSound } = await Audio.Sound.createAsync(...)
      console.log('Background music will be added later');
    } catch (error) {
      console.log('Background music not available');
    }

    // Start animations
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Add greeting message
    setTimeout(() => {
      const greeting = yogiGreetings[Math.floor(Math.random() * yogiGreetings.length)];
      addYogiMessage(greeting);
    }, 1500);

    // Start pulse animation for yogi avatar
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const addYogiMessage = (message: string, recommendations?: any) => {
    const newConversation: YogiConversation = {
      id: Date.now().toString(),
      userMessage: '',
      yogiResponse: message,
      timestamp: new Date(),
      hasRecommendations: !!recommendations,
      recommendations,
    };
    setConversations(prev => [...prev, newConversation]);
  };

  const addUserMessage = (message: string) => {
    const newConversation: YogiConversation = {
      id: Date.now().toString(),
      userMessage: message,
      yogiResponse: '',
      timestamp: new Date(),
      hasRecommendations: false,
    };
    setConversations(prev => [...prev, newConversation]);
  };

  const analyzeUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    let category = 'general';
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('work') || lowerMessage.includes('pressure')) {
      category = 'stress';
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worry') || lowerMessage.includes('nervous')) {
      category = 'anxiety';
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      category = 'sadness';
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
      category = 'anger';
    }

    return category;
  };

  const generateRecommendations = (category: string) => {
    // Mock recommendations based on category
    const stressRecommendations = {
      tracks: [
        { id: '1', title: 'Om Shanti Deep Meditation', category: 'mantra' },
        { id: '2', title: 'Peaceful River Sounds', category: 'nature' },
      ],
      mantras: [
        { id: '1', name: 'Om Namah Shivaya', category: 'peace' },
        { id: '2', name: 'So Hum', category: 'peace' },
      ],
      sessions: [
        { id: '1', name: 'Stress Relief Session', type: 'breathing' },
        { id: '2', name: 'Mindful Breathing', type: 'meditation' },
      ],
    };

    return stressRecommendations; // For now, return stress recommendations for all
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage.trim();
    addUserMessage(userMessage);
    setCurrentMessage('');
    setIsTyping(true);

    // Analyze message and generate response
    const category = analyzeUserMessage(userMessage);
    const responses = yogiResponses[category as keyof typeof yogiResponses] || yogiResponses.general;
    const response = responses[Math.floor(Math.random() * responses.length)];
    const recommendations = generateRecommendations(category);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      addYogiMessage(response, recommendations);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 2000);
  };

  const playRecommendation = (item: any, type: string) => {
    // Navigate to appropriate player based on type
    if (type === 'track') {
      navigation.navigate('Player', { track: item });
    } else if (type === 'mantra') {
      navigation.navigate('Mantra', { selectedMantra: item });
    } else if (type === 'session') {
      navigation.navigate('Session', { session: item });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundView}>
        <LinearGradient
          colors={['rgba(101, 67, 33, 0.8)', 'rgba(139, 69, 19, 0.6)', 'rgba(160, 82, 45, 0.4)']}
          style={styles.overlay}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#F5E6D3" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kranti Yogi</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings" size={24} color="#F5E6D3" />
            </TouchableOpacity>
          </View>

          {/* Yogi Avatar */}
          <Animated.View 
            style={[
              styles.yogiContainer,
              { opacity: fadeAnim, transform: [{ scale: pulseAnim }] }
            ]}
          >
            <View style={styles.yogiAvatar}>
              <Text style={styles.yogiEmoji}>🧘‍♂️</Text>
            </View>
            <Text style={styles.yogiName}>Guruji</Text>
          </Animated.View>

          {/* Chat Container */}
          <ScrollView 
            ref={scrollViewRef}
            style={styles.chatContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatContent}
          >
            {conversations.map((conversation) => (
              <View key={conversation.id} style={styles.conversationContainer}>
                {conversation.userMessage ? (
                  <View style={styles.userMessageContainer}>
                    <View style={styles.userMessage}>
                      <Text style={styles.userMessageText}>{conversation.userMessage}</Text>
                    </View>
                  </View>
                ) : null}
                
                {conversation.yogiResponse ? (
                  <View style={styles.yogiMessageContainer}>
                    <View style={styles.yogiMessage}>
                      <Text style={styles.yogiMessageText}>{conversation.yogiResponse}</Text>
                    </View>
                    
                    {conversation.hasRecommendations && conversation.recommendations && (
                      <View style={styles.recommendationsContainer}>
                        <Text style={styles.recommendationsTitle}>🎭 Sacred Recommendations</Text>
                        
                        {conversation.recommendations.tracks?.map((track: any) => (
                          <TouchableOpacity 
                            key={track.id}
                            style={styles.recommendationItem}
                            onPress={() => playRecommendation(track, 'track')}
                          >
                            <Ionicons name="musical-notes" size={20} color="#D4AF37" />
                            <Text style={styles.recommendationText}>{track.title}</Text>
                            <Ionicons name="play-circle" size={20} color="#D4AF37" />
                          </TouchableOpacity>
                        ))}
                        
                        {conversation.recommendations.mantras?.map((mantra: any) => (
                          <TouchableOpacity 
                            key={mantra.id}
                            style={styles.recommendationItem}
                            onPress={() => playRecommendation(mantra, 'mantra')}
                          >
                            <Ionicons name="flower" size={20} color="#D4AF37" />
                            <Text style={styles.recommendationText}>{mantra.name}</Text>
                            <Ionicons name="play-circle" size={20} color="#D4AF37" />
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
            ))}
            
            {isTyping && (
              <View style={styles.typingContainer}>
                <View style={styles.typingIndicator}>
                  <Text style={styles.typingText}>Guruji is contemplating...</Text>
                  <View style={styles.typingDots}>
                    <Text style={styles.dot}>●</Text>
                    <Text style={styles.dot}>●</Text>
                    <Text style={styles.dot}>●</Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={currentMessage}
                onChangeText={setCurrentMessage}
                placeholder="Share your thoughts with Guruji..."
                placeholderTextColor="rgba(245, 230, 211, 0.6)"
                multiline
                maxLength={500}
              />
              <TouchableOpacity 
                style={[styles.sendButton, { opacity: currentMessage.trim() ? 1 : 0.5 }]}
                onPress={sendMessage}
                disabled={!currentMessage.trim()}
              >
                <Ionicons name="send" size={20} color="#F5E6D3" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B4513',
  },
  backgroundView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#8B4513',
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5E6D3',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  settingsButton: {
    padding: 8,
  },
  yogiContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  yogiAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D4AF37',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  yogiEmoji: {
    fontSize: 40,
  },
  yogiName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5E6D3',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatContent: {
    paddingBottom: 20,
  },
  conversationContainer: {
    marginVertical: 10,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: 'rgba(212, 175, 55, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomRightRadius: 5,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userMessageText: {
    color: '#2C1810',
    fontSize: 16,
    fontWeight: '500',
  },
  yogiMessageContainer: {
    alignItems: 'flex-start',
  },
  yogiMessage: {
    backgroundColor: 'rgba(245, 230, 211, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  yogiMessageText: {
    color: '#2C1810',
    fontSize: 16,
    lineHeight: 24,
  },
  recommendationsContainer: {
    marginTop: 15,
    backgroundColor: 'rgba(245, 230, 211, 0.9)',
    borderRadius: 15,
    padding: 15,
    maxWidth: '90%',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 10,
    textAlign: 'center',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  recommendationText: {
    flex: 1,
    color: '#2C1810',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
  },
  typingContainer: {
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  typingIndicator: {
    backgroundColor: 'rgba(245, 230, 211, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    color: '#2C1810',
    fontSize: 14,
    fontStyle: 'italic',
    marginRight: 8,
  },
  typingDots: {
    flexDirection: 'row',
  },
  dot: {
    color: '#D4AF37',
    fontSize: 16,
    marginHorizontal: 1,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(245, 230, 211, 0.15)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  textInput: {
    flex: 1,
    color: '#F5E6D3',
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 5,
  },
  sendButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
