import axios from "axios"

const getToken = () => {
    return sessionStorage.getItem("token");
}

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

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default axiosInstance