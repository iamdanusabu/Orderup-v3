
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '../../src/components/common/Button';

export default function ScanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.scanArea}>
          <Text style={styles.scanIcon}>📱</Text>
          <Text style={styles.title}>QR Code Scanner</Text>
          <Text style={styles.subtitle}>
            Scan customer QR codes to retrieve order details for quick fulfillment
          </Text>
        </View>
        
        <Button
          title="Open Camera"
          onPress={() => console.log('Open camera scanner')}
          style={styles.scanButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  scanArea: {
    alignItems: 'center',
    marginBottom: 48,
  },
  scanIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  scanButton: {
    width: '100%',
  },
});
