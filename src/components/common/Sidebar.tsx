
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { theme } from '../../constants/theme';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();
  const isLargeScreen = width >= 768;
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isLargeScreen) {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home-outline' },
    { name: 'Orders', path: '/orders', icon: 'list-outline' },
    { name: 'Picklists', path: '/picklists', icon: 'checkmark-circle-outline' },
  ];

  const sidebarWidth = isCollapsed ? 80 : 240;

  return (
    <View style={styles.container}>
      <View style={[styles.sidebar, { width: sidebarWidth }]}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {!isCollapsed && <Text style={styles.logo}>Orderup</Text>}
            <TouchableOpacity
              style={styles.collapseButton}
              onPress={() => setIsCollapsed(!isCollapsed)}
            >
              <Ionicons 
                name={isCollapsed ? 'chevron-forward-outline' : 'chevron-back-outline'} 
                size={20} 
                color={theme.colors.sidebar.text} 
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.path}
              style={[
                styles.menuItem,
                pathname === item.path && styles.activeMenuItem,
                isCollapsed && styles.collapsedMenuItem
              ]}
              onPress={() => router.push(item.path as any)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={pathname === item.path ? theme.colors.sidebar.activeText : theme.colors.sidebar.text} 
              />
              {!isCollapsed && (
                <Text style={[
                  styles.menuText,
                  pathname === item.path && styles.activeMenuText
                ]}>
                  {item.name}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    backgroundColor: theme.colors.sidebar.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.sidebar.border,
    transition: 'width 0.3s ease',
  },
  header: {
    padding: theme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.sidebar.activeText,
  },
  collapseButton: {
    padding: theme.spacing.xs,
  },
  menu: {
    padding: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  collapsedMenuItem: {
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  activeMenuItem: {
    backgroundColor: theme.colors.sidebar.activeBackground,
  },
  menuText: {
    marginLeft: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.sidebar.text,
  },
  activeMenuText: {
    color: theme.colors.sidebar.activeText,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
