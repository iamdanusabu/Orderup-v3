
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

export const getResponsiveSpacing = (size: keyof typeof theme.spacing) => {
  const deviceType = getDeviceType();
  const baseSpacing = theme.spacing[size];

  switch (deviceType) {
    case 'desktop':
      return baseSpacing * 1.2;
    case 'tablet':
      return baseSpacing * 1.1;
    default:
      return baseSpacing;
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

export const getResponsiveFontSize = () => {
  return 16;
};
