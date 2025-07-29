
import { Dimensions } from 'react-native';
import { theme } from '../constants/theme';

export interface DeviceType {
  width: number;
  height: number;
  isSmallScreen: boolean;
  isTablet: boolean;
  isLargeScreen: boolean;
}

export const getDeviceType = (): DeviceType => {
  const { width, height } = Dimensions.get('window');
  
  return {
    width,
    height,
    isSmallScreen: width < 400,
    isTablet: width >= 768 && width < 1024,
    isLargeScreen: width >= 1024,
  };
};

export const getResponsiveSpacing = (baseSpacing: number): number => {
  const deviceType = getDeviceType();
  
  if (deviceType.isSmallScreen) {
    return baseSpacing * 0.8;
  } else if (deviceType.isTablet) {
    return baseSpacing * 1.2;
  } else if (deviceType.isLargeScreen) {
    return baseSpacing * 1.4;
  }
  
  return baseSpacing;
};

export const getResponsiveFontSize = (fontType: keyof typeof theme.typography): number => {
  const deviceType = getDeviceType();
  const baseFontSize = theme.typography[fontType];
  
  if (deviceType.isSmallScreen) {
    return baseFontSize * 0.9;
  } else if (deviceType.isTablet) {
    return baseFontSize * 1.1;
  } else if (deviceType.isLargeScreen) {
    return baseFontSize * 1.2;
  }
  
  return baseFontSize;
};
