
import { API_CONFIG } from '../../../config/api';
import { fetchWithToken } from '../../../utils/fetchWithToken';
import { Order, Picklist } from '../../../types';

export interface DashboardData {
  newOrders: Order[];
  activePicklists: Picklist[];
  readyOrders: Order[];
  stats: {
    totalOrders: number;
    totalPicklists: number;
    completedToday: number;
  };
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.dashboard}`;
  const response = await fetchWithToken<DashboardData>(url);
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  if (!response.data) {
    throw new Error('Failed to load dashboard data');
  }
  
  return response.data;
};
