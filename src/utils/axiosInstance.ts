import axios from "axios"
import { getToken, getAuth, clearAuth } from './auth'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

export const adminPhone = import.meta.env.VITE_ADMIN_PHONE_NUMBER
export const frontendUrl = import.meta.env.VITE_FRONTEND_URL
export const adminEmail = import.meta.env.VITE_ADMIN_EMAIL_ADDRESS
export const companyAddress = import.meta.env.VITE_COMPANY_ADDRESS
axiosInstance.interceptors.request.use((config) => {
    try {
        const auth = getAuth();
        // only check expiry if we actually have an auth payload
        if (auth && Date.now() > auth.expiry) {
            clearAuth();
            window.location.href = '/a/login';
            return Promise.reject(new Error('Session expired'));
        }

        const token = auth?.token ?? null;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    } catch (err) {
        // silent fallthrough
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// Response interceptor: if server returns 401, clear auth and redirect to login
axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error?.response?.status === 401) {
            try {
                clearAuth();
            } catch (e) { }
            window.location.href = '/a/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance