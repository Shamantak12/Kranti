// Kranti App - Session Screen for Meditation Sessions
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps, Session, QuickBoostSession } from '../types';
import { quickHealingSessions } from '../data/content';

const { width, height } = Dimensions.get('window');

interface SessionScreenProps extends NavigationProps {
  route: {
    params: {
      sessionId?: string;
      category?: string;
      session?: any; // Session object passed directly
    };
  };
}

const SessionScreen: React.FC<SessionScreenProps> = ({ navigation, route }) => {
  const { sessionId, category, session: passedSession } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Find the session - prioritize passed session object
  const session = passedSession || 
    (sessionId 
      ? quickHealingSessions.find((s: any) => s.id === sessionId)
      : quickHealingSessions[0] || {
          id: 'default',
          name: 'Default Session',
          description: 'Default meditation session',
          duration: 300,
          type: 'meditation',
          tracks: [],
          difficulty: 'beginner',
          benefits: ['Relaxation'],
          imageUrl: '',
          category: 'stress_relief'
        });

  useEffect(() => {
    if (session) {
      setTotalTime(session.duration);
    }
  }, [session]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalTime]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? currentTime / totalTime : 0;

  if (!session) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error" size={64} color="#e74c3c" />
        <Text style={styles.errorText}>Session not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getSessionColors = (): [string, string] => {
    if ('color' in session) {
      // Quick boost session
      return [session.color, session.color + '80'];
    }
    
    // Regular session
    switch (session.category) {
      case 'stress_relief':
        return ['#FF6B35', '#F7931E'];
      case 'energy_boost':
        return ['#667eea', '#764ba2'];
      case 'sleep':
        return ['#8E44AD', '#3498DB'];
      case 'focus':
        return ['#E74C3C', '#C0392B'];
      case 'healing':
        return ['#1e3c72', '#2a5298'];
      default:
        return ['#667eea', '#764ba2'];
    }
  };

  return (
    <LinearGradient colors={getSessionColors()} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          {session.name}
        </Text>
        
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="favorite-border" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Session Info */}
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>{session.name}</Text>
          <Text style={styles.sessionDescription}>{session.description}</Text>
          
          {'effect' in session && (
            <View style={styles.effectContainer}>
              <MaterialIcons name="auto-awesome" size={20} color="white" />
              <Text style={styles.effectText}>{session.effect}</Text>
            </View>
          )}
        </View>

        {/* Progress Circle */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <View style={[styles.progressFill, { transform: [{ rotate: `${progress * 360}deg` }] }]} />
            <View style={styles.progressInner}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.totalTimeText}>/ {formatTime(totalTime)}</Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={resetSession}>
            <MaterialIcons name="restart-alt" size={32} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
            <MaterialIcons 
              name={isPlaying ? "pause" : "play-arrow"} 
              size={48} 
              color="white" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <MaterialIcons name="settings" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {/* Benefits */}
        {'benefits' in session && (
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Session Benefits</Text>
            <View style={styles.benefitsList}>
              {session.benefits.map((benefit: string, index: number) => (
                <View key={index} style={styles.benefitItem}>
                  <MaterialIcons name="check-circle" size={16} color="white" />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Session Complete Modal */}
        {currentTime >= totalTime && (
          <View style={styles.completeOverlay}>
            <View style={styles.completeModal}>
              <MaterialIcons name="check-circle" size={64} color="#27AE60" />
              <Text style={styles.completeTitle}>Session Complete!</Text>
              <Text style={styles.completeText}>
                You've completed your {Math.floor(totalTime / 60)}-minute session
              </Text>
              
              <View style={styles.completeButtons}>
                <TouchableOpacity 
                  style={styles.completeButton}
                  onPress={resetSession}
                >
                  <Text style={styles.completeButtonText}>Repeat Session</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.completeButton, styles.primaryButton]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={[styles.completeButtonText, styles.primaryButtonText]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sessionInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  sessionDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  effectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  effectText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transformOrigin: 'center',
  },
  progressInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  totalTimeText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  benefitsContainer: {
    flex: 1,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  benefitsList: {
    alignItems: 'flex-start',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    opacity: 0.9,
  },
  completeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  completeModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: width * 0.8,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 15,
    marginBottom: 10,
  },
  completeText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  completeButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  completeButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
  primaryButtonText: {
    color: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default SessionScreen;
