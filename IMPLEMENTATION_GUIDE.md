# Kranti App - Backend Implementation Guide

## Step-by-Step Implementation

### 1. Firebase Setup (Free tier to start)

#### Install Firebase dependencies:
```bash
npm install firebase
npm install @firebase/app @firebase/auth @firebase/firestore @firebase/storage
```

#### Create Firebase project:
1. Go to https://console.firebase.google.com/
2. Create new project "kranti-app"
3. Enable Authentication (Email/Password + Google)
4. Enable Firestore Database
5. Enable Storage
6. Get configuration keys

### 2. Database Collections Structure

#### Firestore Collections:
```
/users/{userId}
- id, email, name, subscriptionTier, preferences, progress

/meditationTracks/{trackId}
- title, description, duration, audioUrl, category, difficulty, language, requiresSubscription

/mantras/{mantraId}
- name, sanskrit, hindi, english, meaning, audioUrl, category, requiresSubscription

/sessions/{sessionId}
- name, description, trackIds[], category, difficulty, requiresSubscription

/userSessions/{sessionId}
- userId, trackId, startTime, endTime, completionPercentage

/categories/{categoryId}
- name, description, icon, color
```

### 3. Content Upload Strategy

#### Option A: Manual Admin Upload
- Build admin web panel
- Upload audio files to Firebase Storage
- Add metadata to Firestore

#### Option B: Bulk Import Script
```javascript
// scripts/uploadContent.js
const admin = require('firebase-admin');
const fs = require('fs');

// Upload tracks from JSON file
async function uploadTracks() {
  const tracks = JSON.parse(fs.readFileSync('content/tracks.json'));
  
  for (const track of tracks) {
    await admin.firestore().collection('meditationTracks').add({
      ...track,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
}
```

### 4. Initial Content Plan

#### Essential Content for MVP (20-30 tracks):

**Mantras (5-7 tracks):**
- Om Chanting (5 min)
- Gayatri Mantra (10 min)
- Maha Mrityunjaya Mantra (8 min)
- Hanuman Chalisa (15 min)
- Shiva Mantra (12 min)

**Meditation (8-10 tracks):**
- Breathing Meditation (5, 10, 15 min versions)
- Body Scan (15 min)
- Loving Kindness (10 min)
- Mindfulness (5, 10 min)
- Stress Relief (10 min)

**Nature Sounds (5-8 tracks):**
- Ocean Waves (30 min)
- Forest Sounds (30 min)
- Rain Sounds (30 min)
- Tibetan Bowls (20 min)
- Flute Music (25 min)

**Quick Sessions (5-7 tracks):**
- 3-minute Calm
- 5-minute Energy
- 2-minute Breath Reset
- 7-minute Focus
- 4-minute Sleep Prep

### 5. Content Sources & Creation

#### Professional Content Creation:
1. **Hire Voice Artists**: Find meditation teachers who speak Hindi/English
2. **Studio Recording**: Rent studio for high-quality audio
3. **Music Licensing**: Purchase royalty-free Indian classical music
4. **Script Writing**: Create guided meditation scripts

#### Cost Estimate for Initial Content:
- Voice artist: $50-100 per track × 20 tracks = $1,000-2,000
- Studio recording: $100/hour × 40 hours = $4,000
- Music licensing: $500-1,000
- **Total: $5,500-7,000**

#### Alternative Budget Approach:
- Use AI voice generation (ElevenLabs, Murf) = $500-1,000
- Record at home with good microphone = $500 equipment
- Use free music (with attribution) = $0
- **Total: $500-1,500**

### 6. Audio File Management

#### File Format Standards:
- **Primary**: MP3 320kbps (best quality)
- **Mobile**: MP3 128kbps (data-friendly)
- **Streaming**: AAC format for iOS compatibility

#### Storage Structure:
```
/audio/
  /tracks/
    /meditation/
      /breathing_5min_320.mp3
      /breathing_5min_128.mp3
    /mantras/
      /om_chanting_320.mp3
      /om_chanting_128.mp3
  /thumbnails/
    /meditation_breathing.jpg
    /mantra_om.jpg
```

### 7. User Authentication Flow

#### Registration Process:
1. Email/Password or Google Sign-in
2. Welcome survey (stress level, preferences)
3. Choose free content or premium trial
4. Onboarding tutorial (3-4 screens)

#### User Profile Data:
```typescript
interface UserProfile {
  basicInfo: {
    name: string;
    email: string;
    avatar?: string;
  };
  preferences: {
    language: 'hindi' | 'english' | 'sanskrit';
    reminderTime?: string;
    favoriteCategories: string[];
  };
  subscription: {
    tier: 'free' | 'plus' | 'pro';
    expiryDate?: Date;
  };
  progress: {
    totalSessions: number;
    totalMinutes: number;
    streakDays: number;
    lastSessionDate: Date;
  };
}
```

### 8. Subscription Management

#### Tier Structure:
```typescript
const subscriptionTiers = {
  free: {
    price: 0,
    features: ['5 guided meditations', 'Basic mantras', 'Limited content'],
    limitations: ['Ads', 'No downloads', 'Basic support']
  },
  plus: {
    price: 299, // ₹299/month
    features: ['50+ meditations', 'All mantras', 'Download for offline'],
    limitations: ['Basic support']
  },
  pro: {
    price: 999, // ₹999/year
    features: ['Unlimited content', 'Premium support', 'Early access'],
    limitations: []
  }
};
```

### 9. Analytics & Insights

#### Track User Behavior:
- Session completion rates
- Popular content categories
- Daily/weekly active users
- Subscription conversion rates
- User retention metrics

#### Firebase Analytics Events:
```javascript
// Track meditation session
analytics.logEvent('meditation_started', {
  track_id: 'breathing_10min',
  category: 'meditation',
  duration: 600
});

analytics.logEvent('meditation_completed', {
  track_id: 'breathing_10min',
  completion_percentage: 95,
  user_rating: 5
});
```

### 10. Launch Strategy

#### MVP Launch Checklist:
- [ ] 20 high-quality audio tracks
- [ ] User authentication working
- [ ] Payment integration (Razorpay for India)
- [ ] Basic app store optimization
- [ ] Privacy policy & terms
- [ ] Beta testing with 50 users

#### Marketing Strategy:
1. **Social Media**: Instagram/YouTube with meditation tips
2. **Partnerships**: Collaborate with yoga studios
3. **Content Marketing**: Blog about Indian spiritual practices
4. **App Store**: Optimize for keywords "meditation hindi", "mantras"
5. **Free Content**: Offer 5-7 tracks completely free

#### Budget for First 6 Months:
- Content creation: ₹5,00,000
- Firebase hosting: ₹10,000/month
- Marketing: ₹2,00,000
- Development: ₹3,00,000
- **Total: ₹11,60,000** (~$14,000)

This approach gives you a production-ready app similar to Calm but focused on Indian spiritual content.
