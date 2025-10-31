import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const login = (userData: any) => api.post("/api/auth/login", userData)
export const register = (userData: any) => api.post("/api/auth/register", userData)
export const userProjects = () => api.get("/api/projects")