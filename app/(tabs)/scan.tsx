import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../src/components/common/Button';
import { Sidebar } from '../../src/components/common/Sidebar';
import { Toolbar } from '../../src/components/common/Toolbar';
import { theme } from '../../src/constants/theme';

export default function ScanScreen() {
  const handleScan = () => {
    console.log('Open camera scanner');
  };

  const content = (
    <View style={styles.container}>
      <Toolbar 
        title="Scan" 
        onScanPress={handleScan}
      />
      <View style={styles.content}>
        <View style={styles.scanArea}>
          <Ionicons name="qr-code-outline" size={80} color={theme.colors.text.secondary} />
          <Text style={styles.title}>QR Code Scanner</Text>
          <Text style={styles.subtitle}>
            Scan customer QR codes to retrieve order details for quick fulfillment
          </Text>
        </View>

        <Button
          title="Open Camera"
          onPress={handleScan}
          style={styles.scanButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { paddingBottom: Platform.OS === 'android' ? 80 : 20 }]}>
        <Text style={styles.text}>Scan Screen</Text>
        <Text style={styles.subtitle}>QR Code scanner will be implemented here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  scanArea: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl * 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  scanButton: {
    minWidth: 200,
  },
  text: {
    fontSize: 20,
  },
});