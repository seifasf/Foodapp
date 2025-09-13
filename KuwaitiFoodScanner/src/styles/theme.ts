import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Phase 1: Grayscale theme (no colors as requested)
    primary: '#424242', // Dark gray
    secondary: '#616161', // Medium gray
    accent: '#757575', // Light gray
    background: '#FAFAFA', // Very light gray
    surface: '#FFFFFF', // White
    text: '#212121', // Dark gray
    onSurface: '#000000', // Black
    disabled: '#BDBDBD', // Light gray
    placeholder: '#9E9E9E', // Medium gray
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#424242', // Dark gray
    white: '#FFFFFF',
    black: '#000000',
    gray: '#757575',
    lightGray: '#E0E0E0',
    darkGray: '#424242',
    success: '#424242', // Dark gray (was green)
    warning: '#616161', // Medium gray (was orange)
    error: '#212121', // Dark gray (was red)
    info: '#757575', // Light gray (was blue)
    // Health score colors - all grayscale
    healthScoreA: '#424242', // Dark gray
    healthScoreB: '#616161', // Medium gray
    healthScoreC: '#757575', // Light gray
    healthScoreD: '#9E9E9E', // Lighter gray
    healthScoreE: '#BDBDBD', // Lightest gray
    // Halal status - all grayscale
    halal: '#424242', // Dark gray
    haram: '#212121', // Darker gray
    unknown: '#757575', // Medium gray
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as const,
    },
  },
  roundness: 8,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

export const layout = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  spaceBetween: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  center: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
};
