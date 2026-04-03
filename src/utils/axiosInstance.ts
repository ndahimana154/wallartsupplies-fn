import axios from "axios"
import { getAuth, clearAuth } from './auth'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json"
    }
})

export const adminPhone = "+8618967445758"
export const frontendUrl = "https://www.hanjji.com"
export const adminEmail = "sales@hanjji.com"
export const companyAddress = "Jindong District, Jinhua City, Zhejiang Province, china"
axiosInstance.interceptors.request.use((config) => {
    try {
        const auth = getAuth();

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
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

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