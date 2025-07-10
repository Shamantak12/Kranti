// Kranti App - Background Music Service for Ambient Indian Classical Music
import { Audio } from 'expo-av';

class BackgroundMusicService {
  private backgroundSound: Audio.Sound | null = null;
  private isBackgroundPlaying: boolean = false;
  private currentVolume: number = 0.3; // Lower volume for ambient music
  private fadeInterval: NodeJS.Timeout | null = null;
  private isEnabled: boolean = false; // Set to true when audio files are added

  constructor() {
    this.initializeBackgroundAudio();
  }

  private async initializeBackgroundAudio() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false, // Don't duck for background music
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Failed to initialize background audio:', error);
    }
  }

  // Background music tracks (Indian classical/nature sounds)
  // For development: using online placeholder URLs - replace with actual local files
  private backgroundTracks = [
    {
      id: 'morning_raga',
      name: 'Morning Raga',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // Placeholder - replace with actual raga
      duration: 600000, // 10 minutes
    },
    {
      id: 'forest_sounds',
      name: 'Indian Forest Sounds',
      url: 'https://www.soundjay.com/nature/sounds/forest-with-small-river.mp3', // Placeholder - replace with Indian forest sounds
      duration: 900000, // 15 minutes
    },
    {
      id: 'temple_bells',
      name: 'Temple Bells & Nature',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // Placeholder - replace with temple bells
      duration: 1200000, // 20 minutes
    },
    {
      id: 'river_meditation',
      name: 'Sacred River Flow',
      url: 'https://www.soundjay.com/nature/sounds/stream-water-calm.mp3', // Placeholder - replace with Ganges sounds
      duration: 1800000, // 30 minutes
    },
  ];

  // Start background music automatically when app opens
  async startBackgroundMusic(): Promise<void> {
    if (!this.isEnabled) {
      console.log('Background music disabled for development. Enable in BackgroundMusicService.ts');
      return;
    }

    if (this.isBackgroundPlaying) return;

    try {
      // Choose a random track based on time of day
      const track = this.getTimeBasedTrack();
      
      console.log(`Starting background music: ${track.name}`);
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.url },
        {
          shouldPlay: true,
          isLooping: true,
          volume: 0, // Start with 0 volume for fade-in
        }
      );

      this.backgroundSound = sound;
      this.isBackgroundPlaying = true;

      // Fade in the background music
      this.fadeIn();

      // Set up status update
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish && !status.isLooping) {
          this.restartBackgroundMusic();
        }
      });

    } catch (error) {
      console.error('Failed to start background music:', error);
      // Gracefully handle audio loading errors in development
      this.isBackgroundPlaying = false;
    }
  }

  // Enable background music (call this when you have audio files ready)
  enableBackgroundMusic() {
    this.isEnabled = true;
  }

  // Disable background music (for development)
  disableBackgroundMusic() {
    this.isEnabled = false;
    this.stopBackgroundMusic();
  }

  // Choose track based on time of day for better user experience
  private getTimeBasedTrack() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      // Morning: Energizing raga
      return this.backgroundTracks[0]; // morning_raga
    } else if (hour >= 12 && hour < 17) {
      // Afternoon: Nature sounds
      return this.backgroundTracks[1]; // forest_sounds
    } else if (hour >= 17 && hour < 21) {
      // Evening: Temple bells
      return this.backgroundTracks[2]; // temple_bells
    } else {
      // Night: Peaceful river sounds
      return this.backgroundTracks[3]; // river_meditation
    }
  }

  // Fade in background music
  private fadeIn() {
    if (!this.backgroundSound) return;

    let volume = 0;
    const targetVolume = this.currentVolume;
    const step = targetVolume / 20; // 20 steps for smooth fade

    this.fadeInterval = setInterval(async () => {
      volume += step;
      if (volume >= targetVolume) {
        volume = targetVolume;
        if (this.fadeInterval) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      }
      
      try {
        await this.backgroundSound?.setVolumeAsync(volume);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }, 50);
  }

  // Fade out background music
  private fadeOut(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.backgroundSound) {
        resolve();
        return;
      }

      let volume = this.currentVolume;
      const step = this.currentVolume / 20;

      const fadeOutInterval = setInterval(async () => {
        volume -= step;
        if (volume <= 0) {
          volume = 0;
          clearInterval(fadeOutInterval);
          try {
            await this.backgroundSound?.setVolumeAsync(0);
            resolve();
          } catch (error) {
            console.error('Error fading out:', error);
            resolve();
          }
        } else {
          try {
            await this.backgroundSound?.setVolumeAsync(volume);
          } catch (error) {
            console.error('Error setting volume:', error);
          }
        }
      }, 50);
    });
  }

  // Stop background music
  async stopBackgroundMusic(): Promise<void> {
    if (!this.isBackgroundPlaying) return;

    try {
      await this.fadeOut();
      await this.backgroundSound?.unloadAsync();
      this.backgroundSound = null;
      this.isBackgroundPlaying = false;
    } catch (error) {
      console.error('Failed to stop background music:', error);
    }
  }

  // Pause background music (for meditation sessions)
  async pauseBackgroundMusic(): Promise<void> {
    if (!this.backgroundSound || !this.isBackgroundPlaying) return;

    try {
      await this.fadeOut();
      await this.backgroundSound.pauseAsync();
    } catch (error) {
      console.error('Failed to pause background music:', error);
    }
  }

  // Resume background music
  async resumeBackgroundMusic(): Promise<void> {
    if (!this.backgroundSound) return;

    try {
      await this.backgroundSound.playAsync();
      this.fadeIn();
    } catch (error) {
      console.error('Failed to resume background music:', error);
    }
  }

  // Restart background music (when track ends)
  private async restartBackgroundMusic(): Promise<void> {
    await this.stopBackgroundMusic();
    setTimeout(() => {
      this.startBackgroundMusic();
    }, 1000); // Brief pause before restarting
  }

  // Set background music volume
  async setVolume(volume: number): Promise<void> {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundSound && this.isBackgroundPlaying) {
      try {
        await this.backgroundSound.setVolumeAsync(this.currentVolume);
      } catch (error) {
        console.error('Failed to set volume:', error);
      }
    }
  }

  // Get current state
  getState() {
    return {
      isPlaying: this.isBackgroundPlaying,
      volume: this.currentVolume,
    };
  }

  // Clean up
  async cleanup(): Promise<void> {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    await this.stopBackgroundMusic();
  }
}

export default new BackgroundMusicService();
