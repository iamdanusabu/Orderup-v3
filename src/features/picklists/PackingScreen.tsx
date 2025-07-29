
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
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Toolbar } from '../../components/common/Toolbar';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router';

// Mock data for orders to pack
const mockOrders = [
  {
    id: '1',
    orderNumber: '#139526937622319424',
    status: 'Processing' as const,
    customer: 'Abhina p.',
    location: 'retailcloud, Concord',
    externalId: '1711',
    source: 'Shopify',
    date: '7/17/2025 10:32 AM',
    total: '249.90',
    items: [
      { name: 'Flower Woven Shirt', quantity: 2 },
      { name: 'High Power CFL BULB', quantity: 2 },
    ],
    moreItems: 1,
  },
  {
    id: '2',
    orderNumber: '#139526937622319424',
    status: 'Processing' as const,
    customer: 'Abhina p.',
    location: 'retailcloud, Concord',
    externalId: '1711',
    source: 'Shopify',
    date: '7/17/2025 10:32 AM',
    total: '249.90',
    items: [
      { name: 'Flower Woven Shirt', quantity: 2 },
      { name: 'High Power CFL BULB', quantity: 2 },
    ],
    moreItems: 1,
  },
];

export const PackingScreen: React.FC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);
  const [completedOrders, setCompletedOrders] = useState<string[]>([]);

  const handleProceedToFulfillment = (orderId: string) => {
    console.log('Proceed to fulfillment for order:', orderId);
    // Mark order as completed
    setCompletedOrders(prev => [...prev, orderId]);
  };

  const handleReturnHome = () => {
    router.push('/dashboard');
  };

  const handleFinalizeOrder = () => {
    console.log('Finalizing all orders');
    router.push('/dashboard');
  };

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Packing" 
        showBack={true}
        onBackPress={() => router.push('/picklist-details')}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>6 Orders selected for fulfillment</Text>
        <Text style={styles.headerSubtitle}>Store: Fly LLC   ID: 1</Text>
      </View>

      <ScrollView style={styles.content}>
        {orders.map((order) => (
          <Card key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <StatusBadge status={order.status} />
              </View>
              <Text style={styles.orderTotal}>{order.total}</Text>
            </View>
            
            <Text style={styles.customerInfo}>
              {order.customer}   {order.location}
            </Text>
            <Text style={styles.orderDetails}>
              External ID: {order.externalId}   Source: {order.source}   Date: {order.date}
            </Text>
            
            <View style={styles.itemsSection}>
              <Text style={styles.itemsTitle}>Items({order.items.length + order.moreItems})</Text>
              <Text style={styles.moreItems}>+{order.moreItems} more items (tap to view all)</Text>
              
              {order.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>Qty:{item.quantity}</Text>
                </View>
              ))}
            </View>
            
            {completedOrders.includes(order.id) ? (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            ) : (
              <Button
                title="Proceed to Fulfillment"
                onPress={() => handleProceedToFulfillment(order.id)}
                style={styles.fulfillmentButton}
              />
            )}
          </Card>
        ))}
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
          title="Finalize Order"
          onPress={handleFinalizeOrder}
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
    paddingTop: theme.spacing.md,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  orderCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  customerInfo: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  orderDetails: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.md,
  },
  itemsSection: {
    marginBottom: theme.spacing.md,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  moreItems: {
    fontSize: 12,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  itemName: {
    fontSize: 14,
    color: theme.colors.text.primary,
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  fulfillmentButton: {
    backgroundColor: theme.colors.success,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.success,
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
