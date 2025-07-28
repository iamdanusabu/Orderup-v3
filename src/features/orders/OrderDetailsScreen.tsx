
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Toolbar } from '../../components/common/Toolbar';
import { theme } from '../../constants/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock order data - in real app this would come from API based on orderId
const mockOrderDetails = {
  id: '1',
  orderNumber: '#139526937622319424',
  externalId: '1711',
  source: 'Shopify',
  date: '7/17/2025 10:32 AM',
  status: 'Ready' as const,
  customer: {
    name: 'Unknown Customer',
    number: '7829047368',
  },
  type: 'Online',
  paymentStatus: 'Paid',
  totalItems: 1,
  orderSummary: {
    customer: 'Unknown Customer',
    customerNumber: '7829047368',
    type: 'Online',
    paymentStatus: 'Paid',
    totalItems: 1,
  },
  financialSummary: {
    subtotal: 227.69,
    tax: 22.21,
    fees: 0,
    customization: 0,
    totalAmount: 249.90,
  },
  items: [
    {
      id: '1',
      name: 'Flower Woven Shirt',
      sku: 'SKU:0007',
      unitPrice: 45.51,
      quantity: 5,
      cost: 0,
      default: 'Default',
      status: 'Initiated',
      total: 91.02,
    },
    {
      id: '2',
      name: 'Flower Woven Shirt',
      sku: 'SKU:0007',
      unitPrice: 45.51,
      quantity: 5,
      cost: 0,
      default: 'Default',
      status: 'Initiated',
      total: 91.02,
    },
    {
      id: '3',
      name: 'Flower Woven Shirt',
      sku: 'SKU:0007',
      unitPrice: 45.51,
      quantity: 5,
      cost: 0,
      default: 'Default',
      status: 'Initiated',
      total: 91.02,
    },
  ],
  processingInfo: {
    store: 'Adidas',
    employee: 'John',
    register: 'Register 1',
  },
  updateStatus: {
    currentStatus: 'Ready',
  },
};

export const OrderDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  const handleUpdateStatus = (newStatus: string) => {
    console.log('Update status to:', newStatus);
  };

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Order Details" 
        showBack={true}
        onBackPress={() => router.back()}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.orderNumber}>{mockOrderDetails.orderNumber}</Text>
          <Text style={styles.orderMeta}>
            External ID: {mockOrderDetails.externalId}   Source: {mockOrderDetails.source}   Date: {mockOrderDetails.date}
          </Text>
        </View>
        <StatusBadge status={mockOrderDetails.status} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.row}>
          {/* Order Summary */}
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Customer:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.orderSummary.customer}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Customer Number:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.orderSummary.customerNumber}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Type:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.orderSummary.type}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Status:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.orderSummary.paymentStatus}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.orderSummary.totalItems}</Text>
            </View>
          </Card>

          {/* Financial Summary */}
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Financial Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${mockOrderDetails.financialSummary.subtotal}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax:</Text>
              <Text style={styles.summaryValue}>${mockOrderDetails.financialSummary.tax}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Fees:</Text>
              <Text style={styles.summaryValue}>${mockOrderDetails.financialSummary.fees}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Customization:</Text>
              <Text style={styles.summaryValue}>${mockOrderDetails.financialSummary.customization}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>${mockOrderDetails.financialSummary.totalAmount}</Text>
            </View>
          </Card>
        </View>

        {/* Order Items */}
        <Card style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>Order Items ({mockOrderDetails.items.length})</Text>
          
          {mockOrderDetails.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemStatusBadge}>
                    <Text style={styles.itemStatusText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.itemDetails}>
                  {item.sku}   Unit Price: ${item.unitPrice}   Quantity: ${item.quantity}   Cost: ${item.cost}   {item.default}   {item.default}
                </Text>
              </View>
              <Text style={styles.itemTotal}>${item.total}</Text>
            </View>
          ))}
        </Card>

        <View style={styles.row}>
          {/* Processing Information */}
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Processing Information</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Store:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.processingInfo.store}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Employee:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.processingInfo.employee}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Register:</Text>
              <Text style={styles.summaryValue}>{mockOrderDetails.processingInfo.register}</Text>
            </View>
          </Card>

          {/* Update Status */}
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Update Status</Text>
            
            <View style={styles.statusUpdateContainer}>
              <Text style={styles.summaryLabel}>Order Status</Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDropdown}>
                  <Text style={styles.statusDropdownText}>{mockOrderDetails.updateStatus.currentStatus}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.updateButton}
                  onPress={() => handleUpdateStatus('Processing')}
                >
                  <Text style={styles.updateButtonText}>Update Status</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerLeft: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  orderMeta: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  summaryCard: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  itemsCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  itemStatusBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemStatusText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  itemDetails: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  statusUpdateContainer: {
    gap: theme.spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  statusDropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  statusDropdownText: {
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  updateButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
