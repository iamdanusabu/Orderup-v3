import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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

// Mock data
const mockPicklists = [
  {
    id: '1',
    name: 'Picklist #001',
    progress: 75,
    assignedTo: 'Alice Brown',
    status: 'In Progress' as const,
    items: 12,
    timeRemaining: '15 min',
  },
  {
    id: '2',
    name: 'Picklist #002',
    progress: 50,
    assignedTo: 'Charlie Davis',
    status: 'In Progress' as const,
    items: 8,
    timeRemaining: '25 min',
  },
  {
    id: '3',
    name: 'Picklist #003',
    progress: 100,
    assignedTo: 'Diana Wilson',
    status: 'Completed' as const,
    items: 6,
    timeRemaining: 'Complete',
  },
];

export const PicklistsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const numColumns = isLargeScreen && viewMode === 'grid' ? 2 : 1;

  const filteredPicklists = mockPicklists.filter(picklist =>
    picklist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    picklist.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPicklistCard = ({ item }: { item: any }) => (
    <Card style={[styles.picklistCard, isLargeScreen && viewMode === 'grid' && styles.gridCard]}>
      <View style={styles.picklistHeader}>
        <View style={styles.picklistInfo}>
          <Text style={styles.picklistName}>{item.name}</Text>
          <Text style={styles.assignedTo}>Assigned to {item.assignedTo}</Text>
          <View style={styles.picklistDetails}>
            <Text style={styles.detailText}>
              <Ionicons name="cube-outline" size={14} color="#6B7280" /> {item.items} items
            </Text>
            <Text style={styles.detailText}>
              <Ionicons name="time-outline" size={14} color="#6B7280" /> {item.timeRemaining}
            </Text>
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{item.progress}%</Text>
      </View>
      <Button
        title={item.status === 'Completed' ? 'View Details' : 'Continue Picking'}
        onPress={() => console.log('Action on picklist', item.id)}
        style={styles.actionButton}
        variant={item.status === 'Completed' ? 'success' : 'primary'}
      />
    </Card>
  );

  const content = (
    <SafeAreaView style={styles.container}>
      {!isLargeScreen && (
        <View style={styles.header}>
          <Text style={styles.title}>Orderup</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Search and Controls */}
      <View style={styles.controls}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={16} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search picklists..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {isLargeScreen && (
          <View style={styles.viewControls}>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'list' && styles.activeViewButton]}
              onPress={() => setViewMode('list')}
            >
              <Ionicons name="list-outline" size={20} color={viewMode === 'list' ? '#1B365D' : '#6B7280'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'grid' && styles.activeViewButton]}
              onPress={() => setViewMode('grid')}
            >
              <Ionicons name="grid-outline" size={20} color={viewMode === 'grid' ? '#1B365D' : '#6B7280'} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLargeScreen && viewMode === 'grid' ? (
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
    </SafeAreaView>
  );

  return <Sidebar>{content}</Sidebar>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  notificationIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  viewControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 6,
  },
  activeViewButton: {
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  picklistCard: {
    marginBottom: 12,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: 6,
  },
  picklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  picklistInfo: {
    flex: 1,
  },
  picklistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  assignedTo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  picklistDetails: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    minWidth: 32,
  },
  actionButton: {
    marginTop: 8,
  },
});