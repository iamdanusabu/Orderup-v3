import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Sidebar } from "../../components/common/Sidebar";
import { Toolbar } from "../../components/common/Toolbar";
import { theme } from "../../constants/theme";
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const mockNewOrders = [
  {
    id: "1",
    orderNumber: "Order #12345",
    customerName: "John Smith",
    items: 1,
    timeAgo: "10 min ago",
    status: "New" as const,
  },
  {
    id: "2",
    orderNumber: "Order #12346",
    customerName: "Emma Wilson",
    items: 5,
    timeAgo: "25 min ago",
    status: "New" as const,
  },
];

const mockActivePicklists = [
  {
    id: "1",
    name: "Picklist #789",
    progress: 42,
    picked: 5,
    total: 12,
    status: "In Progress" as const,
  },
];

const mockReadyOrders = [
  {
    id: "1",
    orderNumber: "Order #45678",
    customerName: "Sarah Johnson",
    pickupTime: "7:14 PM",
    status: "Ready" as const,
  },
  {
    id: "2",
    orderNumber: "Order #45679",
    customerName: "Michael Brown",
    pickupTime: "7:59 PM",
    status: "Ready" as const,
  },
];

export const DashboardScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const handleScan = () => {
    console.log("Open camera scanner");
  };

  const renderNewOrderCard = (item: any) => (
    <Card style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.orderDetails}>
            {item.items} items • {item.timeAgo}
          </Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <Button
        title="View Order"
        onPress={() => console.log("View order", item.id)}
        style={styles.primaryButton}
      />
    </Card>
  );

  const renderPicklistCard = (item: any) => (
    <Card style={[styles.picklistCard, isLargeScreen && styles.fullWidthCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.name}</Text>
          <Text style={styles.picklistProgress}>
            {item.picked}/{item.total} items picked
          </Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.max(5, (item.picked / item.total) * 100)}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{item.progress}%</Text>
      </View>

      <Button
        title="Continue Picking"
        onPress={() => console.log("Continue picking", item.id)}
        style={styles.primaryButton}
      />
    </Card>
  );

  const renderReadyCard = (item: any) => (
    <Card style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <View style={styles.pickupContainer}>
            <Ionicons
              name="time-outline"
              size={14}
              color={theme.colors.text.secondary}
            />
            <Text style={styles.pickupTime}>Pickup at {item.pickupTime}</Text>
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <Button
        title="Mark as Delivered"
        onPress={() => console.log("Mark delivered", item.id)}
        variant="success"
        style={styles.successButton}
      />
    </Card>
  );

  const content = (
    <SafeAreaView style={styles.container}>
      <Toolbar
        title="Dashboard"
        onScanPress={handleScan}
        showNotification={true}
        notificationCount={1}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLargeScreen ? (
          <View style={styles.gridContainer}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* New Orders Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  New Orders ({mockNewOrders.length})
                </Text>
                {mockNewOrders.map((order) => (
                  <View key={order.id}>{renderNewOrderCard(order)}</View>
                ))}
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Ready for Pickup Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Ready for Pickup ({mockReadyOrders.length})
                </Text>
                {mockReadyOrders.map((order) => (
                  <View key={order.id}>{renderReadyCard(order)}</View>
                ))}
              </View>
            </View>

            {/* Full Width Bottom Section */}
            <View style={styles.fullWidthSection}>
              <Text style={styles.sectionTitle}>
                My Assigned Picklists ({mockActivePicklists.length})
              </Text>
              {mockActivePicklists.map((picklist) => (
                <View key={picklist.id}>{renderPicklistCard(picklist)}</View>
              ))}
            </View>
          </View>
        ) : (
          <View>
            {/* Mobile Layout - Stack sections vertically */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                New Orders ({mockNewOrders.length})
              </Text>
              {mockNewOrders.map((order) => (
                <View key={order.id}>{renderNewOrderCard(order)}</View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                My Assigned Picklists ({mockActivePicklists.length})
              </Text>
              {mockActivePicklists.map((picklist) => (
                <View key={picklist.id}>{renderPicklistCard(picklist)}</View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Ready for Pickup ({mockReadyOrders.length})
              </Text>
              {mockReadyOrders.map((order) => (
                <View key={order.id}>{renderReadyCard(order)}</View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  leftColumn: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: theme.spacing.md,
  },
  fullWidthSection: {
    width: "100%",
    marginTop: theme.spacing.lg,
  },
  section: {
    marginVertical: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  orderCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  picklistCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  fullWidthCard: {
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: theme.typography.fontSize,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  customerName: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  orderDetails: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.tertiary,
  },
  picklistProgress: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginRight: theme.spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.secondary,
    fontWeight: "600",
    minWidth: 35,
  },
  pickupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickupTime: {
    fontSize: theme.typography.fontSize,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
  },
  successButton: {
    backgroundColor: "#FFFFFF",
  },
});