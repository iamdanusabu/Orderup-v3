import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'medium' 
}) => {
  const logoStyles = [
    styles.container,
    styles[size],
    variant === 'light' && styles.lightVariant
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    variant === 'light' && styles.lightText
  ];

  return (
    <View style={logoStyles}>
      <Text style={textStyles}>OrderUp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  lightVariant: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.sm,
  },
  text: {
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  small: {
    minHeight: 24,
  },
  medium: {
    minHeight: 32,
  },
  large: {
    minHeight: 40,
  },
  smallText: {
    fontSize: 16,
  },
  mediumText: {
    fontSize: 20,
  },
  largeText: {
    fontSize: 24,
  },
  lightText: {
    color: '#FFFFFF',
  },
});