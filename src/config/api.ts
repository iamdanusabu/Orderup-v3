
import { env } from './env';

export interface ApiEndpoints {
  // Auth endpoints
  login: string;
  logout: string;
  refresh: string;
  
  // Dashboard endpoints
  dashboard: string;
  
  // Orders endpoints
  orders: string;
  orderDetails: string;
  createPicklist: string;
  
  // Picklists endpoints
  picklists: string;
  picklistDetails: string;
  updatePicklistItem: string;
  markPicklistComplete: string;
  
  // Location endpoints
  locations: string;
  
  // Packing endpoints
  packing: string;
  fulfillment: string;
}

const COMMON_ENDPOINTS: ApiEndpoints = {
  // Auth endpoints
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  
  // Dashboard endpoints
  dashboard: '/dashboard',
  
  // Orders endpoints
  orders: '/orders',
  orderDetails: '/orders',
  createPicklist: '/orders/create-picklist',
  
  // Picklists endpoints
  picklists: '/picklists',
  picklistDetails: '/picklists',
  updatePicklistItem: '/picklists/items',
  markPicklistComplete: '/picklists/complete',
  
  // Location endpoints
  locations: '/locations',
  
  // Packing endpoints
  packing: '/packing',
  fulfillment: '/fulfillment',
};

export const API_CONFIG = {
  baseURL: env.apiBaseUrl,
  endpoints: COMMON_ENDPOINTS,
  timeout: 30000,
};
