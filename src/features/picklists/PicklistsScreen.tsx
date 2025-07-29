import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Toolbar } from '../../components/common/Toolbar';
import { theme } from '../../constants/theme';

// Mock data
const mockPicklists = [
  {
    id: '1',
    name: 'Picklist #001',
    progress: 53,
    assignedTo: 'John Doe',
    status: 'In Progress' as const,
    orders: ['#12345', '#12346'],
    picked: 5,
    total: 15,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    name: 'Picklist #002',
    progress: 0,
    assignedTo: 'Jane Smith',
    status: 'Pending' as const,
    orders: ['#12347'],
    picked: 0,
    total: 8,
    createdAt: '1 hour ago',
  },
  {
    id: '3',
    name: 'Picklist #003',
    progress: 100,
    assignedTo: 'Bob Wilson',
    status: 'Completed' as const,
    orders: ['#12348', '#12349', '#12350'],
    picked: 12,
    total: 12,
    createdAt: '30 min ago',
  },
];

export const PicklistsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [picklists] = useState(mockPicklists);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleScan = () => {
    console.log('Open camera scanner');
  };

  const filteredPicklists = picklists.filter(picklist => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Assigned to me') return picklist.assignedTo === 'John Doe'; // Mock current user
    if (activeFilter === 'Not assigned to me') return picklist.assignedTo !== 'John Doe'; // Mock current user
    return true;
  });

  const renderPicklistCard = ({ item }: { item: any }) => (
    <Card style={styles.picklistCard}>
      <View style={styles.cardHeader}>
        <View style={styles.picklistInfo}>
          <Text style={styles.picklistName}>{item.name}</Text>
          <Text style={styles.assignedTo}>Assigned to {item.assignedTo}</Text>
          <Text style={styles.itemsInfo}>{item.picked}/{item.total} items picked</Text>
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge status={item.status} />
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${item.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressPercentage}>{item.progress}%</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderLabel}>Orders: </Text>
        <Text style={styles.orderNumbers}>{item.orders.join(' ')}</Text>
      </View>

      <Button
        title={item.status === 'Pending' ? 'Start Picking' : 'Continue Picking'}
        onPress={() => console.log('Action on picklist', item.id)}
        variant="primary"
        style={styles.actionButton}
      />
    </Card>
  );

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Picklists" 
        showBack={false}
        onScanPress={handleScan}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'All' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('All')}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'All' && styles.activeFilterButtonText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Assigned to me' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('Assigned to me')}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'Assigned to me' && styles.activeFilterButtonText]}>
            Assigned to me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Not assigned to me' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('Not assigned to me')}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'Not assigned to me' && styles.activeFilterButtonText]}>
            Not assigned to me
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredPicklists.map((picklist) => (
          <View key={picklist.id}>
            {renderPicklistCard({ item: picklist })}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return <Sidebar>{content}</Sidebar>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  picklistCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  picklistInfo: {
    flex: 1,
  },
  picklistName: {
    fontSize: theme.typography.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  assignedTo: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  itemsInfo: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    minWidth: 35,
    textAlign: 'right',
  },
  orderInfo: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  orderLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  orderNumbers: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  actionButton: {
    marginTop: theme.spacing.sm,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
});