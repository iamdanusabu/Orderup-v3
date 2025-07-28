
import Constants from 'expo-constants';

export type Environment = 'development' | 'staging' | 'uat' | 'beta' | 'production';

export interface EnvConfig {
  apiBaseUrl: string;
  environment: Environment;
  appName: string;
  version: string;
}

const getEnvironment = (): Environment => {
  const releaseChannel = Constants.expoConfig?.releaseChannel;
  
  if (releaseChannel === 'production') return 'production';
  if (releaseChannel === 'beta') return 'beta';
  if (releaseChannel === 'uat') return 'uat';
  if (releaseChannel === 'staging') return 'staging';
  
  return 'development';
};

const configs: Record<Environment, EnvConfig> = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
    environment: 'development',
    appName: 'OrderUp Dev',
    version: '1.0.0-dev',
  },
  staging: {
    apiBaseUrl: 'https://api-staging.orderup.com/api',
    environment: 'staging',
    appName: 'OrderUp Staging',
    version: '1.0.0-staging',
  },
  uat: {
    apiBaseUrl: 'https://api-uat.orderup.com/api',
    environment: 'uat',
    appName: 'OrderUp UAT',
    version: '1.0.0-uat',
  },
  beta: {
    apiBaseUrl: 'https://api-beta.orderup.com/api',
    environment: 'beta',
    appName: 'OrderUp Beta',
    version: '1.0.0-beta',
  },
  production: {
    apiBaseUrl: 'https://api.orderup.com/api',
    environment: 'production',
    appName: 'OrderUp',
    version: '1.0.0',
  },
};

export const env = configs[getEnvironment()];
