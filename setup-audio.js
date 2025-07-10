// Audio Setup Script for Kranti App
// Run this script to quickly set up audio files for testing

const fs = require('fs');
const path = require('path');

console.log('🎵 Setting up Kranti Audio Files...\n');

// Define the audio structure
const audioStructure = {
  'assets/audio/ambient': {
    files: [
      'morning-raga.mp3',
      'forest-sounds.mp3', 
      'temple-bells.mp3',
      'river-meditation.mp3'
    ],
    description: 'Background ambient music'
  },
  'assets/audio/meditation/guided': {
    files: [
      'breathing-basics.mp3',
      'body-scan.mp3',
      'loving-kindness.mp3'
    ],
    description: 'Guided meditation sessions'
  },
  'assets/audio/meditation/breathing': {
    files: [
      'pranayama-basic.mp3',
      'box-breathing.mp3',
      '4-7-8-breathing.mp3'
    ],
    description: 'Breathing exercise guides'
  },
  'assets/audio/mantras': {
    files: [
      'om-chanting.mp3',
      'gayatri-mantra.mp3',
      'maha-mantra.mp3'
    ],
    description: 'Sanskrit mantra chanting'
  },
  'assets/audio/quick-sessions': {
    files: [
      '3min-om.mp3',
      '5min-energy.mp3',
      '7min-focus.mp3'
    ],
    description: 'Quick stress relief sessions'
  }
};

// Create directory structure and info files
Object.entries(audioStructure).forEach(([dir, config]) => {
  const fullDir = path.join(__dirname, dir);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
  
  // Create info file for each missing audio file
  config.files.forEach(file => {
    const filePath = path.join(fullDir, file);
    const infoPath = path.join(fullDir, `INFO_${file.replace('.mp3', '.txt')}`);
    
    if (!fs.existsSync(filePath) && !fs.existsSync(infoPath)) {
      const audioInfo = `# Audio File: ${file}
# Category: ${config.description}
# Status: NEEDED - Replace this file with actual audio

## Specifications:
- Format: MP3
- Bitrate: 128kbps
- Duration: ${getDurationForFile(file)}
- Volume: Normalized to -18dB

## Where to get this file:
1. Download from: freesound.org, pixabay.com, YouTube Audio Library
2. Search for: "${getSearchTermsForFile(file)}"
3. Rename to: ${file}
4. Place in: ${dir}/

## Quick Download Links:
- Freesound: https://freesound.org/search/?q=${getSearchTermsForFile(file).replace(/ /g, '%20')}
- Pixabay: https://pixabay.com/music/search/${getSearchTermsForFile(file).replace(/ /g, '%20')}/

Once you add this file, the app will automatically use it!
`;
      
      fs.writeFileSync(infoPath, audioInfo);
      console.log(`📝 Created info: INFO_${file.replace('.mp3', '.txt')}`);
    }
  });
});

// Helper functions
function getDurationForFile(filename) {
  if (filename.includes('3min')) return '3 minutes';
  if (filename.includes('5min')) return '5 minutes';
  if (filename.includes('7min')) return '7 minutes';
  if (filename.includes('morning') || filename.includes('raga')) return '10+ minutes (looping)';
  if (filename.includes('forest')) return '15+ minutes (looping)';
  if (filename.includes('temple')) return '20+ minutes (looping)';
  if (filename.includes('river')) return '30+ minutes (looping)';
  return '5-15 minutes';
}

function getSearchTermsForFile(filename) {
  const searchMap = {
    'morning-raga.mp3': 'indian classical morning raga sitar',
    'forest-sounds.mp3': 'indian forest birds nature ambience',
    'temple-bells.mp3': 'temple bells meditation india',
    'river-meditation.mp3': 'river flowing meditation ganges',
    'om-chanting.mp3': 'om mantra chanting meditation',
    'gayatri-mantra.mp3': 'gayatri mantra sanskrit chanting',
    'breathing-basics.mp3': 'guided breathing meditation',
    'pranayama-basic.mp3': 'pranayama breathing yoga',
    '3min-om.mp3': 'short om meditation 3 minutes',
    '5min-energy.mp3': 'energy boost meditation',
    '7min-focus.mp3': 'focus concentration meditation'
  };
  
  return searchMap[filename] || filename.replace('.mp3', '').replace('-', ' ');
}

console.log('\n🎯 Next Steps:');
console.log('1. Look for INFO_*.txt files in each audio folder');
console.log('2. Follow the download links in each file');
console.log('3. Download the MP3 files and place them in the correct folders');
console.log('4. In BackgroundMusicService.ts, change: isEnabled: boolean = true');
console.log('5. Test the app with: npm start');

console.log('\n🚀 Audio setup complete! Check the generated INFO files for download instructions.');
