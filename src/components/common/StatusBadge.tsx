
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
  status: string;
  variant?: 'order' | 'picklist';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'order' }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'new':
        return '#3B82F6';
      case 'ready':
        return '#10B981';
      case 'open':
        return '#10B981';
      case 'completed':
        return '#6B7280';
      case 'in_progress':
      case 'in progress':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
