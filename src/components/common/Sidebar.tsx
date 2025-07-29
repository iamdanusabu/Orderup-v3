
import React from 'react';
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
import { useSidebar } from '../../contexts/SidebarContext';
import { Logo } from './Logo';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const isLargeScreen = width >= theme.breakpoints.tablet;
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  if (!isLargeScreen) {
    return (
      <View style={styles.mobileWrapper}>
        <SafeAreaView style={styles.mobileContainer} edges={['top']}>
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
        <SafeAreaView style={styles.mobileBottomSafeArea} edges={['bottom']} />
      </View>
    );
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
        <SafeAreaView style={styles.sidebarTopSafeArea} edges={['top']} />
        <View style={styles.sidebarContent}>
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
        <SafeAreaView style={styles.sidebarBottomSafeArea} edges={['bottom']} />
      </View>
      <View style={styles.content}>
        <SafeAreaView style={styles.contentTopSafeArea} edges={['top']} />
        <ScrollView 
          style={styles.contentScrollView}
          contentContainerStyle={styles.contentScrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        <SafeAreaView style={styles.contentBottomSafeArea} edges={['bottom']} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  mobileWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mobileBottomSafeArea: {
    backgroundColor: '#fff',
  },
  mobileScrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mobileScrollContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  sidebar: {
    backgroundColor: theme.colors.sidebar.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.sidebar.border,
  },
  sidebarTopSafeArea: {
    backgroundColor: '#fff',
  },
  sidebarBottomSafeArea: {
    backgroundColor: theme.colors.sidebar.background,
  },
  sidebarContent: {
    flex: 1,
    backgroundColor: theme.colors.sidebar.background,
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
    backgroundColor: '#fff',
  },
  contentTopSafeArea: {
    backgroundColor: '#fff',
  },
  contentBottomSafeArea: {
    backgroundColor: '#fff',
  },
  contentScrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentScrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
});
