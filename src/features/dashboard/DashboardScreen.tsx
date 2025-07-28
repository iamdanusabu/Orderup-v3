import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Toolbar } from '../../components/common/Toolbar';
import { theme } from '../../constants/theme';

// Mock data
const mockNewOrders = [
  {
    id: '1',
    orderNumber: 'Order #12345',
    customerName: 'John Doe',
    items: 3,
    timeAgo: '5 min ago',
    status: 'New' as const,
  },
  {
    id: '2',
    orderNumber: 'Order #12346',
    customerName: 'Jane Smith',
    items: 2,
    timeAgo: '10 min ago',
    status: 'New' as const,
  },
  {
    id: '3',
    orderNumber: 'Order #12347',
    customerName: 'Bob Johnson',
    items: 5,
    timeAgo: '15 min ago',
    status: 'New' as const,
  },
];

const mockActivePicklists = [
  {
    id: '1',
    name: 'Picklist #001',
    progress: 75,
    assignedTo: 'Alice Brown',
    status: 'In Progress' as const,
  },
  {
    id: '2',
    name: 'Picklist #002',
    progress: 50,
    assignedTo: 'Charlie Davis',
    status: 'In Progress' as const,
  },
];

const mockReadyOrders = [
  {
    id: '1',
    orderNumber: 'Order #45678',
    customerName: 'Sarah Johnson',
    pickupTime: '2:30 PM',
    status: 'Ready' as const,
  },
  {
    id: '2',
    orderNumber: 'Order #45679',
    customerName: 'Michael Brown',
    pickupTime: '3:15 PM',
    status: 'Ready' as const,
  },
];

export const DashboardScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const numColumns = isLargeScreen ? 2 : 1;

  const handleScan = () => {
    console.log('Open camera scanner');
  };

  const renderOrderCard = ({ item }: { item: any }) => (
    <Card style={[styles.orderCard, isLargeScreen && styles.gridCard]}>
      <View style={styles.orderHeader}>
        <View style={styles.orderContent}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.orderDetails}>
            {item.items} items • {item.timeAgo}
          </Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <Button
        title="Accept Order"
        onPress={() => console.log('Accept order', item.id)}
        style={styles.actionButton}
      />
    </Card>
  );

  const renderPicklistCard = ({ item }: { item: any }) => (
    <Card style={[styles.picklistCard, isLargeScreen && styles.gridCard]}>
      <View style={styles.orderHeader}>
        <View style={styles.orderContent}>
          <Text style={styles.orderNumber}>{item.name}</Text>
          <Text style={styles.customerName}>Assigned to {item.assignedTo}</Text>
          <Text style={styles.progress}>{item.progress}% complete</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <Button
        title="Continue Picking"
        onPress={() => console.log('Continue picking', item.id)}
        style={styles.actionButton}
      />
    </Card>
  );

  const renderReadyCard = ({ item }: { item: any }) => (
    <Card style={[styles.readyCard, isLargeScreen && styles.gridCard]}>
      <View style={styles.orderHeader}>
        <View style={styles.orderContent}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <View style={styles.pickupTimeContainer}>
            <Ionicons name="time-outline" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.pickupTime}>Pickup at {item.pickupTime}</Text>
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <Button
        title="Mark as Collected"
        onPress={() => console.log('Mark collected', item.id)}
        variant="success"
        style={styles.actionButton}
      />
    </Card>
  );

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Dashboard" 
        onScanPress={handleScan}
        showNotification={true}
        notificationCount={1}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* New Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Orders ({mockNewOrders.length})</Text>
          {isLargeScreen ? (
            <FlatList
              data={mockNewOrders}
              renderItem={renderOrderCard}
              numColumns={numColumns}
              key={numColumns}
              scrollEnabled={false}
            />
          ) : (
            mockNewOrders.map((order) => (
              <View key={order.id}>
                {renderOrderCard({ item: order })}
              </View>
            ))
          )}
        </View>

        {/* Active Picklists Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Picklists ({mockActivePicklists.length})</Text>
          {isLargeScreen ? (
            <FlatList
              data={mockActivePicklists}
              renderItem={renderPicklistCard}
              numColumns={numColumns}
              key={`picklist-${numColumns}`}
              scrollEnabled={false}
            />
          ) : (
            mockActivePicklists.map((picklist) => (
              <View key={picklist.id}>
                {renderPicklistCard({ item: picklist })}
              </View>
            ))
          )}
        </View>

        {/* Ready for Pickup Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready for Pickup ({mockReadyOrders.length})</Text>
          {isLargeScreen ? (
            <FlatList
              data={mockReadyOrders}
              renderItem={renderReadyCard}
              numColumns={numColumns}
              key={`ready-${numColumns}`}
              scrollEnabled={false}
            />
          ) : (
            mockReadyOrders.map((order) => (
              <View key={order.id}>
                {renderReadyCard({ item: order })}
              </View>
            ))
          )}
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
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  section: {
    marginVertical: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  orderCard: {
    marginBottom: theme.spacing.sm,
  },
  picklistCard: {
    marginBottom: theme.spacing.sm,
  },
  readyCard: {
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
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  customerName: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  orderDetails: {
    fontSize: 11,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.sm,
  },
  progress: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  pickupTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  pickupTime: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  actionButton: {
    marginTop: theme.spacing.xs,
  },
});