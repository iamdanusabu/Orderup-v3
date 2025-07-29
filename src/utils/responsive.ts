import { useWindowDimensions } from 'react-native';
import { theme } from '../constants/theme';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const getDeviceType = (): DeviceType => {
  const { width } = useWindowDimensions();

  if (width < theme.breakpoints.mobile) {
    return 'mobile';
  } else if (width < theme.breakpoints.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export const getResponsiveSpacing = (spacing: keyof typeof theme.spacing) => {
  const deviceType = getDeviceType();
  const baseSpacing = theme.spacing[spacing];

  switch (deviceType) {
    case 'mobile':
      return baseSpacing;
    case 'tablet':
      return baseSpacing * 1.2;
    case 'desktop':
      return baseSpacing * 1.4;
    default:
      return baseSpacing;
  }
};

export const getResponsiveFontSize = (baseSize: number) => {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case 'mobile':
      return baseSize;
    case 'tablet':
      return baseSize * 1.1;
    case 'desktop':
      return baseSize * 1.2;
    default:
      return baseSize;
  }
};