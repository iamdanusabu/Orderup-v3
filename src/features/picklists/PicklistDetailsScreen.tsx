
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Sidebar } from '../../components/common/Sidebar';
import { Toolbar } from '../../components/common/Toolbar';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router';

// Mock data for picklist items
const mockPicklistItems = [
  {
    id: '1',
    name: 'High Power CFL BULB',
    sku: '808080',
    available: 0,
    qoh: 0,
    needed: 2,
    picked: 2,
    status: 'picked',
  },
  {
    id: '2',
    name: 'High Power CFL BULB',
    sku: '808080',
    available: 0,
    qoh: 0,
    needed: 2,
    picked: 0,
    status: 'pending',
  },
  {
    id: '3',
    name: 'High Power CFL BULB',
    sku: '808080',
    available: 0,
    qoh: 0,
    needed: 2,
    picked: 0,
    status: 'pending',
  },
  {
    id: '4',
    name: 'High Power CFL BULB',
    sku: '808080',
    available: 0,
    qoh: 0,
    needed: 2,
    picked: 0,
    status: 'pending',
  },
  {
    id: '5',
    name: 'High Power CFL BULB',
    sku: '808080',
    available: 0,
    qoh: 0,
    needed: 2,
    picked: 0,
    status: 'pending',
  },
];

export const PicklistDetailsScreen: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState(mockPicklistItems);
  const totalItems = items.reduce((sum, item) => sum + item.needed, 0);
  const pickedItems = items.reduce((sum, item) => sum + item.picked, 0);

  const handleItemPick = (itemId: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, picked: item.needed, status: 'picked' }
          : item
      )
    );
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const newPicked = Math.max(0, Math.min(item.needed, item.picked + change));
          return { 
            ...item, 
            picked: newPicked,
            status: newPicked === item.needed ? 'picked' : 'pending'
          };
        }
        return item;
      })
    );
  };

  const handleMarkAllPicked = () => {
    setItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        picked: item.needed,
        status: 'picked'
      }))
    );
  };

  const handleProceedToFulfillment = () => {
    router.push('/packing-screen');
  };

  const content = (
    <ScreenWrapper scrollable={false} keyboardAvoiding={false}>
      <View style={styles.container}>
        <Toolbar 
          title="Picklist" 
          showBack={true}
          onBackPress={() => router.push('/location-selection')}
        />

        {/* Header Info */}
        <View style={styles.headerInfo}>
          <Text style={styles.headerText}>
            Orders: 11  Items: 9  Store: Fly LLC  ID: 1
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.max(2, (pickedItems / totalItems) * 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {pickedItems} of {totalItems} items picked
            </Text>
          </View>
        </View>

        {/* Unassigned Bin Header */}
        <View style={styles.binHeader}>
          <View style={styles.binInfo}>
            <Ionicons name="cube-outline" size={20} color={theme.colors.text.primary} />
            <Text style={styles.binText}>Unassigned Bin</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemContent}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSku}>SKU: {item.sku}</Text>
                  <Text style={styles.itemAvailability}>
                    Available: {item.available} | QOH: {item.qoh}
                  </Text>
                </View>

                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      item.picked <= 0 && styles.quantityButtonDisabled
                    ]}
                    onPress={() => handleQuantityChange(item.id, -1)}
                    disabled={item.picked <= 0}
                  >
                    <Ionicons 
                      name="remove" 
                      size={18} 
                      color={item.picked <= 0 ? '#94A3B8' : '#FFFFFF'} 
                    />
                  </TouchableOpacity>

                  <View style={styles.quantityDisplay}>
                    <Text style={styles.quantityText}>
                      {item.picked}/{item.needed}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      item.picked >= item.needed && styles.quantityButtonDisabled
                    ]}
                    onPress={() => handleQuantityChange(item.id, 1)}
                    disabled={item.picked >= item.needed}
                  >
                    <Ionicons 
                      name="add" 
                      size={18} 
                      color={item.picked >= item.needed ? '#94A3B8' : '#FFFFFF'} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <Button
            title="Mark All Picked"
            onPress={handleMarkAllPicked}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="Proceed to Fulfillment"
            onPress={handleProceedToFulfillment}
            variant="primary"
            style={styles.actionButton}
          />
        </View>
      </View>
    </ScreenWrapper>
  );

  return <Sidebar>{content}</Sidebar>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerInfo: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: '500',
    minWidth: 80,
  },
  binHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  binInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  binText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingVertical: theme.spacing.md,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    borderRadius: 8,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  itemSku: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  itemAvailability: {
    fontSize: 12,
    color: '#64748B',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  quantityDisplay: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  quantityText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    minWidth: 32,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    minHeight: 48,
  },
});
