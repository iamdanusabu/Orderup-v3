
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

const statusOptions = ['Ready', 'Processing', 'Completed', 'Cancelled', 'On Hold'];

export const OrderDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(mockOrderDetails.updateStatus.currentStatus);

  const handleUpdateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus);
    setShowStatusDropdown(false);
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
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity 
                    style={styles.statusDropdown}
                    onPress={() => setShowStatusDropdown(!showStatusDropdown)}
                  >
                    <Text style={styles.statusDropdownText}>{currentStatus}</Text>
                    <Ionicons 
                      name={showStatusDropdown ? "chevron-up" : "chevron-down"} 
                      size={16} 
                      color={theme.colors.text.secondary} 
                    />
                  </TouchableOpacity>
                  
                  {showStatusDropdown && (
                    <View style={styles.dropdownOptions}>
                      {statusOptions.map((status) => (
                        <TouchableOpacity
                          key={status}
                          style={[
                            styles.dropdownOption,
                            status === currentStatus && styles.selectedOption
                          ]}
                          onPress={() => handleUpdateStatus(status)}
                        >
                          <Text style={[
                            styles.dropdownOptionText,
                            status === currentStatus && styles.selectedOptionText
                          ]}>
                            {status}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.updateButton}
                  onPress={() => console.log('Save status:', currentStatus)}
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
    fontSize: theme.typography.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  orderMeta: {
    fontSize: theme.typography.fontSize,
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
    fontSize: theme.typography.fontSize,
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
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    fontSize: theme.typography.fontSize,
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
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: theme.typography.fontSize,
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
    fontSize: theme.typography.fontSize,
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
    fontSize: theme.typography.fontSize,
    color: '#1976D2',
    fontWeight: '500',
  },
  itemDetails: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.tertiary,
  },
  itemTotal: {
    fontSize: theme.typography.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  statusUpdateContainer: {
    gap: theme.spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'flex-start',
  },
  dropdownContainer: {
    flex: 1,
    position: 'relative',
  },
  statusDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  statusDropdownText: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.primary,
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    maxHeight: 200,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary + '10',
  },
  dropdownOptionText: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.primary,
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
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
    fontSize: theme.typography.fontSize,
  },
});
