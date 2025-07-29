
import { fetchWithToken } from './fetchWithToken';

export interface PaginatedResponse<T> {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  nextPageURL: string | null;
  data: T[];
}

export const paginatedFetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<PaginatedResponse<T>> => {
  const response = await fetchWithToken<PaginatedResponse<T>>(url, options);
  
  if (response.error) {
    const error = new Error(response.error) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  
  if (!response.data) {
    throw new Error('No data received from server');
  }
  
  return response.data;
};

// Request deduplication cache
const ongoingRequests: Record<string, Promise<PaginatedResponse<any>>> = {};

export const getCachedPaginatedData = async <T>(
  url: string,
  options?: RequestInit
): Promise<PaginatedResponse<T>> => {
  if (ongoingRequests[url]) {
    return ongoingRequests[url];
  }
  
  const request = paginatedFetcher<T>(url, options)
    .finally(() => {
      delete ongoingRequests[url];
    });
  
  ongoingRequests[url] = request;
  return request;
};
