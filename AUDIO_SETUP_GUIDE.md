# 🎵 Audio Files Setup Guide - Complete Tutorial

## Step 1: Understanding Audio in React Native/Expo

React Native apps handle audio files differently than web apps. Here's what you need to know:

### **File Structure Created:**
```
assets/audio/
├── ambient/                    # ✅ Created - Background music
│   ├── morning-raga.mp3       # To be added
│   ├── forest-sounds.mp3      # To be added  
│   ├── temple-bells.mp3       # To be added
│   └── river-meditation.mp3   # To be added
├── meditation/                # ✅ Created - Main content
│   ├── guided/                # ✅ Created - Guided sessions
│   └── breathing/             # ✅ Created - Breathing exercises
├── mantras/                   # ✅ Created - Sanskrit chants
└── quick-sessions/            # ✅ Created - Short practices
```

## Step 2: Audio File Requirements

### **Technical Specifications:**
- **Format**: MP3 (best compatibility across devices)
- **Bitrate**: 128kbps (good quality, reasonable file size)
- **Sample Rate**: 44.1kHz (standard)
- **File Size**: Max 10MB per file (for faster loading)
- **Duration**: 3-30 minutes per track
- **Volume**: Normalized to -18dB (prevents distortion)

### **Naming Convention:**
```
[duration]-[purpose]-[style].mp3

Examples:
03min-stress-relief-om.mp3
05min-energy-boost-pranayama.mp3
10min-deep-meditation-temple.mp3
15min-sleep-preparation-river.mp3
ambient-morning-raga-loop.mp3
```

## Step 3: Where to Get Audio Files

### **Free Sources (For Development/Testing):**

1. **Freesound.org** (Creative Commons)
   - Search: "indian music", "temple bells", "meditation"
   - Download MP3 format
   - Check license requirements

2. **YouTube Audio Library** 
   - Filter by "Meditation" genre
   - Download high quality MP3
   - All files are royalty-free

3. **Pixabay Music**
   - Good collection of Indian classical samples
   - Free for commercial use
   - Direct MP3 downloads

4. **Zapsplat** (Free with registration)
   - Professional quality sounds
   - Good for nature sounds and ambience

### **Professional Sources (For Production):**

1. **AudioJungle** ($5-50 per track)
   - High quality professional music
   - Extensive Indian classical collection
   - Licensed for commercial use

2. **Epidemic Sound** ($15/month)
   - Unlimited downloads
   - Good for background music
   - All tracks pre-cleared

3. **Pond5** (Pay per track)
   - Professional meditation music
   - Indian spiritual content
   - High quality recordings

## Step 4: How to Download and Add Files

### **Method 1: Direct Download**
```powershell
# Navigate to your project
cd "d:\dell laptop files\kranti\Kranti\assets\audio"

# Create a downloads folder temporarily
mkdir downloads
cd downloads

# Download files using curl (if available) or browser
# Then move to appropriate folders
```

### **Method 2: Using Browser**
1. Go to any free audio site (e.g., Freesound.org)
2. Search for "meditation music" or "indian classical"
3. Download MP3 files
4. Move files to the correct folders in your project

## Step 5: Sample Audio Files to Start With

### **Immediate Setup (Download these first):**

1. **For ambient/morning-raga.mp3:**
   - Search: "indian classical morning raga sitar"
   - Duration: 10+ minutes
   - Should loop seamlessly

2. **For ambient/forest-sounds.mp3:**
   - Search: "indian forest birds nature ambience"
   - Duration: 15+ minutes
   - Natural background sounds

3. **For ambient/temple-bells.mp3:**
   - Search: "temple bells meditation india"
   - Duration: 20+ minutes
   - Mix of bells and nature

4. **For ambient/river-meditation.mp3:**
   - Search: "river flowing meditation ganges"
   - Duration: 30+ minutes
   - Peaceful water sounds

## Step 6: Quick Test Files (Placeholders)

If you want to test immediately, you can use these short samples:

### **Create Simple Test Audio:**
```javascript
// You can record simple "Om" chanting using your phone
// Or use text-to-speech for testing:
// "Om Namah Shivaya" - 3 minutes
// Save as: quick-sessions/3min-om.mp3
```

## Step 7: Enabling Audio in Your App

Once you have audio files, follow these steps:

### **1. Update BackgroundMusicService.ts:**
```typescript
// Change this line:
private isEnabled: boolean = false; // Change to true
```

### **2. Verify File Paths:**
```typescript
// Make sure these match your actual files:
private audioTracks = {
  morning: require('../../assets/audio/ambient/morning-raga.mp3'),
  afternoon: require('../../assets/audio/ambient/forest-sounds.mp3'),
  evening: require('../../assets/audio/ambient/temple-bells.mp3'),
  night: require('../../assets/audio/ambient/river-meditation.mp3'),
};
```

## Step 8: Testing Audio

### **1. Test on Device:**
```bash
# Run on your phone
npx expo start
# Scan QR code with Expo Go app
```

### **2. Check Console:**
```javascript
// Look for these messages:
"Playing morning background music"
"Audio initialization successful"
```

### **3. Test Music Controls:**
- Tap the music icon in the home screen
- Should pause/resume background music
- Check volume levels

## Step 9: Optimizing Audio Files

### **Using Audacity (Free Audio Editor):**

1. **Download Audacity** (free)
2. **Open your audio file**
3. **Apply these effects:**
   ```
   Effect > Amplify > Set to -18dB
   Effect > Normalize > Check "Remove DC offset"
   Effect > Compressor > Use preset "Soft Limiter"
   ```
4. **Export as MP3:**
   ```
   File > Export > Export as MP3
   Quality: 128kbps
   Channel Mode: Stereo
   ```

## Step 10: Content Creation Tips

### **For Indian Spiritual Content:**

1. **Morning Raga (5 AM - 12 PM):**
   - Use energizing ragas like Bhairav, Yaman
   - Include sitar, tabla, flute
   - Gradually increasing tempo

2. **Forest Sounds (12 PM - 5 PM):**
   - Record at Indian locations if possible
   - Include: birds, insects, wind in trees
   - Mix with subtle Indian instruments

3. **Temple Bells (5 PM - 9 PM):**
   - Authentic temple recordings
   - Mix with evening birds
   - Add distant chanting (low volume)

4. **River Meditation (9 PM - 5 AM):**
   - Use Ganges or other sacred river sounds
   - Add crickets, night sounds
   - Very peaceful, sleep-inducing

## Step 11: Legal Considerations

### **Important:**
- ✅ Use only royalty-free or licensed content
- ✅ Keep download receipts/licenses
- ✅ Credit artists if required
- ❌ Never use copyrighted music without permission
- ❌ Don't use YouTube downloads (usually copyrighted)

## Step 12: Quick Start Commands

Run these to get started immediately:

```powershell
# Check if audio directories exist
ls "d:\dell laptop files\kranti\Kranti\assets\audio"

# If you have curl, download a sample file:
# curl -o "morning-raga.mp3" "https://example.com/sample.mp3"

# Or use PowerShell to download:
# Invoke-WebRequest -Uri "URL" -OutFile "filename.mp3"
```

## Ready to Go Checklist:

- ✅ **Directories created** (Done!)
- ⏳ **Download 4 ambient tracks** (Your next step)
- ⏳ **Enable audio in BackgroundMusicService.ts**
- ⏳ **Test on device**
- ⏳ **Add more content gradually**

## Next Steps:

1. **Download 1-2 sample files** to test
2. **Enable audio service** 
3. **Test on your phone**
4. **Gradually add more content**
5. **Optimize for production**

Would you like me to help you find specific audio files or test the implementation?
