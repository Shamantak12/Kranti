# Kranti App - Backend Architecture Guide

## Content Management Strategy (Recommended: Professional Model like Calm)

### Why Professional Content Model:
- **Quality Control**: Ensures therapeutic effectiveness
- **Legal Safety**: Proper licensing for music and mantras
- **Brand Trust**: Users trust professionally curated content
- **Scalability**: Easier to maintain and scale

## Backend Technology Options

### Option 1: Firebase (Recommended for MVP)
```
- Authentication: Firebase Auth
- Database: Firestore
- Storage: Firebase Storage (for audio files)
- Hosting: Firebase Hosting
- Analytics: Firebase Analytics
- Push Notifications: Firebase Cloud Messaging
```

### Option 2: AWS Backend
```
- Authentication: AWS Cognito
- Database: DynamoDB
- Storage: S3 (for audio files)
- API: API Gateway + Lambda
- CDN: CloudFront
- Analytics: AWS Analytics
```

### Option 3: Custom Node.js Backend
```
- Framework: Express.js/Fastify
- Database: PostgreSQL/MongoDB
- Authentication: JWT + bcrypt
- Storage: AWS S3/Google Cloud Storage
- Server: Docker + AWS EC2/Digital Ocean
```

## Database Schema Design

### Core Tables/Collections:

#### 1. Users
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscriptionTier: 'free' | 'plus' | 'pro';
  createdAt: Date;
  lastActiveAt: Date;
  preferences: {
    favoriteCategories: string[];
    reminderTime?: string;
    preferredLanguage: 'hindi' | 'english' | 'sanskrit';
  };
  progress: {
    totalSessions: number;
    totalMinutes: number;
    streakDays: number;
    lastSessionDate?: Date;
    completedTracks: string[];
  };
}
```

#### 2. Content Tables
```typescript
// Meditation Tracks
interface MeditationTrack {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  audioUrl: string;
  imageUrl: string;
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'hindi' | 'sanskrit' | 'english';
  tags: string[];
  requiresSubscription: 'free' | 'plus' | 'pro';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Mantras
interface MantraData {
  id: string;
  name: string;
  sanskrit: string;
  hindi: string;
  english: string;
  meaning: string;
  benefits: string[];
  duration: number;
  audioUrl: string;
  deity?: string;
  category: 'power' | 'peace' | 'prosperity' | 'health' | 'wisdom';
  requiresSubscription: 'free' | 'plus' | 'pro';
  createdAt: Date;
}

// Sessions
interface Session {
  id: string;
  name: string;
  description: string;
  duration: number;
  type: 'meditation' | 'breathing' | 'mantra' | 'music' | 'guided';
  trackIds: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  imageUrl: string;
  category: string;
  requiresSubscription: 'free' | 'plus' | 'pro';
  createdAt: Date;
}
```

#### 3. User Activity
```typescript
interface UserSession {
  id: string;
  userId: string;
  trackId: string;
  sessionId?: string;
  startTime: Date;
  endTime?: Date;
  completionPercentage: number;
  rating?: number;
  feedback?: string;
}

interface UserProgress {
  userId: string;
  trackId: string;
  completedAt: Date;
  sessionDuration: number;
  mood_before?: 'calm' | 'stressed' | 'anxious' | 'sad' | 'angry';
  mood_after?: 'calm' | 'stressed' | 'anxious' | 'sad' | 'angry';
}
```

## API Endpoints Design

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/profile
PUT  /api/auth/profile
```

### Content APIs
```
GET  /api/tracks?category=&difficulty=&language=
GET  /api/tracks/:id
GET  /api/mantras?category=
GET  /api/mantras/:id
GET  /api/sessions?category=
GET  /api/sessions/:id
GET  /api/categories
```

### User Progress
```
POST /api/user/sessions
GET  /api/user/progress
GET  /api/user/stats
POST /api/user/favorites/:trackId
DELETE /api/user/favorites/:trackId
```

### Content Management (Admin)
```
POST /api/admin/tracks
PUT  /api/admin/tracks/:id
DELETE /api/admin/tracks/:id
POST /api/admin/upload-audio
```

## Content Delivery Strategy

### Audio File Management:
1. **Storage**: Use CDN (CloudFront/CloudFlare) for fast audio delivery
2. **Formats**: Store multiple formats (MP3, AAC) for compatibility
3. **Quality**: Multiple bitrates (128kbps, 256kbps, 320kbps)
4. **Compression**: Use audio compression for mobile optimization

### Content Sources:
1. **Professional Recordings**: Hire meditation teachers and musicians
2. **Licensed Content**: Purchase rights to existing mantras/music
3. **Partnerships**: Collaborate with temples, ashrams, spiritual teachers
4. **AI-Generated**: Use AI for background music (with proper licensing)

## Implementation Steps

### Phase 1: MVP with Firebase
1. Set up Firebase project
2. Implement authentication
3. Create Firestore collections
4. Upload initial content (10-20 tracks)
5. Implement basic audio streaming

### Phase 2: Content Management
1. Build admin panel for content upload
2. Implement user progress tracking
3. Add favorites and playlist features
4. Push notifications for reminders

### Phase 3: Advanced Features
1. AI-powered recommendations
2. Social features (share achievements)
3. Advanced analytics
4. Subscription payment integration

## Cost Considerations

### Firebase Pricing (Free Tier):
- Authentication: 50,000 users/month
- Firestore: 1GB storage, 50K reads/day
- Storage: 5GB
- Hosting: 10GB transfer/month

### Scaling Costs:
- Audio storage: ~$0.02-0.05 per GB/month
- CDN delivery: ~$0.085-0.25 per GB
- Database: ~$0.06 per 100K document reads

## Security & Legal Considerations

1. **Content Rights**: Ensure all music/mantras are properly licensed
2. **Data Privacy**: GDPR/CCPA compliance for user data
3. **Audio Protection**: Implement DRM or streaming-only access
4. **User Safety**: Content warnings for intense practices
5. **Child Safety**: Age-appropriate content filtering

## Recommended MVP Implementation

Start with Firebase for rapid development:
1. 20-30 professionally recorded tracks
2. 5-10 mantra recordings with text
3. Basic user authentication
4. Simple progress tracking
5. Offline download capability

This approach mirrors Calm's successful model while being achievable for a startup budget.
