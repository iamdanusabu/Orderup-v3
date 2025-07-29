
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
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Toolbar } from '../../components/common/Toolbar';
import { theme } from '../../constants/theme';
import { getDeviceType, getResponsiveSpacing, getResponsiveFontSize } from '../../utils/responsive';
import { useRouter } from 'expo-router';

// Mock data with updated structure to match design
const mockOrders = [
  {
    id: '1',
    orderNumber: 'Order #12345',
    customerName: 'John Smith',
    datetime: '7/28/2025 4:34 PM',
    items: 1,
    price: '$25.99',
    status: 'New' as const,
    selected: false,
  },
  {
    id: '2',
    orderNumber: 'Order #12346',
    customerName: 'Emma Wilson',
    datetime: '7/28/2025 4:19 PM',
    items: 3,
    price: '$45.99',
    status: 'Ready' as const,
    selected: false,
  },
  {
    id: '3',
    orderNumber: 'Order #12347',
    customerName: 'Michael Brown',
    datetime: '7/28/2025 4:39 PM',
    items: 1,
    price: '$75.50',
    status: 'New' as const,
    selected: false,
  },
  {
    id: '4',
    orderNumber: 'Order #12348',
    customerName: 'Sarah Davis',
    datetime: '7/28/2025 3:59 PM',
    items: 2,
    price: '$120.99',
    status: 'Ready' as const,
    selected: false,
  },
];

export const OrdersScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const deviceType = getDeviceType();
  const isLargeScreen = width >= theme.breakpoints.tablet;
  const isLandscape = width > height;
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);
  const [selectedCount, setSelectedCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handleScan = () => {
    console.log('Open camera scanner');
  };

  const toggleOrderSelection = (orderId: string) => {
    setOrders(prevOrders => {
      const newOrders = prevOrders.map(order => 
        order.id === orderId ? { ...order, selected: !order.selected } : order
      );
      setSelectedCount(newOrders.filter(order => order.selected).length);
      return newOrders;
    });
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Initiated') return order.status === 'New';
    if (activeFilter === 'Processing') return order.status === 'Processing';
    if (activeFilter === 'Ready') return order.status === 'Ready';
    return true;
  });

  const renderOrderCard = ({ item }: { item: any }) => (
    <Card style={styles.orderCard}>
      <TouchableOpacity
        style={styles.orderContent}
        onPress={() => isSelectionMode ? toggleOrderSelection(item.id) : router.push(`/order-details?orderId=${item.id}`)}
      >
        <View style={styles.orderHeader}>
          {isSelectionMode && (
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => toggleOrderSelection(item.id)}
            >
              <View style={[
                styles.checkbox,
                item.selected && styles.checkboxSelected
              ]}>
                {item.selected && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>{item.orderNumber}</Text>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.datetime}>{item.datetime}</Text>
            <Text style={styles.itemCount}>{item.items} items</Text>
          </View>
          <View style={styles.rightSection}>
            <StatusBadge status={item.status} />
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Orders" 
        onScanPress={handleScan}
      />
      
      {/* Top Actions Bar */}
      <View style={styles.actionsBar}>
        <TouchableOpacity 
          style={[
            styles.selectOrdersButton,
            isSelectionMode && styles.selectOrdersButtonActive
          ]}
          onPress={() => {
            setIsSelectionMode(!isSelectionMode);
            if (isSelectionMode) {
              // Clear all selections when exiting selection mode
              setOrders(prevOrders => 
                prevOrders.map(order => ({ ...order, selected: false }))
              );
              setSelectedCount(0);
            }
          }}
        >
          <Text style={[
            styles.selectOrdersText,
            isSelectionMode && styles.selectOrdersTextActive
          ]}>
            {isSelectionMode ? 'Cancel Selection' : 'Select Orders'}
          </Text>
        </TouchableOpacity>

        {/* Selection Info and Action - shown when orders are selected */}
        {isSelectionMode && selectedCount > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionCountText}>{selectedCount} selected</Text>
            <TouchableOpacity 
              style={styles.createPicklistButton}
              onPress={() => {
                const selectedOrders = orders.filter(o => o.selected);
                console.log('Create picklist with selected orders:', selectedOrders);
                // Navigate to location selection screen
                router.push('/location-selection');
                // Reset selection mode after creating picklist
                setIsSelectionMode(false);
                setOrders(prevOrders => 
                  prevOrders.map(order => ({ ...order, selected: false }))
                );
                setSelectedCount(0);
              }}
            >
              <Text style={styles.createPicklistText}>Create Picklist</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Filter - only shown when not in selection mode with selections */}
        {!(isSelectionMode && selectedCount > 0) && (
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <Ionicons name="filter-outline" size={16} color={theme.colors.text.secondary} />
              <Text style={styles.filterText}>Filter</Text>
              <Ionicons 
                name={showFilterDropdown ? "chevron-up-outline" : "chevron-down-outline"} 
                size={16} 
                color={theme.colors.text.secondary} 
              />
            </TouchableOpacity>
            
            {showFilterDropdown && (
              <View style={styles.filterDropdown}>
                <TouchableOpacity 
                  style={styles.filterOption}
                  onPress={() => {
                    setActiveFilter('All');
                    setShowFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.filterOptionText, activeFilter === 'All' && styles.activeFilterOptionText]}>
                    All Orders
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.filterOption}
                  onPress={() => {
                    setActiveFilter('Initiated');
                    setShowFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.filterOptionText, activeFilter === 'Initiated' && styles.activeFilterOptionText]}>
                    Initiated
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.filterOption}
                  onPress={() => {
                    setActiveFilter('Processing');
                    setShowFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.filterOptionText, activeFilter === 'Processing' && styles.activeFilterOptionText]}>
                    Processing
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.filterOption}
                  onPress={() => {
                    setActiveFilter('Ready');
                    setShowFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.filterOptionText, activeFilter === 'Ready' && styles.activeFilterOptionText]}>
                    Ready
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {['All', 'Initiated', 'Processing'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              activeFilter === filter && styles.activeFilterTab
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterTabText,
              activeFilter === filter && styles.activeFilterTabText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.map((order) => (
          <View key={order.id}>
            {renderOrderCard({ item: order })}
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
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getResponsiveSpacing('lg'),
    paddingVertical: getResponsiveSpacing('md'),
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexWrap: 'wrap',
    gap: getResponsiveSpacing('sm'),
  },
  selectOrdersButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  selectOrdersText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  selectOrdersButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  selectOrdersTextActive: {
    color: '#FFFFFF',
  },
  checkboxContainer: {
    marginRight: theme.spacing.md,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterContainer: {
    position: 'relative',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.xs,
  },
  filterDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xs,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  filterOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterOptionText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  activeFilterOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  filterText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: getResponsiveSpacing('lg'),
    paddingVertical: getResponsiveSpacing('md'),
    gap: getResponsiveSpacing('sm'),
    flexWrap: 'wrap',
  },
  filterTab: {
    paddingHorizontal: getResponsiveSpacing('md'),
    paddingVertical: getResponsiveSpacing('sm'),
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minWidth: 80,
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: getResponsiveFontSize(14),
    color: theme.colors.text.secondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  selectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  selectionCountText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  createPicklistButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  createPicklistText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: getResponsiveSpacing('lg'),
  },
  orderCard: {
    marginBottom: getResponsiveSpacing('md'),
    padding: getResponsiveSpacing('lg'),
  },
  orderContent: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: getResponsiveSpacing('xs'),
  },
  customerName: {
    fontSize: getResponsiveFontSize(14),
    color: theme.colors.text.secondary,
    marginBottom: getResponsiveSpacing('xs'),
  },
  datetime: {
    fontSize: getResponsiveFontSize(12),
    color: theme.colors.text.tertiary,
    marginBottom: getResponsiveSpacing('xs'),
  },
  itemCount: {
    fontSize: getResponsiveFontSize(12),
    color: theme.colors.text.tertiary,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
  },
  price: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
});
