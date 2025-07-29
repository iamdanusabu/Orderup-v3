
import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T;
}

interface UseApiReturn<T, P extends any[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...params: P) => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
}

export function useApi<T, P extends any[]>(
  apiFunction: (...params: P) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T, P> {
  const { immediate = false, initialData = null } = options;
  
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastParams, setLastParams] = useState<P | null>(null);

  const execute = useCallback(async (...params: P) => {
    try {
      setLoading(true);
      setError(null);
      setLastParams(params);
      
      const result = await apiFunction(...params);
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const refresh = useCallback(async () => {
    if (lastParams) {
      await execute(...lastParams);
    }
  }, [execute, lastParams]);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
    setLastParams(null);
  }, [initialData]);

  useEffect(() => {
    if (immediate && lastParams) {
      execute(...lastParams);
    }
  }, [immediate, execute, lastParams]);

  return {
    data,
    loading,
    error,
    execute,
    refresh,
    reset,
  };
}

// Specialized hook for paginated data
export function usePaginatedApi<T>(
  apiFunction: (page: number, limit: number, ...params: any[]) => Promise<{ data: T[]; totalPages: number; totalRecords: number; pageNo: number }>,
  limit: number = 20
) {
  const [allData, setAllData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalRecords: 0,
    hasMore: true,
  });

  const {
    data: currentPageData,
    loading,
    error,
    execute,
  } = useApi(apiFunction);

  const loadPage = useCallback(async (page: number, ...params: any[]) => {
    const result = await execute(page, limit, ...params);
    if (result) {
      if (page === 1) {
        setAllData(result.data);
      } else {
        setAllData(prev => [...prev, ...result.data]);
      }
      
      setPagination({
        page: result.pageNo,
        totalPages: result.totalPages,
        totalRecords: result.totalRecords,
        hasMore: result.pageNo < result.totalPages,
      });
    }
  }, [execute, limit]);

  const loadMore = useCallback((...params: any[]) => {
    if (pagination.hasMore && !loading) {
      return loadPage(pagination.page + 1, ...params);
    }
  }, [loadPage, pagination.hasMore, pagination.page, loading]);

  const refresh = useCallback((...params: any[]) => {
    return loadPage(1, ...params);
  }, [loadPage]);

  return {
    data: allData,
    loading,
    error,
    pagination,
    loadMore,
    refresh,
    hasMore: pagination.hasMore,
  };
}
