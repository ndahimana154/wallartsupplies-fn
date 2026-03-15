import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useApi = <T>(
    apiCall: () => Promise<ApiResponse<T>>,
    dependencies: any[] = [],
    options: {
        onSuccess?: (data: T) => void;
        onError?: (error: string) => void;
        redirectOnError?: string;
    } = {}
): UseApiState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiCall();

            if (response.success && response.data) {
                setData(response.data);
                options.onSuccess?.(response.data);
            } else {
                const errorMsg = response.message || 'An error occurred';
                setError(errorMsg);
                options.onError?.(errorMsg);
                if (options.redirectOnError) {
                    navigate(options.redirectOnError);
                }
            }
        } catch (err: any) {
            const errorMsg = err.message || 'Something went wrong';
            setError(errorMsg);
            options.onError?.(errorMsg);
            if (options.redirectOnError) {
                navigate(options.redirectOnError);
            }
        } finally {
            setLoading(false);
        }
    }, [apiCall, navigate, options]);

    useEffect(() => {
        fetchData();
    }, dependencies);

    return { data, loading, error, refetch: fetchData };
};