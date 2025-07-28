
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';

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

  const renderOrderCard = ({ item }: { item: any }) => (
    <Card style={[styles.orderCard, isLargeScreen && styles.gridCard]}>
      <View style={styles.orderHeader}>
        <View>
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
      <View style={styles.picklistHeader}>
        <View>
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
        <View>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.pickupTime}>
            <Ionicons name="time-outline" size={16} color="#6B7280" /> Pickup at {item.pickupTime}
          </Text>
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
    <SafeAreaView style={styles.container}>
      {!isLargeScreen && (
        <View style={styles.header}>
          <Text style={styles.title}>Orderup</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

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
    </SafeAreaView>
  );

  return <Sidebar>{content}</Sidebar>;
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  orderCard: {
    marginBottom: 12,
  },
  picklistCard: {
    marginBottom: 12,
  },
  readyCard: {
    marginBottom: 12,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: 6,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  picklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  customerName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  orderDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  progress: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  pickupTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginTop: 8,
  },
});
