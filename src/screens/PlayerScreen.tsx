// Kranti App - Player Screen for Audio Playback
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps, AudioState, MeditationTrack, MantraData } from '../types';
import { healingMantras } from '../data/content';
import { audioService } from '../services/AudioService';

const { width, height } = Dimensions.get('window');

interface PlayerScreenProps extends NavigationProps {
  route: {
    params: {
      trackId?: string;
      type?: 'meditation' | 'mantra';
      track?: any; // Track object passed directly
    };
  };
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ navigation, route }) => {
  const { trackId, type = 'meditation', track: passedTrack } = route.params;
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTrack: null,
    position: 0,
    duration: 0,
    volume: 1.0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Find the track - prioritize passed track object
  const track = passedTrack || 
    (type === 'mantra' 
      ? healingMantras.find((m: MantraData) => m.id === trackId)
      : healingMantras.find((t: MantraData) => t.id === trackId)) || 
    {
      id: 'default',
      name: 'Default Track',
      description: 'Default meditation track',
      duration: 300,
      audioUrl: '',
      sanskrit: 'Om',
      hindi: 'ओम',
      english: 'Om',
      meaning: 'The sound of the universe',
      benefits: ['Peace', 'Clarity'],
      category: 'peace'
    };

  useEffect(() => {
    // Subscribe to audio service updates
    const unsubscribe = audioService.subscribe(setAudioState);
    
    // Load track if found
    if (track) {
      loadTrack();
    }

    return unsubscribe;
  }, [trackId]);

  const loadTrack = async () => {
    if (!track) return;
    
    setIsLoading(true);
    const success = await audioService.loadTrack(track.id, track.audioUrl);
    setIsLoading(false);
    
    if (!success) {
      // Handle error - for demo, we'll just show a message
      console.error('Failed to load track');
    }
  };

  const togglePlayPause = async () => {
    if (audioState.isPlaying) {
      await audioService.pause();
    } else {
      await audioService.play();
    }
  };

  const handleSeek = async (value: number) => {
    await audioService.seekTo(value * audioState.duration);
  };

  const handleVolumeChange = async (value: number) => {
    await audioService.setVolume(value);
  };

  const formatTime = (milliseconds: number) => {
    return audioService.formatTime(milliseconds);
  };

  if (!track) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error" size={64} color="#e74c3c" />
        <Text style={styles.errorText}>Track not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getTrackColors = (): [string, string] => {
    if (type === 'mantra') {
      const mantra = track as any;
      switch (mantra.category) {
        case 'peace': return ['#4ECDC4', '#44A08D'];
        case 'power': return ['#E74C3C', '#C0392B'];
        case 'wisdom': return ['#F39C12', '#E67E22'];
        case 'health': return ['#27AE60', '#2ECC71'];
        case 'prosperity': return ['#8E44AD', '#9B59B6'];
        default: return ['#667eea', '#764ba2'];
      }
    } else {
      const meditation = track as any;
      switch (meditation.category) {
        case 'classical': return ['#667eea', '#764ba2'];
        case 'nature': return ['#27AE60', '#2ECC71'];
        case 'guided': return ['#E74C3C', '#C0392B'];
        case 'instrumental': return ['#F39C12', '#E67E22'];
        default: return ['#8E44AD', '#9B59B6'];
      }
    }
  };

  return (
    <LinearGradient colors={getTrackColors()} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-arrow-down" size={32} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <Text style={styles.headerSubtitle}>
            {type === 'mantra' ? 'Sacred Mantra' : 'Meditation Track'}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Track Art */}
      <View style={styles.artContainer}>
        <View style={styles.artCircle}>
          <View style={styles.artInner}>
            <MaterialIcons 
              name={type === 'mantra' ? 'self-improvement' : 
                    'category' in track && track.category === 'classical' ? 'music-note' :
                    'category' in track && track.category === 'nature' ? 'nature' :
                    'category' in track && track.category === 'guided' ? 'record-voice-over' : 
                    'spa'} 
              size={80} 
              color="white" 
            />
          </View>
        </View>
      </View>

      {/* Track Info */}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={2}>
          {'name' in track ? track.name : track.title}
        </Text>
        
        {type === 'mantra' && 'deity' in track && track.deity && (
          <Text style={styles.trackArtist}>{track.deity}</Text>
        )}
        
        {type === 'meditation' && 'difficulty' in track && (
          <Text style={styles.trackArtist}>
            {track.difficulty.charAt(0).toUpperCase() + track.difficulty.slice(1)} Level
          </Text>
        )}
        
        <Text style={styles.trackDescription} numberOfLines={3}>
          {'description' in track ? track.description : 
           'meaning' in track ? track.meaning : ''}
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${audioState.duration > 0 ? (audioState.position / audioState.duration) * 100 : 0}%` }
            ]} 
          />
        </View>
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(audioState.position)}</Text>
          <Text style={styles.timeText}>{formatTime(audioState.duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="shuffle" size={28} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="skip-previous" size={36} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={togglePlayPause}
          disabled={isLoading}
        >
          {isLoading ? (
            <MaterialIcons name="hourglass-empty" size={48} color="white" />
          ) : (
            <MaterialIcons 
              name={audioState.isPlaying ? "pause" : "play-arrow"} 
              size={48} 
              color="white" 
            />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="skip-next" size={36} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="repeat" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Volume */}
      <View style={styles.volumeContainer}>
        <MaterialIcons name="volume-down" size={24} color="white" />
        <View style={styles.volumeBar}>
          <View 
            style={[styles.volumeFill, { width: `${audioState.volume * 100}%` }]} 
          />
        </View>
        <MaterialIcons name="volume-up" size={24} color="white" />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="favorite-border" size={24} color="white" />
          <Text style={styles.actionButtonText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="download" size={24} color="white" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="share" size={24} color="white" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    marginTop: 2,
  },
  artContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  artCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artInner: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  trackArtist: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginBottom: 12,
  },
  trackDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginHorizontal: 10,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: 'white',
    marginTop: 8,
    opacity: 0.8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#f8f9fa',
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

export default PlayerScreen;
