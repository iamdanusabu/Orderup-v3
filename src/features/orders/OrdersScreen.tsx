
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
const mockOrders = [
  {
    id: '1',
    orderNumber: '#139526937622371924',
    date: '7/17/2025 10:32 AM',
    customerName: 'Unknown Customer',
    items: 1,
    amount: 0.00,
    status: 'Ready' as const,
    selected: false,
  },
  {
    id: '2',
    orderNumber: '#139526937622371925',
    date: '7/17/2025 10:32 AM',
    customerName: 'Unknown Customer',
    items: 1,
    amount: 0.00,
    status: 'New' as const,
    selected: false,
  },
  {
    id: '3',
    orderNumber: '#139526937622371926',
    date: '7/17/2025 10:32 AM',
    customerName: 'Unknown Customer',
    items: 1,
    amount: 0.00,
    status: 'New' as const,
    selected: false,
  },
];

const tabs = ['All', 'Initiated', 'Processing'];

export const OrdersScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [orders, setOrders] = useState(mockOrders);
  const [selectAll, setSelectAll] = useState(false);

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

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Filter</Text>
          <Text style={styles.filterIcon}>⚙️</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.selectAllContainer}
          onPress={handleSelectAll}
        >
          <View style={[styles.checkbox, selectAll && styles.checkedCheckbox]}>
            {selectAll && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.selectAllText}>Select All</Text>
        </TouchableOpacity>

        <Button
          title="Create Picklist"
          onPress={() => console.log('Create picklist')}
          disabled={selectedCount === 0}
          style={styles.createButton}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <Card key={order.id} style={styles.orderCard}>
            <View style={styles.orderRow}>
              <TouchableOpacity
                style={styles.selectContainer}
                onPress={() => handleOrderSelect(order.id)}
              >
                <View style={[styles.checkbox, order.selected && styles.checkedCheckbox]}>
                  {order.selected && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>

              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
                <Text style={styles.customerName}>{order.customerName}</Text>
                <Text style={styles.orderItems}>{order.items} item in order</Text>
                <View style={styles.amountContainer}>
                  <Text style={styles.currency}>🛍️</Text>
                  <Text style={styles.amount}>${order.amount.toFixed(2)}</Text>
                </View>
              </View>

              <StatusBadge status={order.status} />
            </View>
          </Card>
        ))}
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
  filterIcon: {
    fontSize: 16,
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectAllText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  createButton: {
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    marginVertical: 4,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  selectContainer: {
    marginRight: 12,
    marginTop: 4,
  },
  orderInfo: {
    flex: 1,
    marginRight: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 16,
    marginRight: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});
