
import { Dimensions, Platform } from 'react-native';
import { theme } from '../constants/theme';

export const getScreenDimensions = () => {
  return Dimensions.get('window');
};

export const isTablet = () => {
  const { width, height } = getScreenDimensions();
  const aspectRatio = width / height;
  
  if (Platform.OS === 'ios') {
    return width >= 768;
  }
  
  // Android tablets typically have larger screens and different aspect ratios
  return width >= 600 && (aspectRatio > 1.2 || aspectRatio < 0.9);
};

export const isLandscape = () => {
  const { width, height } = getScreenDimensions();
  return width > height;
};

export const getDeviceType = () => {
  const { width } = getScreenDimensions();
  
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
};

export const getResponsiveSpacing = (spacing: keyof typeof theme.spacing) => {
  const deviceType = getDeviceType();
  const baseSpacing = theme.spacing[spacing];
  
  switch (deviceType) {
    case 'desktop':
      return baseSpacing * 1.5;
    case 'tablet':
      return baseSpacing * 1.25;
    default:
      return baseSpacing;
  }
};

export const getResponsiveFontSize = (fontType: keyof typeof theme.typography) => {
  const deviceType = getDeviceType();
  const baseFontSize = theme.typography[fontType];
  
  switch (deviceType) {
    case 'desktop':
      return baseFontSize * 1.2;
    case 'tablet':
      return baseFontSize * 1.1;
    default:
      return baseFontSize;
  }
};
