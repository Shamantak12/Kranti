// Kranti App - Enhanced UI Theme with Nature-Inspired Indian Fusion Design
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette - Nature-inspired with Indian spiritual colors
export const colors = {
  // Primary colors - inspired by Indian nature and spirituality
  primary: {
    lotus: '#F4A6CD', // Lotus pink
    saffron: '#FF9933', // Sacred saffron
    emerald: '#228B22', // Forest green
    indigo: '#4B0082', // Deep meditation indigo
    gold: '#FFD700', // Sacred gold
  },

  // Secondary colors - earth and sky tones
  secondary: {
    sunrise: '#FF6B6B', // Dawn colors
    sunset: '#FF8E53', // Dusk colors
    himalayan: '#87CEEB', // Sky blue
    ganges: '#20B2AA', // River teal
    earth: '#8B4513', // Sacred earth
  },

  // Background gradients
  gradients: {
    morning: ['#FFE4E1', '#FFB6C1', '#FFA0C9'] as const, // Soft pink dawn
    afternoon: ['#F0F8FF', '#E6E6FA', '#D8BFD8'] as const, // Light purple sky
    evening: ['#FF7F50', '#FF6347', '#DC143C'] as const, // Warm sunset
    night: ['#191970', '#483D8B', '#6A5ACD'] as const, // Deep night sky
    lotus: ['#FFE4E6', '#FFB3BA', '#FF69B4'] as const, // Lotus gradient
    forest: ['#98FB98', '#90EE90', '#32CD32'] as const, // Forest gradient
    ocean: ['#E0F6FF', '#87CEEB', '#4682B4'] as const, // Ocean gradient
    sacred: ['#FFE135', '#FFAA00', '#FF8C00'] as const, // Sacred fire gradient
  },

  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    cream: '#FFF8DC', // Warm cream
    lightGray: '#F5F5F5',
    gray: '#808080',
    darkGray: '#696969',
    charcoal: '#36454F',
    black: '#000000',
  },

  // Status colors
  status: {
    success: '#32CD32',
    warning: '#FFD700',
    error: '#DC143C',
    info: '#4682B4',
  },

  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.8)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.7)',
    sacred: 'rgba(255, 215, 0, 0.3)', // Golden overlay
  },
};

// Typography - Inspired by traditional Indian calligraphy
export const typography = {
  // Font families (you can replace with custom fonts)
  fonts: {
    regular: 'System', // Replace with custom font like 'Mukti' or 'Noto Sans Devanagari'
    medium: 'System', // Replace with medium weight
    bold: 'System', // Replace with bold weight
    light: 'System', // Replace with light weight
    sanskrit: 'System', // Replace with Sanskrit/Devanagari font
  },

  // Font sizes
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 36,
    '7xl': 42,
    '8xl': 48,
  },

  // Line heights
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadows - Enhanced for depth
export const shadows = {
  soft: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  sacred: {
    shadowColor: colors.primary.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

// Screen dimensions
export const dimensions = {
  width,
  height,
  isSmallDevice: width < 350,
  isMediumDevice: width >= 350 && width < 400,
  isLargeDevice: width >= 400,
};

// Component styles
export const componentStyles = {
  // Card styles
  card: {
    base: {
      backgroundColor: colors.neutral.white,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      ...shadows.medium,
    },
    elevated: {
      backgroundColor: colors.neutral.white,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      ...shadows.large,
    },
    sacred: {
      backgroundColor: colors.neutral.cream,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      ...shadows.sacred,
      borderWidth: 1,
      borderColor: colors.primary.gold,
    },
  },

  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary.saffron,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      ...shadows.medium,
    },
    secondary: {
      backgroundColor: colors.primary.emerald,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      ...shadows.soft,
    },
    sacred: {
      backgroundColor: colors.primary.gold,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      ...shadows.sacred,
    },
    outline: {
      backgroundColor: 'transparent',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      borderWidth: 2,
      borderColor: colors.primary.saffron,
    },
  },

  // Input styles
  input: {
    base: {
      backgroundColor: colors.neutral.white,
      borderWidth: 1,
      borderColor: colors.neutral.lightGray,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      fontSize: typography.sizes.base,
    },
    focused: {
      borderColor: colors.primary.saffron,
      ...shadows.soft,
    },
  },

  // Text styles
  text: {
    heading1: {
      fontSize: typography.sizes['6xl'],
      fontWeight: 'bold' as const,
      color: colors.neutral.charcoal,
      lineHeight: typography.lineHeights.tight * typography.sizes['6xl'],
    },
    heading2: {
      fontSize: typography.sizes['4xl'],
      fontWeight: 'bold' as const,
      color: colors.neutral.charcoal,
      lineHeight: typography.lineHeights.tight * typography.sizes['4xl'],
    },
    heading3: {
      fontSize: typography.sizes['2xl'],
      fontWeight: '600' as const,
      color: colors.neutral.charcoal,
      lineHeight: typography.lineHeights.normal * typography.sizes['2xl'],
    },
    body: {
      fontSize: typography.sizes.base,
      color: colors.neutral.darkGray,
      lineHeight: typography.lineHeights.normal * typography.sizes.base,
    },
    caption: {
      fontSize: typography.sizes.sm,
      color: colors.neutral.gray,
      lineHeight: typography.lineHeights.normal * typography.sizes.sm,
    },
    sanskrit: {
      fontSize: typography.sizes.lg,
      fontFamily: typography.fonts.sanskrit,
      color: colors.primary.saffron,
      textAlign: 'center' as const,
      lineHeight: typography.lineHeights.relaxed * typography.sizes.lg,
    },
  },
};

// Animation configurations
export const animations = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  easing: {
    linear: 'linear',
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
  },
};

// Layout configurations
export const layout = {
  header: {
    height: 60,
    paddingHorizontal: spacing.md,
  },
  tabBar: {
    height: 80,
    paddingBottom: spacing.sm,
  },
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
};

// Get time-based gradient
export const getTimeBasedGradient = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return colors.gradients.morning;
  } else if (hour >= 12 && hour < 17) {
    return colors.gradients.afternoon;
  } else if (hour >= 17 && hour < 21) {
    return colors.gradients.evening;
  } else {
    return colors.gradients.night;
  }
};

// Get mood-based gradient
export const getMoodGradient = (mood: string) => {
  switch (mood) {
    case 'peaceful':
      return colors.gradients.lotus;
    case 'energetic':
      return colors.gradients.sacred;
    case 'focused':
      return colors.gradients.forest;
    case 'relaxed':
      return colors.gradients.ocean;
    default:
      return getTimeBasedGradient();
  }
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  dimensions,
  componentStyles,
  animations,
  layout,
  getTimeBasedGradient,
  getMoodGradient,
};
