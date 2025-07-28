
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';

// Mock data
const mockNewOrders = [
  {
    id: '1',
    orderNumber: 'Order #12345',
    customerName: 'John Smith',
    items: 3,
    timeAgo: '10 min ago',
    status: 'New' as const,
  },
  {
    id: '2',
    orderNumber: 'Order #12346',
    customerName: 'Emma Wilson',
    items: 5,
    timeAgo: '25 min ago',
    status: 'New' as const,
  },
];

const mockAssignedPicklists = [
  {
    id: '1',
    name: 'Picklist #789',
    itemsPicked: 5,
    totalItems: 12,
    progress: 42,
    status: 'In Progress' as const,
  },
  {
    id: '2',
    name: 'Picklist #789',
    itemsPicked: 5,
    totalItems: 12,
    progress: 42,
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orderup</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Text style={styles.bell}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* New Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Orders ({mockNewOrders.length})</Text>
          {mockNewOrders.map((order) => (
            <Card key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <Text style={styles.customerName}>{order.customerName}</Text>
                  <Text style={styles.orderDetails}>
                    {order.items} items • {order.timeAgo}
                  </Text>
                </View>
                <StatusBadge status={order.status} />
              </View>
              <Button
                title="Accept Order"
                onPress={() => console.log('Accept order', order.id)}
                style={styles.actionButton}
              />
            </Card>
          ))}
        </View>

        {/* My Assigned Picklists Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Assigned Picklists ({mockAssignedPicklists.length})</Text>
          {mockAssignedPicklists.map((picklist) => (
            <Card key={picklist.id} style={styles.picklistCard}>
              <View style={styles.picklistHeader}>
                <View>
                  <Text style={styles.picklistName}>{picklist.name}</Text>
                  <Text style={styles.picklistProgress}>
                    {picklist.itemsPicked}/{picklist.totalItems} items picked • {picklist.progress}%
                  </Text>
                </View>
                <StatusBadge status={picklist.status} variant="picklist" />
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${picklist.progress}%` },
                  ]}
                />
              </View>
              <Button
                title="Continue Picking"
                onPress={() => console.log('Continue picking', picklist.id)}
                style={styles.actionButton}
              />
            </Card>
          ))}
        </View>

        {/* Ready for Pickup Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready for Pickup ({mockReadyOrders.length})</Text>
          {mockReadyOrders.map((order) => (
            <Card key={order.id} style={styles.readyCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <Text style={styles.customerName}>{order.customerName}</Text>
                  <Text style={styles.pickupTime}>📅 Pickup at {order.pickupTime}</Text>
                </View>
                <StatusBadge status={order.status} />
              </View>
              <Button
                title="Mark as Collected"
                onPress={() => console.log('Mark collected', order.id)}
                variant="success"
                style={styles.actionButton}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  bell: {
    fontSize: 24,
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
    marginTop: 2,
  },
  orderDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  picklistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  picklistProgress: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  pickupTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  actionButton: {
    marginTop: 8,
  },
});
