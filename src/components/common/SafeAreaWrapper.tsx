
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: any;
  addBottomPadding?: boolean;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ 
  children, 
  style,
  addBottomPadding = true 
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['left', 'right']}>
      <View style={[styles.content, addBottomPadding && styles.bottomPadding]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  bottomPadding: {
    paddingBottom: Platform.OS === 'android' ? theme.spacing.xl * 2 : theme.spacing.lg,
  },
});
