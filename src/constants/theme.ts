
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    sidebar: {
      background: string;
      text: string;
      activeBackground: string;
      activeText: string;
      border: string;
    };
    toolbar: {
      background: string;
      text: string;
      border: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#1B365D',
    secondary: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
    },
    border: '#E5E7EB',
    accent: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    sidebar: {
      background: '#2D3748',
      text: '#A0AEC0',
      activeBackground: '#4A5568',
      activeText: '#FFFFFF',
      border: '#4A5568',
    },
    toolbar: {
      background: '#2D3748',
      text: '#FFFFFF',
      border: '#4A5568',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#60A5FA',
    secondary: '#9CA3AF',
    background: '#111827',
    surface: '#1F2937',
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      tertiary: '#9CA3AF',
    },
    border: '#374151',
    accent: '#60A5FA',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    sidebar: {
      background: '#1F2937',
      text: '#D1D5DB',
      activeBackground: '#374151',
      activeText: '#FFFFFF',
      border: '#374151',
    },
    toolbar: {
      background: '#1F2937',
      text: '#FFFFFF',
      border: '#374151',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};

// For now, we'll use light theme as default
export const theme = lightTheme;
