
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

export const fetchWithToken = async <T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    const { skipAuth = false, ...fetchOptions } = options;
    
    // Get auth token if not skipping auth
    let token: string | null = null;
    if (!skipAuth) {
      token = await AsyncStorage.getItem('auth_token');
    }
    
    // Setup headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept-encoding': 'gzip',
      ...fetchOptions.headers,
    };
    
    if (token && !skipAuth) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make the request
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      return {
        error: responseData.message || `HTTP ${response.status}`,
        status: response.status,
      };
    }
    
    return {
      data: responseData,
      status: response.status,
    };
  } catch (error) {
    console.error('Network error:', error);
    return {
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
  }
};
