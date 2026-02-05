import { refreshAccessToken } from "@/api/auth";
import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "./authToken";

const getBaseURL = () => {
    switch (import.meta.env.MODE) {
        case 'development':
            return '/api';  // Uses proxy from vite.config.js
        case 'production':
            return `${import.meta.env.VITE_PRODUCTION_API_URL}/api`;
        default:
            return '/api';
    }
};


const api = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': import.meta.env.VITE_PRODUCTION_API_URL
    }
});

// Attach access token on refresh
api.interceptors.request.use((config) => {
    const token = getStoredAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

// Refresh access token after it expires
api.interceptors.response.use(
    (res) => res, 
    async (error) => {
        const originalRequest = error.config;
        
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/refresh')    
        ) {
            originalRequest._retry = true;

            try {
                const { accessToken: newToken } = await refreshAccessToken();
                setStoredAccessToken(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest)
            } catch (err) {
                console.error('Refresh token failed', err)
            }
        };

        return Promise.reject(error);
    }
)

export default api;