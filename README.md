# Kranti - Find Your Peace 🙏

A beautiful stress relief and meditation app with an authentic Indian touch, featuring sacred mantras, classical ragas, and guided meditation sessions.

## ✨ Features

### 🏠 **Home Screen**
- Daily inspirational quotes in Sanskrit, Hindi, and English
- Quick boost sessions (5-min energy, 3-min calm, instant focus)
- Beautiful gradients inspired by Indian sunsets
- Personal progress tracking with streak counters

### 🧘‍♀️ **Meditation Library**
- **Classical Ragas**: Traditional Indian music for deep meditation
- **Nature Sounds**: Sacred forests and peaceful environments
- **Guided Sessions**: Chakra balancing and spiritual growth
- **Instrumental**: Tabla, sitar, and other Indian instruments

### 🕉️ **Sacred Mantras**
- **Om Mantra**: The cosmic sound for universal peace
- **Gayatri Mantra**: Ancient prayer for wisdom and enlightenment
- **Mahamrityunjaya Mantra**: Healing and protection chant
- **Ganesha Mantra**: Remove obstacles and bring success
- **Hanuman Chalisa**: Build courage and inner strength

### 🎵 **Audio Player**
- Full-featured audio player with progress tracking
- Volume controls and repeat options
- Beautiful animated interface
- Background play support

### 👤 **Profile & Progress**
- Track meditation streaks and total practice time
- Unlock achievements on your spiritual journey
- Customize reminders and app settings
- View detailed session history

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kranti
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # For Android
   npm run android
   
   # For iOS (macOS only)
   npm run ios
   
   # For web browser
   npm run web
   ```

## 📱 Building for Production

### Android (APK/AAB)
```bash
# Build APK for testing
expo build:android

# Build AAB for Play Store
expo build:android --type app-bundle
```

### iOS (IPA)
```bash
# Build for App Store
expo build:ios
```

## 🎨 Design Philosophy

Kranti combines modern mobile app design with traditional Indian spiritual aesthetics:

- **Color Palette**: Warm oranges, calming blues, and spiritual purples
- **Typography**: Clean, readable fonts with Sanskrit/Devanagari support
- **Gradients**: Inspired by Indian sunrises and sunsets
- **Icons**: Material Design with spiritual symbolism
- **Animations**: Smooth, peaceful transitions

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript for type safety
- **Navigation**: React Navigation (Tab + Stack)
- **Audio**: Expo AV for music and mantra playback
- **UI**: Custom components with Expo Linear Gradient
- **Icons**: Material Icons and Expo Vector Icons
- **State**: React hooks for local state management

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
├── navigation/          # App navigation setup
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── MeditateScreen.tsx
│   ├── MantraScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SessionScreen.tsx
│   └── PlayerScreen.tsx
├── services/           # Business logic and APIs
│   └── AudioService.ts
├── data/              # Static content and data
│   └── content.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Helper functions
```

## 🌟 Key Screens

### Home Screen
- Personalized greeting (Subh Prabhat, Namaste, Shubh Sandhya)
- Rotating inspirational quotes from ancient texts
- Quick boost session cards
- Progress statistics

### Meditation Screen
- Category filters (Classical, Nature, Guided, Mantras)
- Beautiful session cards with gradients
- Track duration and difficulty levels
- Benefits preview

### Mantra Screen
- Sacred chant collection with detailed information
- Sanskrit, Hindi, and English translations
- Deity associations and spiritual meanings
- Practice benefits and guidance

### Player Screen
- Full-screen audio player with elegant design
- Progress visualization and time tracking
- Volume controls and playback options
- Track information and benefits

## 🎯 Target Features for Play Store

- [x] Beautiful, spiritual UI/UX design
- [x] Comprehensive meditation library
- [x] Sacred mantra collection with translations
- [x] Audio playback with background support
- [x] User progress tracking and achievements
- [x] Daily reminders and notifications
- [x] Offline content support
- [ ] User authentication and cloud sync
- [ ] Social sharing and community features
- [ ] Premium subscription with exclusive content
- [ ] Personalized recommendations

## 🔧 Configuration

### App Configuration
Edit `app.json` to customize:
- App name and description
- Icons and splash screen
- Permissions and capabilities
- Build settings

### Audio Content
Replace placeholder URLs in `src/data/content.ts` with actual audio files:
- Upload meditation tracks to a CDN
- Ensure proper audio format (MP3, M4A)
- Add appropriate metadata

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ancient Indian spiritual texts and traditions
- Indian classical music and raga system
- Meditation and mindfulness communities
- Open source React Native and Expo communities

## 📞 Support

For support and feedback:
- Email: support@kranti.app
- Website: www.kranti.app
- Follow us on social media for updates

---

*Made with 🙏 for your spiritual journey*

**Kranti** - Where ancient wisdom meets modern technology.
