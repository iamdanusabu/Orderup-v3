
import { Dimensions } from 'react-native';
import { theme } from '../constants/theme';

export type DeviceType = 'phone' | 'tablet';

export const getDeviceType = (width?: number): DeviceType => {
  const screenWidth = width || Dimensions.get('window').width;
  return screenWidth >= 768 ? 'tablet' : 'phone';
};

export const getResponsiveSpacing = (baseSpacing: number, width?: number): number => {
  const deviceType = getDeviceType(width);
  return deviceType === 'tablet' ? baseSpacing * 1.2 : baseSpacing;
};

export const getResponsiveFontSize = (baseFontSize: number, width?: number): number => {
  const deviceType = getDeviceType(width);
  return deviceType === 'tablet' ? baseFontSize * 1.1 : baseFontSize;
};

// Hook versions for use in components
export const useResponsiveSpacing = (baseSpacing: number): number => {
  const { width } = require('react-native').useWindowDimensions();
  return getResponsiveSpacing(baseSpacing, width);
};

export const useResponsiveFontSize = (baseFontSize: number): number => {
  const { width } = require('react-native').useWindowDimensions();
  return getResponsiveFontSize(baseFontSize, width);
};

export const useDeviceType = (): DeviceType => {
  const { width } = require('react-native').useWindowDimensions();
  return getDeviceType(width);
};
