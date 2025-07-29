
import { Dimensions } from 'react-native';
import { theme } from '../constants/theme';

export const getDeviceType = () => {
  const { width } = Dimensions.get('window');
  
  if (width >= theme.breakpoints.desktop) {
    return 'desktop';
  } else if (width >= theme.breakpoints.tablet) {
    return 'tablet';
  } else {
    return 'mobile';
  }
};

export const getResponsiveSpacing = (baseSpacing: keyof typeof theme.spacing) => {
  const deviceType = getDeviceType();
  const baseValue = theme.spacing[baseSpacing];
  
  switch (deviceType) {
    case 'desktop':
      return baseValue * 1.2;
    case 'tablet':
      return baseValue * 1.1;
    default:
      return baseValue;
  }
};

export const getResponsiveWidth = (percentage: number) => {
  const { width } = Dimensions.get('window');
  return (width * percentage) / 100;
};

export const getResponsiveHeight = (percentage: number) => {
  const { height } = Dimensions.get('window');
  return (height * percentage) / 100;
};

export const getResponsiveFontSize = (baseSize: number = 16) => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'desktop':
      return baseSize * 1.1;
    case 'tablet':
      return baseSize * 1.05;
    default:
      return baseSize;
  }
};
