
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Sidebar } from '../../components/common/Sidebar';
import { Toolbar } from '../../components/common/Toolbar';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router';

// Mock data for locations
const mockLocations = [
  {
    id: '1',
    name: 'Fly LLC',
    idNumber: '1',
    selected: true,
  },
  {
    id: '10',
    name: 'Fly Yonkers',
    idNumber: '10',
    selected: false,
  },
  {
    id: '11',
    name: 'Fly Yonkers',
    idNumber: '10',
    selected: false,
  },
  {
    id: '12',
    name: 'Fly Yonkers',
    idNumber: '10',
    selected: false,
  },
];

// Mock users for assignment
const mockUsers = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Emma Wilson' },
  { id: '3', name: 'Michael Brown' },
];

interface LocationSelectionScreenProps {
  selectedOrders?: any[];
}

export const LocationSelectionScreen: React.FC<LocationSelectionScreenProps> = ({ 
  selectedOrders = [] 
}) => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('1');
  const [activeTab, setActiveTab] = useState('Store');
  const [assignedUser, setAssignedUser] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleCreatePicklist = () => {
    console.log('Creating picklist with:', {
      selectedOrders,
      location: selectedLocation,
      assignedUser,
    });
    
    // Navigate to picklist screen
    router.push('/picklist-details');
  };

  const handleReturnHome = () => {
    router.push('/dashboard');
  };

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Select Location" 
        showBack={true}
        onBackPress={() => router.back()}
      />
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Store' && styles.activeTab]}
          onPress={() => setActiveTab('Store')}
        >
          <Text style={[styles.tabText, activeTab === 'Store' && styles.activeTabText]}>
            Store
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Warehouse' && styles.activeTab]}
          onPress={() => setActiveTab('Warehouse')}
        >
          <Text style={[styles.tabText, activeTab === 'Warehouse' && styles.activeTabText]}>
            Warehouse
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Location List */}
        {mockLocations.map((location) => (
          <Card key={location.id} style={styles.locationCard}>
            <TouchableOpacity
              style={styles.locationContent}
              onPress={() => handleLocationSelect(location.id)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioButton,
                  selectedLocation === location.id && styles.radioButtonSelected
                ]}>
                  {selectedLocation === location.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationId}>ID: {location.idNumber}</Text>
              </View>
            </TouchableOpacity>
          </Card>
        ))}

        {/* User Assignment Section */}
        <View style={styles.assignmentSection}>
          <Text style={styles.sectionTitle}>Assign Picklist (Optional)</Text>
          <TouchableOpacity
            style={styles.userDropdownButton}
            onPress={() => setShowUserDropdown(!showUserDropdown)}
          >
            <Text style={styles.userDropdownText}>
              {assignedUser ? mockUsers.find(u => u.id === assignedUser)?.name : 'Select User'}
            </Text>
            <Ionicons 
              name={showUserDropdown ? "chevron-up-outline" : "chevron-down-outline"} 
              size={20} 
              color={theme.colors.text.secondary} 
            />
          </TouchableOpacity>
          
          {showUserDropdown && (
            <View style={styles.userDropdown}>
              <TouchableOpacity
                style={styles.userOption}
                onPress={() => {
                  setAssignedUser(null);
                  setShowUserDropdown(false);
                }}
              >
                <Text style={styles.userOptionText}>Unassigned</Text>
              </TouchableOpacity>
              {mockUsers.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.userOption}
                  onPress={() => {
                    setAssignedUser(user.id);
                    setShowUserDropdown(false);
                  }}
                >
                  <Text style={styles.userOptionText}>{user.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button
          title="Return Home"
          onPress={handleReturnHome}
          variant="secondary"
          style={styles.actionButton}
        />
        <Button
          title="Create Picklist"
          onPress={handleCreatePicklist}
          variant="primary"
          style={styles.actionButton}
        />
      </View>
    </View>
  );

  return <Sidebar>{content}</Sidebar>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.sm,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  locationCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    marginRight: theme.spacing.md,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  locationId: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  assignmentSection: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  userDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  userDropdownText: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  userDropdown: {
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  userOptionText: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
