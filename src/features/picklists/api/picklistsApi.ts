
import { API_CONFIG } from '../../../config/api';
import { fetchWithToken } from '../../../utils/fetchWithToken';
import { paginatedFetcher, PaginatedResponse } from '../../../utils/paginatedFetcher';
import { Picklist } from '../../../types';

export interface PicklistsFilters {
  status?: string;
  assignedTo?: string;
  search?: string;
}

export interface PicklistItem {
  id: string;
  name: string;
  sku: string;
  available: number;
  qoh: number;
  needed: number;
  picked: number;
  status: 'pending' | 'picked';
}

export interface PicklistDetails extends Picklist {
  items: PicklistItem[];
  orders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
  }>;
}

export const getPicklists = async (
  page: number = 1,
  limit: number = 20,
  filters: PicklistsFilters = {}
): Promise<PaginatedResponse<Picklist>> => {
  const params = new URLSearchParams({
    pageNo: page.toString(),
    limit: limit.toString(),
    ...Object.fromEntries(
      Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => [key, String(value)])
    )
  });

  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.picklists}?${params.toString()}`;
  return await paginatedFetcher<Picklist>(url);
};

export const getPicklistDetails = async (picklistId: string): Promise<PicklistDetails> => {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.picklistDetails}/${picklistId}`;
  const response = await fetchWithToken<PicklistDetails>(url);
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  if (!response.data) {
    throw new Error('Picklist not found');
  }
  
  return response.data;
};

export const updatePicklistItem = async (
  picklistId: string,
  itemId: string,
  picked: number
): Promise<void> => {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.updatePicklistItem}/${picklistId}/${itemId}`;
  const response = await fetchWithToken(url, {
    method: 'PUT',
    body: JSON.stringify({ picked }),
  });
  
  if (response.error) {
    throw new Error(response.error);
  }
};

export const markAllItemsPicked = async (picklistId: string): Promise<void> => {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.picklistDetails}/${picklistId}/mark-all-picked`;
  const response = await fetchWithToken(url, {
    method: 'PUT',
  });
  
  if (response.error) {
    throw new Error(response.error);
  }
};

export const completePicklist = async (picklistId: string): Promise<void> => {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.markPicklistComplete}/${picklistId}`;
  const response = await fetchWithToken(url, {
    method: 'PUT',
  });
  
  if (response.error) {
    throw new Error(response.error);
  }
};
