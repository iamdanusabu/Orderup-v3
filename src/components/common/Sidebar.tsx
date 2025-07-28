
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();
  const isLargeScreen = width >= 768;

  if (!isLargeScreen) {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home-outline' },
    { name: 'Orders', path: '/orders', icon: 'list-outline' },
    { name: 'Picklists', path: '/picklists', icon: 'checkmark-circle-outline' },
    { name: 'Scan', path: '/scan', icon: 'qr-code-outline' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.logo}>Orderup</Text>
        </View>
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.path}
              style={[
                styles.menuItem,
                pathname === item.path && styles.activeMenuItem
              ]}
              onPress={() => router.push(item.path as any)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={pathname === item.path ? '#1B365D' : '#6B7280'} 
              />
              <Text style={[
                styles.menuText,
                pathname === item.path && styles.activeMenuText
              ]}>
                {item.name}
              </Text>
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
    width: 240,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  menu: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: '#F3F4F6',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  activeMenuText: {
    color: '#1B365D',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
