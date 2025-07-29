
import { API_CONFIG } from '../../../config/api';
import { fetchWithToken } from '../../../utils/fetchWithToken';
import { paginatedFetcher, PaginatedResponse } from '../../../utils/paginatedFetcher';
import { Order } from '../../../types';

export interface OrdersFilters {
  status?: string;
  search?: string;
  source?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const getOrders = async (
  page: number = 1,
  limit: number = 20,
  filters: OrdersFilters = {}
): Promise<PaginatedResponse<Order>> => {
  const params = new URLSearchParams({
    pageNo: page.toString(),
    limit: limit.toString(),
    ...Object.fromEntries(
      Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => [key, String(value)])
    )
  });

  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.orders}?${params.toString()}`;
  return await paginatedFetcher<Order>(url);
};

export const getOrderDetails = async (orderId: string): Promise<Order> => {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.orderDetails}/${orderId}`;
  const response = await fetchWithToken<Order>(url);
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  if (!response.data) {
    throw new Error('Order not found');
  }
  
  return response.data;
};

export const createPicklistFromOrders = async (orderIds: string[]): Promise<{ picklistId: string }> => {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.createPicklist}`;
  const response = await fetchWithToken<{ picklistId: string }>(url, {
    method: 'POST',
    body: JSON.stringify({ orderIds }),
  });
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  if (!response.data) {
    throw new Error('Failed to create picklist');
  }
  
  return response.data;
};
