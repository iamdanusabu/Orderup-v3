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
    progress: 75,
    assignedTo: 'Alice Brown',
    status: 'In Progress' as const,
    orders: 5,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    name: 'Picklist #002',
    progress: 50,
    assignedTo: 'Charlie Davis',
    status: 'In Progress' as const,
    orders: 3,
    createdAt: '1 hour ago',
  },
  {
    id: '3',
    name: 'Picklist #003',
    progress: 100,
    assignedTo: 'Bob Wilson',
    status: 'Completed' as const,
    orders: 8,
    createdAt: '30 min ago',
  },
];

export const PicklistsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const numColumns = isLargeScreen ? 2 : 1;
  const [searchQuery, setSearchQuery] = useState('');
  const [picklists] = useState(mockPicklists);

  const handleScan = () => {
    console.log('Open camera scanner');
  };

  const filteredPicklists = picklists.filter(picklist =>
    picklist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    picklist.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPicklistCard = ({ item }: { item: any }) => (
    <Card style={[styles.picklistCard, isLargeScreen && styles.gridCard]}>
      <View style={styles.picklistContent}>
        <View style={styles.picklistHeader}>
          <Text style={styles.picklistName}>{item.name}</Text>
          <StatusBadge status={item.status} />
        </View>
        <Text style={styles.assignedTo}>Assigned to {item.assignedTo}</Text>
        <Text style={styles.orderCount}>
          {item.orders} orders • Created {item.createdAt}
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${item.progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{item.progress}%</Text>
        </View>
        <Button
          title={item.status === 'Completed' ? 'View Details' : 'Continue'}
          onPress={() => console.log('Action on picklist', item.id)}
          variant={item.status === 'Completed' ? 'secondary' : 'primary'}
          size="small"
        />
      </View>
    </Card>
  );

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Picklists" 
        onScanPress={handleScan}
      />
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
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-outline" size={24} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLargeScreen ? (
          <FlatList
            data={filteredPicklists}
            renderItem={renderPicklistCard}
            numColumns={numColumns}
            key={numColumns}
            scrollEnabled={false}
          />
        ) : (
          filteredPicklists.map((picklist) => (
            <View key={picklist.id}>
              {renderPicklistCard({ item: picklist })}
            </View>
          ))
        )}
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  picklistCard: {
    marginBottom: theme.spacing.sm,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  picklistContent: {
    flex: 1,
  },
  picklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  picklistName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  assignedTo: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  orderCount: {
    fontSize: 11,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.success,
  },
  progressText: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  actionButton: {
    marginTop: theme.spacing.xs,
  },
  actions: {
    marginTop: theme.spacing.sm,
  },
});