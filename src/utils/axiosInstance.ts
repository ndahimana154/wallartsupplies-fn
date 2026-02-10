import axios from "axios"
import { getAuth, clearAuth } from './auth'
import { store } from '../store'
import { apiLoading, apiSuccess, apiError, apiIdle } from '../store/slices/apiSlice'
import { setGlobalError } from '../store/slices/appSlice'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // Increased timeout to give slower networks more time
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 120000,
    headers: {
        "Content-Type": "application/json"
    }
})

export const adminPhone = "+8613255793008"
export const frontendUrl = "https://www.hanjji.com"
export const adminEmail = "sales@hanjji.com"
export const companyAddress = "Jindong District, Jinhua City, Zhejiang Province, China"
axiosInstance.interceptors.request.use((config) => {
    // Dispatch loading globally for simple UIs that rely on a global state
    try { store.dispatch(apiLoading()) } catch (e) { }
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
    try { store.dispatch(apiIdle()) } catch (e) { }
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(
    (res) => {
        try { store.dispatch(apiSuccess()) } catch (e) { }
        try { store.dispatch(setGlobalError(null)) } catch (e) { }
        // reset to idle after success
        try { store.dispatch(apiIdle()) } catch (e) { }
        return res
    },
    (error) => {
        try { store.dispatch(apiError(error?.message || 'Request failed')) } catch (e) { }
        // Friendly global error message
        const userMessage = error?.response?.data?.message || error?.message || 'Network error. Please check your connection.'
        try { store.dispatch(setGlobalError(userMessage)) } catch (e) { }

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