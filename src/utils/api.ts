import axiosInstance from './axiosInstance';
import { handleError } from './requests/welcome';

export interface ApiConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    params?: Record<string, any>;
    data?: any;
    headers?: Record<string, string>;
}

export const apiRequest = async <T = any>(
    url: string,
    config: ApiConfig = {}
): Promise<{ success: boolean; data?: T; message?: string }> => {
    try {
        const { method = 'GET', params, data, headers } = config;

        const response = await axiosInstance({
            method,
            url,
            params,
            data,
            headers,
        });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// Convenience methods
export const api = {
    get: <T = any>(url: string, params?: Record<string, any>) =>
        apiRequest<T>(url, { method: 'GET', params }),

    post: <T = any>(url: string, data?: any, params?: Record<string, any>) =>
        apiRequest<T>(url, { method: 'POST', data, params }),

    put: <T = any>(url: string, data?: any) =>
        apiRequest<T>(url, { method: 'PUT', data }),

    delete: <T = any>(url: string) =>
        apiRequest<T>(url, { method: 'DELETE' }),

    patch: <T = any>(url: string, data?: any) =>
        apiRequest<T>(url, { method: 'PATCH', data }),
};