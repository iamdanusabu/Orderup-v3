import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { theme } from '../../constants/theme';
import { getDeviceType, getResponsiveSpacing } from '../../utils/responsive';
import { useSidebar } from '../../contexts/SidebarContext';
import { Logo } from './Logo';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const deviceType = getDeviceType();
  const isLargeScreen = width >= theme.breakpoints.tablet;
  const isLandscape = width > height;
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  if (!isLargeScreen) {
    return (
      <SafeAreaView style={styles.mobileContainer} edges={['left', 'right', 'bottom']}>
        <ScrollView 
          style={styles.mobileScrollView}
          contentContainerStyle={styles.mobileScrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home-outline' },
    { name: 'Orders', path: '/orders', icon: 'list-outline' },
    { name: 'Picklists', path: '/picklists', icon: 'checkmark-circle-outline' },
  ];

  const sidebarWidth = isCollapsed ? 80 : 240;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={[styles.sidebar, { width: sidebarWidth }]}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Logo width={isCollapsed ? 24 : 32} height={isCollapsed ? 24 : 32} />
              {!isCollapsed && <Text style={styles.logoText}>Orderup</Text>}
            </View>
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
        <ScrollView 
          style={styles.contentScrollView}
          contentContainerStyle={styles.contentScrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mobileScrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mobileScrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl + theme.spacing.lg,
    minHeight: '100%',
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  logoText: {
    fontSize: 20,
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
    fontSize: theme.typography.fontSize,
    color: theme.colors.sidebar.text,
  },
  activeMenuText: {
    color: theme.colors.sidebar.activeText,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentScrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentScrollContainer: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl + theme.spacing.lg,
    minHeight: '100%',
  },
});