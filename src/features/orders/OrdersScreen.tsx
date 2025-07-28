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

export const OrdersScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const numColumns = isLargeScreen ? 2 : 1;
  const [orders, setOrders] = useState(mockOrders);
  const [selectedCount, setSelectedCount] = useState(0);

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

  const renderOrderCard = ({ item }: { item: any }) => (
    <Card style={[styles.orderCard, isLargeScreen && styles.gridCard]}>
      <View style={styles.orderContent}>
        <View style={styles.orderHeader}>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => toggleOrderSelection(item.id)}
          >
            <Ionicons
              name={item.selected ? "checkbox" : "checkbox-outline"}
              size={20}
              color={item.selected ? theme.colors.primary : theme.colors.text.secondary}
            />
          </TouchableOpacity>
          <StatusBadge status={item.status} />
        </View>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.orderDetails}>
          {item.items} items • {item.timeAgo}
        </Text>
      </View>
    </Card>
  );

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Orders" 
        onScanPress={handleScan}
      />
      {selectedCount > 0 && (
        <View style={styles.selectionBar}>
          <Text style={styles.selectionText}>{selectedCount} orders selected</Text>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Text style={styles.bulkActionText}>Create Picklist</Text>
          </TouchableOpacity>
        </View>
      )}
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
    </View>
  );

  return <Sidebar>{content}</Sidebar>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  selectionText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  bulkActionButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  bulkActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  orderCard: {
    marginBottom: theme.spacing.sm,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  orderContent: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  selectButton: {
    padding: theme.spacing.xs,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  customerName: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  orderDetails: {
    fontSize: 11,
    color: theme.colors.text.tertiary,
  },
});