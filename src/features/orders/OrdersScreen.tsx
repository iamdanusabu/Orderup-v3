
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';

// Mock data
const mockOrders = [
  {
    id: '1',
    orderNumber: 'Order #12345',
    customerName: 'John Doe',
    items: 3,
    timeAgo: '5 min ago',
    status: 'New' as const,
    selected: false,
  },
  {
    id: '2',
    orderNumber: 'Order #12346',
    customerName: 'Jane Smith',
    items: 2,
    timeAgo: '10 min ago',
    status: 'Processing' as const,
    selected: false,
  },
  {
    id: '3',
    orderNumber: 'Order #12347',
    customerName: 'Bob Johnson',
    items: 5,
    timeAgo: '15 min ago',
    status: 'Ready' as const,
    selected: false,
  },
];

const tabs = ['All', 'Initiated', 'Processing'];

export const OrdersScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [orders, setOrders] = useState(mockOrders);
  const [selectAll, setSelectAll] = useState(false);
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const numColumns = isLargeScreen ? 2 : 1;

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setOrders(orders.map(order => ({ ...order, selected: newSelectAll })));
  };

  const handleOrderSelect = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, selected: !order.selected } : order
    ));
  };

  const selectedCount = orders.filter(order => order.selected).length;

  const renderOrderCard = ({ item }: { item: any }) => (
    <Card style={[styles.orderCard, isLargeScreen && styles.gridCard]}>
      <View style={styles.orderHeader}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleOrderSelect(item.id)}
        >
          <Ionicons 
            name={item.selected ? 'checkmark-circle' : 'ellipse-outline'} 
            size={24} 
            color={item.selected ? '#10B981' : '#D1D5DB'} 
          />
        </TouchableOpacity>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.orderDetails}>
            {item.items} items • {item.timeAgo}
          </Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
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

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Filter</Text>
          <Ionicons name="funnel-outline" size={16} color="#6B7280" />
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.selectAllContainer}>
          <TouchableOpacity style={styles.selectAll} onPress={handleSelectAll}>
            <Ionicons 
              name={selectAll ? 'checkmark-circle' : 'ellipse-outline'} 
              size={20} 
              color={selectAll ? '#10B981' : '#D1D5DB'} 
            />
            <Text style={styles.selectAllText}>Select All</Text>
          </TouchableOpacity>
          {selectedCount > 0 && (
            <Text style={styles.selectedCount}>{selectedCount} selected</Text>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLargeScreen ? (
          <FlatList
            data={orders}
            renderItem={renderOrderCard}
            numColumns={numColumns}
            key={numColumns}
            scrollEnabled={false}
          />
        ) : (
          orders.map((order) => (
            <View key={order.id}>
              {renderOrderCard({ item: order })}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  filterText: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
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
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  selectedCount: {
    marginLeft: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  orderCard: {
    marginBottom: 12,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: 6,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  customerName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  orderDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
