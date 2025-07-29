
import { useWindowDimensions } from 'react-native';
import { theme } from '../constants/theme';

export type DeviceType = 'phone' | 'tablet' | 'desktop';

export const useDeviceType = (): DeviceType => {
  const { width } = useWindowDimensions();
  
  if (width < theme.breakpoints.tablet) {
    return 'phone';
  } else if (width < theme.breakpoints.desktop) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export const getDeviceType = (width: number): DeviceType => {
  if (width < theme.breakpoints.tablet) {
    return 'phone';
  } else if (width < theme.breakpoints.desktop) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export const getResponsiveSpacing = (baseSpacing: number, deviceType: DeviceType): number => {
  switch (deviceType) {
    case 'phone':
      return baseSpacing;
    case 'tablet':
      return baseSpacing * 1.2;
    case 'desktop':
      return baseSpacing * 1.4;
    default:
      return baseSpacing;
  }
};

export const getResponsiveColumns = (deviceType: DeviceType): number => {
  switch (deviceType) {
    case 'phone':
      return 1;
    case 'tablet':
      return 2;
    case 'desktop':
      return 3;
    default:
      return 1;
  }
};

export const getResponsiveFontSize = (fontType: keyof typeof theme.typography, deviceType: DeviceType): number => {
  const baseFontSize = theme.typography[fontType];
  
  switch (deviceType) {
    case 'phone':
      return baseFontSize;
    case 'tablet':
      return baseFontSize * 1.1;
    case 'desktop':
      return baseFontSize * 1.2;
    default:
      return baseFontSize;
  }
};
