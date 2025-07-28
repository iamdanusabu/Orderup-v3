import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

interface ToolbarProps {
  title: string;
  onScanPress?: () => void;
  showNotification?: boolean;
  notificationCount?: number;
  onMenuPress?: () => void;
  showMenuButton?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ 
  title, 
  onScanPress, 
  showNotification = false, 
  notificationCount = 0,
  onMenuPress,
  showMenuButton = false
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.toolbar}>
        <View style={styles.leftSection}>
          {showMenuButton && (
            <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
              <Ionicons name="menu-outline" size={24} color={theme.colors.toolbar.text} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.actions}>
          {showNotification && (
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color={theme.colors.toolbar.text} />
              {notificationCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.iconButton} onPress={onScanPress}>
            <Ionicons name="qr-code-outline" size={24} color={theme.colors.toolbar.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="exit-outline" size={24} color={theme.colors.toolbar.text} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.toolbar.background,
  },
  toolbar: {
    backgroundColor: theme.colors.toolbar.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.toolbar.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.toolbar.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    position: 'relative',
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});