// Kranti App - Audio Service for Meditation and Mantras
import { Audio } from 'expo-av';
import { AudioState } from '../types';

class AudioService {
  private sound: Audio.Sound | null = null;
  private currentTrackId: string | null = null;
  private listeners: ((state: AudioState) => void)[] = [];
  private audioState: AudioState = {
    isPlaying: false,
    currentTrack: null,
    position: 0,
    duration: 0,
    volume: 1.0,
  };

  constructor() {
    this.initializeAudio();
  }

  private async initializeAudio() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  // Subscribe to audio state changes
  subscribe(listener: (state: AudioState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.audioState));
  }

  // Load and play a track
  async loadTrack(trackId: string, audioUrl: string): Promise<boolean> {
    try {
      // Unload previous track if exists
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Load new track
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false, isLooping: false, volume: this.audioState.volume },
        this.onPlaybackStatusUpdate
      );

      this.sound = sound;
      this.currentTrackId = trackId;
      this.audioState.currentTrack = trackId;
      this.notifyListeners();

      return true;
    } catch (error) {
      console.error('Failed to load track:', error);
      return false;
    }
  }

  // Play current track
  async play(): Promise<boolean> {
    try {
      if (this.sound) {
        await this.sound.playAsync();
        this.audioState.isPlaying = true;
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to play track:', error);
      return false;
    }
  }

  // Pause current track
  async pause(): Promise<boolean> {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
        this.audioState.isPlaying = false;
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to pause track:', error);
      return false;
    }
  }

  // Stop current track
  async stop(): Promise<boolean> {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        this.audioState.isPlaying = false;
        this.audioState.position = 0;
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to stop track:', error);
      return false;
    }
  }

  // Seek to position (in milliseconds)
  async seekTo(position: number): Promise<boolean> {
    try {
      if (this.sound) {
        await this.sound.setPositionAsync(position);
        this.audioState.position = position;
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to seek:', error);
      return false;
    }
  }

  // Set volume (0.0 to 1.0)
  async setVolume(volume: number): Promise<boolean> {
    try {
      if (this.sound) {
        await this.sound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
        this.audioState.volume = volume;
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to set volume:', error);
      return false;
    }
  }

  // Get current audio state
  getState(): AudioState {
    return { ...this.audioState };
  }

  // Handle playback status updates
  private onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      this.audioState.isPlaying = status.isPlaying;
      this.audioState.position = status.positionMillis || 0;
      this.audioState.duration = status.durationMillis || 0;
      
      // Auto-stop when track ends
      if (status.didJustFinish && !status.isLooping) {
        this.audioState.isPlaying = false;
        this.audioState.position = 0;
      }

      this.notifyListeners();
    }
  };

  // Cleanup
  async cleanup(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
      this.currentTrackId = null;
      this.audioState = {
        isPlaying: false,
        currentTrack: null,
        position: 0,
        duration: 0,
        volume: 1.0,
      };
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to cleanup audio:', error);
    }
  }

  // Format time for display
  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Check if a specific track is currently playing
  isTrackPlaying(trackId: string): boolean {
    return this.audioState.currentTrack === trackId && this.audioState.isPlaying;
  }
}

// Export singleton instance
export const audioService = new AudioService();
