 # Audio Files for Kranti App

## 🎵 Background Music (Currently Disabled for Development)

The background music feature is currently disabled to prevent build errors. To enable it:

1. **Add actual audio files** to this directory
2. **Update BackgroundMusicService.ts** to enable the feature
3. **Replace placeholder URLs** with actual file paths

## Required Audio Files Structure

```
assets/audio/
├── ambient/
│   ├── morning-raga.mp3        # Indian classical for morning
│   ├── forest-sounds.mp3       # Indian forest ambience
│   ├── temple-bells.mp3        # Temple bells with nature
│   └── river-meditation.mp3    # Sacred river sounds
├── meditation/
│   ├── guided/                 # Guided meditation tracks
│   ├── breathing/              # Breathing exercises
│   └── mantras/                # Mantra chanting
└── quick-sessions/
    ├── 3min-om.mp3            # Quick stress relief
    ├── 5min-energy.mp3        # Energy boost
    └── 7min-focus.mp3         # Focus enhancement
```

## 🚀 To Enable Background Music:

1. Add the audio files above
2. In `src/services/BackgroundMusicService.ts`, change:
   ```javascript
   private isEnabled: boolean = false; // Change to true
   ```

## 📝 Audio Specifications

- **Format**: MP3, 128kbps (mobile optimized)
- **Volume**: -18dB normalized for ambient background
- **Duration**: 10-30 minutes with seamless loops
- **License**: Ensure proper licensing for all content

## 🎼 Recommended Sources

- **Indian Classical**: License from Indian music libraries
- **Nature Sounds**: Record at Indian locations (Rishikesh, Varanasi)
- **Temple Sounds**: Authentic temple recordings
- **Mantras**: Professional Sanskrit chanters

## 💡 Development Note

Currently using placeholder console logs instead of actual audio to prevent build errors. The UI music controls are fully functional and ready for real audio integration.
