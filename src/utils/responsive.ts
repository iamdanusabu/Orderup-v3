
import { Dimensions } from 'react-native';
import { theme } from '../constants/theme';

export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

export const getDeviceType = () => {
  const { width } = getScreenDimensions();
  
  if (width < theme.breakpoints.mobile) {
    return 'small-mobile';
  } else if (width < theme.breakpoints.tablet) {
    return 'mobile';
  } else if (width < theme.breakpoints.desktop) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export const isTablet = () => {
  const deviceType = getDeviceType();
  return deviceType === 'tablet';
};

export const isMobile = () => {
  const deviceType = getDeviceType();
  return deviceType === 'mobile' || deviceType === 'small-mobile';
};

export const isDesktop = () => {
  const deviceType = getDeviceType();
  return deviceType === 'desktop';
};

export const getResponsiveSpacing = (baseSpacing: keyof typeof theme.spacing) => {
  const deviceType = getDeviceType();
  const base = theme.spacing[baseSpacing];
  
  switch (deviceType) {
    case 'small-mobile':
      return base * 0.8;
    case 'mobile':
      return base;
    case 'tablet':
      return base * 1.2;
    case 'desktop':
      return base * 1.4;
    default:
      return base;
  }
};

export const getResponsiveFontSize = (fontType: 'small' | 'body' | 'h1' | 'h2' | 'h3') => {
  const deviceType = getDeviceType();
  
  // Base font sizes
  const baseFontSizes = {
    small: 12,
    body: 16,
    h1: 24,
    h2: 20,
    h3: 18,
  };
  
  const baseFontSize = baseFontSizes[fontType];
  
  switch (deviceType) {
    case 'small-mobile':
      return baseFontSize * 0.9;
    case 'mobile':
      return baseFontSize;
    case 'tablet':
      return baseFontSize * 1.1;
    case 'desktop':
      return baseFontSize * 1.2;
    default:
      return baseFontSize;
  }
};

export const getResponsiveFontSize = (fontType: keyof typeof theme.typography) => {
  const deviceType = getDeviceType();
  const baseFontSize = theme.typography[fontType];
  
  switch (deviceType) {
    case 'small-mobile':
      return baseFontSize * 0.9;
    case 'mobile':
      return baseFontSize;
    case 'tablet':
      return baseFontSize * 1.1;
    case 'desktop':
      return baseFontSize * 1.2;
    default:
      return baseFontSize;
  }
};
