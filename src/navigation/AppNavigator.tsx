// Kranti App - Navigation Setup with Spiritual Design
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MindScreen from '../screens/MindScreen';
import PhysicScreen from '../screens/PhysicScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SessionScreen from '../screens/SessionScreen';
import PlayerScreen from '../screens/PlayerScreen';
import KrantiYogiScreen from '../screens/KrantiYogiScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

// Custom Yogi Tab Button Component
const YogiTabButton = ({ onPress, focused }: { onPress: (e: any) => void; focused: boolean }) => (
  <TouchableOpacity
    style={styles.yogiButton}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <LinearGradient
      colors={focused ? ['#FF6B6B', '#4ECDC4'] : ['#667eea', '#764ba2']}
      style={styles.yogiButtonGradient}
    >
      <View style={styles.yogiButtonInner}>
        <Ionicons 
          name="person" 
          size={28} 
          color="#FFFFFF" 
        />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

// Tab Navigator Component
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Mind') {
            iconName = 'library-outline';
          } else if (route.name === 'KrantiYogi') {
            return null; // Custom button handles this
          } else if (route.name === 'Physic') {
            iconName = 'fitness-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? iconName.replace('-outline', '') as keyof typeof Ionicons.glyphMap : iconName} 
                size={focused ? 26 : 24} 
                color={focused ? '#667eea' : '#9CA3AF'} 
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: 'rgba(0,0,0,0.1)',
          borderTopWidth: 0.5,
          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: '#374151',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#374151',
        },
        tabBarButton: route.name === 'KrantiYogi' 
          ? (props) => (
              <YogiTabButton 
                onPress={props.onPress || (() => {})} 
                focused={props.accessibilityState?.selected || false}
              />
            )
          : undefined,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Home',
          headerTitle: 'Kranti - Find Your Peace',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Mind" 
        component={MindScreen} 
        options={{
          title: 'Mind',
          headerTitle: 'Mind & Spirit',
          tabBarLabel: 'Mind',
        }}
      />
      <Tab.Screen 
        name="KrantiYogi" 
        component={KrantiYogiScreen} 
        options={{
          title: 'Yogi',
          headerTitle: 'Kranti Yogi',
          tabBarLabel: 'Yogi',
        }}
      />
      <Tab.Screen 
        name="Physic" 
        component={PhysicScreen} 
        options={{
          title: 'Physic',
          headerTitle: 'Body & Movement',
          tabBarLabel: 'Physic',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
          headerTitle: 'Your Journey',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Main Navigation Component
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen 
          name="Session" 
          component={SessionScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: '#ffffff',
            headerTitle: 'Meditation Session',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Player" 
          component={PlayerScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#ffffff',
            headerTitle: 'Now Playing',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yogiButton: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yogiButtonGradient: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  yogiButtonInner: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
