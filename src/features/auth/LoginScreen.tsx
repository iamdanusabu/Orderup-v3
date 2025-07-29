
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { env } from '../../config/env';
import { theme } from '../../constants/theme';

export const LoginScreen: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login attempt:', { domain, username, password });
  };

  return (
    <ScreenWrapper 
      scrollable={true}
      keyboardAvoiding={true}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Domain Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your domain"
              value={domain}
              onChangeText={setDomain}
              autoCapitalize="none"
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor={theme.colors.text.tertiary}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                  size={20} 
                  color={theme.colors.text.secondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            style={styles.signInButton}
          />
        </View>

        <Text style={styles.version}>Version {env.version}</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    minHeight: '100%',
  },
  form: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text.primary,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: theme.spacing.md,
    top: theme.spacing.md,
  },
  signInButton: {
    marginTop: theme.spacing.sm,
  },
  version: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize,
    marginTop: theme.spacing.xl,
  },
});
