import { useWindowDimensions } from 'react-native';
import { theme } from '../constants/theme';

export type DeviceType = 'phone' | 'tablet';

export const getDeviceType = (): DeviceType => {
  const { width } = useWindowDimensions();
  return width >= 768 ? 'tablet' : 'phone';
};

export const getResponsiveSpacing = (baseSpacing: number): number => {
  const deviceType = getDeviceType();
  return deviceType === 'tablet' ? baseSpacing * 1.2 : baseSpacing;
};

export const getResponsiveFontSize = (fontType: keyof typeof theme.typography) => {
  const deviceType = getDeviceType();
  const baseFontSize = theme.typography[fontType];

  switch (deviceType) {
    case 'tablet':
      return baseFontSize * 1.1;
    case 'phone':
    default:
      return baseFontSize;
  }
};