
import { Redirect } from 'expo-router';
import { LoginScreen } from '../src/features/auth/LoginScreen';

export default function App() {
  // For now, show login screen. In a real app, you'd check auth state here
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  return <LoginScreen />;
}
