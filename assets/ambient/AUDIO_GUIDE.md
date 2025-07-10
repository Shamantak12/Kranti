# Audio Assets for Kranti App

This directory contains the ambient background music files for the Kranti app.

## Background Music Files

### Morning (5 AM - 12 PM)
- `morning-raga.mp3` - Energizing Indian classical raga for morning meditation
- Duration: 10 minutes (loops)
- Instruments: Sitar, Tabla, Flute

### Afternoon (12 PM - 5 PM)  
- `forest-sounds.mp3` - Indian forest ambience with birds and nature sounds
- Duration: 15 minutes (loops)
- Elements: Birds, flowing water, gentle wind

### Evening (5 PM - 9 PM)
- `temple-bells.mp3` - Temple bells with evening raga and nature sounds
- Duration: 20 minutes (loops)
- Elements: Temple bells, evening birds, gentle tabla

### Night (9 PM - 5 AM)
- `river-meditation.mp3` - Sacred river sounds for deep relaxation
- Duration: 30 minutes (loops)
- Elements: Flowing Ganges, distant mantras, night sounds

## Audio Specifications

- **Format**: MP3, 128kbps (optimized for mobile)
- **Volume**: Normalized to -18dB for ambient background
- **Loop**: Seamless loops for continuous playback
- **License**: Original compositions or royalty-free

## Implementation Notes

1. Files should be hosted on a CDN for fast loading
2. Consider multiple bitrates for different connection speeds
3. Implement caching for offline playbook
4. Ensure proper licensing for all audio content

## Placeholder URLs (Replace with actual CDN URLs)

```javascript
const audioUrls = {
  morning: 'https://cdn.kranti.app/ambient/morning-raga.mp3',
  afternoon: 'https://cdn.kranti.app/ambient/forest-sounds.mp3', 
  evening: 'https://cdn.kranti.app/ambient/temple-bells.mp3',
  night: 'https://cdn.kranti.app/ambient/river-meditation.mp3'
};
```

For development, you can use placeholder audio or record/license appropriate content.
