
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';

// Mock data
const mockPicklists = [
  {
    id: '1',
    name: 'PL-1234',
    createdDate: 'Sep 15, 2023',
    itemsPicked: 12,
    totalItems: 20,
    progress: 60,
    assignedTo: 'John Smith',
    status: 'Open' as const,
  },
  {
    id: '2',
    name: 'PL-1235',
    createdDate: 'Sep 14, 2023',
    itemsPicked: 15,
    totalItems: 15,
    progress: 100,
    assignedTo: 'Sarah Johnson',
    status: 'Completed' as const,
  },
  {
    id: '3',
    name: 'PL-1236',
    createdDate: 'Sep 14, 2023',
    itemsPicked: 8,
    totalItems: 15,
    progress: 53,
    assignedTo: 'Mike Wilson',
    status: 'Open' as const,
  },
  {
    id: '4',
    name: 'PL-1237',
    createdDate: 'Sep 13, 2023',
    itemsPicked: 20,
    totalItems: 20,
    progress: 100,
    assignedTo: 'Emily Brown',
    status: 'Completed' as const,
  },
  {
    id: '5',
    name: 'PL-1238',
    createdDate: 'Sep 13, 2023',
    itemsPicked: 5,
    totalItems: 10,
    progress: 50,
    assignedTo: 'David Lee',
    status: 'Open' as const,
  },
  {
    id: '6',
    name: 'PL-1239',
    createdDate: 'Sep 12, 2023',
    itemsPicked: 3,
    totalItems: 8,
    progress: 38,
    assignedTo: 'Lisa Anderson',
    status: 'Open' as const,
  },
];

export const PicklistsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPicklists = mockPicklists.filter(picklist =>
    picklist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    picklist.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orderup</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Text style={styles.bell}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search and Controls */}
      <View style={styles.controls}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search picklists..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.viewControls}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'grid' && styles.activeViewButton]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={styles.viewIcon}>⊞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'list' && styles.activeViewButton]}
            onPress={() => setViewMode('list')}
          >
            <Text style={styles.viewIcon}>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filters</Text>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {filteredPicklists.map((picklist) => (
            <Card key={picklist.id} style={viewMode === 'grid' ? styles.gridCard : styles.listCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.picklistName}>{picklist.name}</Text>
                <StatusBadge status={picklist.status} variant="picklist" />
              </View>

              <Text style={styles.createdDate}>Created {picklist.createdDate}</Text>

              <Text style={styles.progressText}>
                {picklist.itemsPicked}/{picklist.totalItems} items picked
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${picklist.progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressPercentage}>{picklist.progress}%</Text>
              </View>

              <View style={styles.assigneeContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {picklist.assignedTo.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <Text style={styles.assigneeName}>{picklist.assignedTo}</Text>
              </View>

              <Button
                title="View Details"
                onPress={() => console.log('View details', picklist.id)}
                variant="outline"
                size="small"
                style={styles.detailsButton}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  bell: {
    fontSize: 24,
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
    fontSize: 16,
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
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  activeViewButton: {
    backgroundColor: '#3B82F6',
  },
  viewIcon: {
    fontSize: 16,
    color: '#6B7280',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  filterIcon: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  listContainer: {
    paddingVertical: 16,
  },
  gridCard: {
    width: '48%',
    marginBottom: 16,
  },
  listCard: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  picklistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  createdDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
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
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    minWidth: 30,
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  assigneeName: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailsButton: {
    marginTop: 4,
  },
});
