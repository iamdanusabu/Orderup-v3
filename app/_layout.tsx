
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme as useNativeColorScheme, SafeAreaProvider } from 'react-native';

import { SidebarProvider } from '../src/contexts/SidebarContext';

// Create a simple useColorScheme hook since the original is missing
const useColorScheme = () => {
  return useNativeColorScheme();
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SidebarProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </SidebarProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
