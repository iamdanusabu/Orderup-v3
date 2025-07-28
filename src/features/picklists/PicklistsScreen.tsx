
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
];

export const PicklistsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [picklists] = useState(mockPicklists);

  const handleScan = () => {
    console.log('Open camera scanner');
  };

  const filteredPicklists = picklists.filter(picklist => {
    const matchesSearch = picklist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      picklist.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'pending') return matchesSearch && picklist.status === 'Pending';
    if (activeFilter === 'in-progress') return matchesSearch && picklist.status === 'In Progress';
    if (activeFilter === 'completed') return matchesSearch && picklist.status === 'Completed';
    
    return matchesSearch;
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
        showBack={true}
        onScanPress={handleScan}
      />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color={theme.colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search picklists..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color={theme.colors.text.primary} />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {filterTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.filterTab,
              activeFilter === tab.id && styles.activeFilterTab
            ]}
            onPress={() => setActiveFilter(tab.id)}
          >
            <Text style={[
              styles.filterTabText,
              activeFilter === tab.id && styles.activeFilterTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  filterButtonText: {
    color: theme.colors.text.primary,
    fontWeight: '500',
    fontSize: 14,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterTab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  activeFilterTabText: {
    color: '#FFFFFF',
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
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  assignedTo: {
    fontSize: 14,
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
});
