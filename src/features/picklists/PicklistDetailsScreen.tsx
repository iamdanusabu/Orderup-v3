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
  const totalItems = items.length;
  const pickedItems = items.filter(item => item.status === 'picked').length;

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
      prevItems.map(item =>
        item.id === itemId
          ? { 
              ...item, 
              picked: Math.max(0, Math.min(item.needed, item.picked + change))
            }
          : item
      )
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

      <ScrollView style={styles.content}>
        {items.map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <View style={styles.itemContent}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSku}>SKU: {item.sku}</Text>
                <Text style={styles.itemAvailability}>
                  Available: {item.available}  QOH: {item.qoh}
                </Text>
              </View>

              <View style={styles.quantitySection}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, -1)}
                    disabled={item.picked <= 0}
                  >
                    <Ionicons name="remove" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {item.picked}/{item.needed}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 1)}
                    disabled={item.picked >= item.needed}
                  >
                    <Ionicons name="add" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                <View style={styles.itemActions}>
                <View style={styles.pickedBadge}>
                  <Text style={styles.pickedText}>Picked</Text>
                </View>
              </View>
              </View>
            </View>
          </Card>
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
  itemCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  itemSku: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  itemAvailability: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  quantitySection: {
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  quantityButton: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    minWidth: 40,
    textAlign: 'center',
  },
  pickedBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: 80,
    alignItems: 'center',
  },
  pickedText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
    minHeight: 56,
  },
});