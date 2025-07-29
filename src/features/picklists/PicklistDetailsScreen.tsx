
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
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
                  { width: `${(pickedItems / totalItems) * 100}%` }
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
      </SafeAreaView>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemContent}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSku}>SKU: {item.sku}</Text>
                <Text style={styles.itemAvailability}>
                  Available: {item.available}  QOH: {item.qoh}
                </Text>
              </View>

              <View style={styles.rightSection}>
                <View style={styles.quantitySection}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, -1)}
                    disabled={item.picked <= 0}
                  >
                    <Ionicons name="remove" size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>
                    {item.picked}/{item.needed}
                  </Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 1)}
                    disabled={item.picked >= item.needed}
                  >
                    <Ionicons name="add" size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>

                {item.status === 'picked' ? (
                  <Text style={styles.pickedText}>Picked</Text>
                ) : (
                  <TouchableOpacity 
                    style={styles.pickButton}
                    onPress={() => handleItemPick(item.id)}
                  >
                    <Text style={styles.pickButtonText}>Pick</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Buttons */}
      <View style={styles.floatingButtonContainer}>
        <SafeAreaView style={styles.floatingButtonSafeArea} edges={['bottom']}>
          <View style={styles.floatingButtons}>
            <Button
              title="Mark All Picked"
              onPress={handleMarkAllPicked}
              variant="secondary"
              style={styles.floatingButton}
            />
            <Button
              title="Proceed to Fulfillment"
              onPress={handleProceedToFulfillment}
              variant="primary"
              style={styles.floatingButton}
            />
          </View>
        </SafeAreaView>
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
  safeAreaTop: {
    backgroundColor: theme.colors.background,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
    zIndex: 1000,
  },
  floatingButtonSafeArea: {
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
  },
  floatingButtons: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    pointerEvents: 'auto',
  },
  floatingButton: {
    flex: 1,
    minHeight: 56,
  },
  headerInfo: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.success,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  binHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  scrollContainer: {
    paddingBottom: theme.spacing.xxl + 100, // Extra padding to prevent overlap with floating buttons
    flexGrow: 1,
  },
  itemCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
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
    marginBottom: 4,
  },
  itemAvailability: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    minWidth: 40,
    textAlign: 'center',
  },
  pickButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'transparent',
  },
  pickButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  pickedText: {
    color: theme.colors.text.secondary,
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  
});
