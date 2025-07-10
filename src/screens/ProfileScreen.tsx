// Kranti App - Profile Screen with User Progress
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps } from '../types';

const { width } = Dimensions.get('window');

interface ProfileScreenProps extends NavigationProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mock user data
  const userData = {
    name: 'Devotee',
    email: 'peace@kranti.app',
    joinDate: 'January 2024',
    totalSessions: 45,
    totalMinutes: 1260, // 21 hours
    streakDays: 12,
    favoriteCategory: 'Classical',
    completedTracks: 28,
    level: 'Intermediate Practitioner',
  };

  const achievements = [
    { id: 1, name: 'First Step', description: 'Completed your first session', icon: 'emoji-events', earned: true },
    { id: 2, name: 'Consistent Soul', description: '7-day meditation streak', icon: 'local-fire-department', earned: true },
    { id: 3, name: 'Mantra Master', description: 'Completed 10 mantra sessions', icon: 'self-improvement', earned: true },
    { id: 4, name: 'Peace Seeker', description: '20 hours of meditation', icon: 'spa', earned: true },
    { id: 5, name: 'Devoted Practitioner', description: '30-day streak', icon: 'star', earned: false },
    { id: 6, name: 'Inner Warrior', description: 'Completed all power mantras', icon: 'shield', earned: false },
  ];

  const recentSessions = [
    { name: 'Om Mantra Meditation', date: 'Today', duration: 15 },
    { name: 'Gayatri Mantra', date: 'Yesterday', duration: 10 },
    { name: 'Stress Relief Session', date: '2 days ago', duration: 30 },
    { name: 'Morning Energy', date: '3 days ago', duration: 20 },
  ];

  const renderStatsCard = (title: string, value: string, subtitle: string, icon: string, color: string) => (
    <View style={[styles.statsCard, { borderLeftColor: color }]}>
      <MaterialIcons name={icon as any} size={32} color={color} />
      <View style={styles.statsContent}>
        <Text style={styles.statsValue}>{value}</Text>
        <Text style={styles.statsTitle}>{title}</Text>
        <Text style={styles.statsSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );

  const renderAchievement = (achievement: any) => (
    <TouchableOpacity 
      key={achievement.id} 
      style={[styles.achievementCard, !achievement.earned && styles.lockedAchievement]}
      onPress={() => {
        if (achievement.earned) {
          Alert.alert(
            achievement.name,
            achievement.description,
            [{ text: 'OK', style: 'default' }]
          );
        } else {
          Alert.alert(
            'Keep Going!',
            `Complete this to unlock: ${achievement.description}`,
            [{ text: 'OK', style: 'default' }]
          );
        }
      }}
    >
      <MaterialIcons 
        name={achievement.icon as any} 
        size={40} 
        color={achievement.earned ? '#F39C12' : '#bdc3c7'} 
      />
      <View style={styles.achievementText}>
        <Text style={[styles.achievementName, !achievement.earned && styles.lockedText]}>
          {achievement.name}
        </Text>
        <Text style={[styles.achievementDescription, !achievement.earned && styles.lockedText]}>
          {achievement.description}
        </Text>
      </View>
      {achievement.earned && (
        <MaterialIcons name="check-circle" size={24} color="#27AE60" />
      )}
    </TouchableOpacity>
  );

  const renderRecentSession = (session: any, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.sessionItem}
      onPress={() => {
        // Navigate to session replay
        navigation.navigate('Session', {
          session: {
            id: `recent_${index}`,
            name: session.name,
            description: `Replay your ${session.name} session`,
            duration: session.duration * 60,
            type: 'meditation',
            tracks: ['om_chanting'],
            difficulty: 'beginner',
            benefits: ['Stress relief', 'Mental clarity'],
            imageUrl: '',
            category: 'stress_relief'
          }
        });
      }}
    >
      <MaterialIcons name="play-circle-filled" size={24} color="#667eea" />
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionName}>{session.name}</Text>
        <Text style={styles.sessionDate}>{session.date} • {session.duration} min</Text>
      </View>
      <MaterialIcons name="replay" size={20} color="#95a5a6" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerSection}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={50} color="white" />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userLevel}>{userData.level}</Text>
          <Text style={styles.joinDate}>Journey started {userData.joinDate}</Text>
        </View>
      </LinearGradient>

      {/* Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Journey Stats</Text>
        
        <View style={styles.statsGrid}>
          {renderStatsCard(
            'Total Sessions',
            userData.totalSessions.toString(),
            'meditation experiences',
            'self-improvement',
            '#E74C3C'
          )}
          
          {renderStatsCard(
            'Time Practiced',
            `${Math.floor(userData.totalMinutes / 60)}h ${userData.totalMinutes % 60}m`,
            'of inner peace',
            'timer',
            '#3498DB'
          )}
          
          {renderStatsCard(
            'Current Streak',
            `${userData.streakDays} days`,
            'consecutive practice',
            'local-fire-department',
            '#F39C12'
          )}
          
          {renderStatsCard(
            'Tracks Completed',
            userData.completedTracks.toString(),
            'different experiences',
            'library-music',
            '#27AE60'
          )}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Text style={styles.sectionSubtitle}>Milestones on your spiritual journey</Text>
        
        {achievements.map(renderAchievement)}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        
        {recentSessions.map(renderRecentSession)}
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Mind')}
        >
          <Text style={styles.viewAllText}>View All Sessions</Text>
          <MaterialIcons name="arrow-forward" size={16} color="#667eea" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={[styles.quickActionCard, { backgroundColor: '#667eea' }]}
            onPress={() => navigation.navigate('Mind')}
          >
            <MaterialIcons name="self-improvement" size={32} color="white" />
            <Text style={styles.quickActionText}>Start Session</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionCard, { backgroundColor: '#f093fb' }]}
            onPress={() => navigation.navigate('Physic')}
          >
            <MaterialIcons name="fitness-center" size={32} color="white" />
            <Text style={styles.quickActionText}>Yoga Practice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionCard, { backgroundColor: '#4facfe' }]}
            onPress={() => navigation.navigate('KrantiYogi')}
          >
            <MaterialIcons name="chat" size={32} color="white" />
            <Text style={styles.quickActionText}>Ask Yogi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionCard, { backgroundColor: '#FF6B35' }]}
            onPress={() => navigation.navigate('Session', { 
              session: { 
                id: 'quick_calm', 
                name: 'Quick Calm', 
                description: 'Instant stress relief',
                duration: 300,
                type: 'meditation',
                tracks: ['om_chanting'],
                difficulty: 'beginner',
                benefits: ['Stress relief', 'Mental clarity'],
                imageUrl: '',
                category: 'stress_relief'
              }
            })}
          >
            <MaterialIcons name="flash-on" size={32} color="white" />
            <Text style={styles.quickActionText}>Quick Relief</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialIcons name="notifications" size={24} color="#7f8c8d" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Daily Reminders</Text>
              <Text style={styles.settingSubtitle}>Get reminded to practice</Text>
            </View>
          </View>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ false: '#e0e0e0', true: '#FF6B35' }}
            thumbColor={reminderEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialIcons name="volume-up" size={24} color="#7f8c8d" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Sound Effects</Text>
              <Text style={styles.settingSubtitle}>Bell sounds and ambient audio</Text>
            </View>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#e0e0e0', true: '#FF6B35' }}
            thumbColor={soundEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => {
            // TODO: Implement reminder time picker
            console.log('Set reminder time pressed');
            // You can add a time picker modal here
          }}
        >
          <MaterialIcons name="schedule" size={24} color="#7f8c8d" />
          <Text style={styles.settingButtonText}>Set Reminder Time</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#bdc3c7" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => {
            // TODO: Implement offline download
            console.log('Download for offline pressed');
            // You can add download functionality here
          }}
        >
          <MaterialIcons name="download" size={24} color="#7f8c8d" />
          <Text style={styles.settingButtonText}>Download for Offline</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#bdc3c7" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => {
            // TODO: Implement share functionality
            console.log('Share Kranti pressed');
            // You can add share functionality here
          }}
        >
          <MaterialIcons name="share" size={24} color="#7f8c8d" />
          <Text style={styles.settingButtonText}>Share Kranti</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#bdc3c7" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => {
            // TODO: Navigate to help screen
            console.log('Help & Support pressed');
            // You can navigate to a help screen here
          }}
        >
          <MaterialIcons name="help" size={24} color="#7f8c8d" />
          <Text style={styles.settingButtonText}>Help & Support</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#bdc3c7" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingButton, { backgroundColor: '#FFE6E6' }]}
          onPress={() => {
            // TODO: Navigate to subscription screen
            console.log('Upgrade to Premium pressed');
            // You can navigate to a subscription screen here
          }}
        >
          <MaterialIcons name="star" size={24} color="#FF6B35" />
          <Text style={[styles.settingButtonText, { color: '#FF6B35', fontWeight: 'bold' }]}>Upgrade to Premium</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.appInfo}>
          <Text style={styles.appName}>Kranti - Find Your Peace</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Made with 🙏 for your spiritual journey
          </Text>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  statsGrid: {
    marginTop: 10,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  statsContent: {
    marginLeft: 15,
    flex: 1,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 2,
  },
  statsSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementText: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  lockedText: {
    color: '#bdc3c7',
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  sessionInfo: {
    marginLeft: 15,
    flex: 1,
  },
  sessionName: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginRight: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    marginLeft: 15,
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  appDescription: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quickActionCard: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ProfileScreen;
