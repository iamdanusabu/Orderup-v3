
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { theme } from '../../constants/theme';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  dateRange: string;
  orderSources: string[];
  paymentStatus: string[];
  customDateFrom?: string;
  customDateTo?: string;
}

const dateRangeOptions = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Custom', value: 'custom' },
];

const orderSourceOptions = [
  { label: 'All', value: 'all' },
  { label: 'Shopify', value: 'shopify' },
  { label: 'TapIn2', value: 'tapin2' },
  { label: 'Breakaway', value: 'breakaway' },
  { label: 'BigCommerce', value: 'bigcommerce' },
  { label: 'Ecwid', value: 'ecwid' },
  { label: 'Phone Order', value: 'phone' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Bar Tab', value: 'bartab' },
  { label: 'TIKT', value: 'tikt' },
  { label: 'Table', value: 'table' },
  { label: 'Other', value: 'other' },
  { label: 'Manual', value: 'manual' },
  { label: 'FanVista', value: 'fanvista' },
  { label: 'QSR', value: 'qsr' },
];

const paymentStatusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      dateRange: 'all',
      orderSources: ['all'],
      paymentStatus: ['all'],
    }
  );

  const handleDateRangeChange = (value: string) => {
    setFilters(prev => ({ ...prev, dateRange: value }));
  };

  const handleOrderSourceToggle = (value: string) => {
    setFilters(prev => {
      let newSources = [...prev.orderSources];
      
      if (value === 'all') {
        newSources = ['all'];
      } else {
        // Remove 'all' if selecting specific sources
        newSources = newSources.filter(s => s !== 'all');
        
        if (newSources.includes(value)) {
          newSources = newSources.filter(s => s !== value);
        } else {
          newSources.push(value);
        }
        
        // If no sources selected, default to 'all'
        if (newSources.length === 0) {
          newSources = ['all'];
        }
      }
      
      return { ...prev, orderSources: newSources };
    });
  };

  const handlePaymentStatusToggle = (value: string) => {
    setFilters(prev => {
      let newStatuses = [...prev.paymentStatus];
      
      if (value === 'all') {
        newStatuses = ['all'];
      } else {
        // Remove 'all' if selecting specific statuses
        newStatuses = newStatuses.filter(s => s !== 'all');
        
        if (newStatuses.includes(value)) {
          newStatuses = newStatuses.filter(s => s !== value);
        } else {
          newStatuses.push(value);
        }
        
        // If no statuses selected, default to 'all'
        if (newStatuses.length === 0) {
          newStatuses = ['all'];
        }
      }
      
      return { ...prev, paymentStatus: newStatuses };
    });
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: 'all',
      orderSources: ['all'],
      paymentStatus: ['all'],
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const renderFilterSection = (
    title: string,
    options: Array<{ label: string; value: string }>,
    selectedValues: string[],
    onToggle: (value: string) => void
  ) => (
    <View style={styles.filterSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterOption,
              selectedValues.includes(option.value) && styles.selectedFilterOption,
            ]}
            onPress={() => onToggle(option.value)}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedValues.includes(option.value) && styles.selectedFilterOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Orders</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.scrollContent} 
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {/* Date Range */}
            {renderFilterSection(
              'Date Range',
              dateRangeOptions,
              [filters.dateRange],
              handleDateRangeChange
            )}

            {/* Order Source */}
            {renderFilterSection(
              'Order Source',
              orderSourceOptions,
              filters.orderSources,
              handleOrderSourceToggle
            )}

            {/* Payment Status */}
            {renderFilterSection(
              'Payment Status',
              paymentStatusOptions,
              filters.paymentStatus,
              handlePaymentStatusToggle
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <Button
              title="Clear Filters"
              onPress={handleClearFilters}
              variant="secondary"
              style={styles.footerButton}
            />
            <Button
              title="Apply Filter"
              onPress={handleApplyFilters}
              variant="primary"
              style={styles.footerButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    minHeight: 400,
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  scrollContentContainer: {
    paddingBottom: theme.spacing.lg,
    flexGrow: 1,
  },
  filterSection: {
    marginVertical: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  filterOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#FFFFFF',
  },
  selectedFilterOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  selectedFilterOptionText: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});
