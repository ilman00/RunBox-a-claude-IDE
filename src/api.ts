import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (userData: any) => api.post("/api/auth/login", userData);
export const register = (userData: any) => api.post("/api/auth/register", userData);

// Projects
export const userProjects = () => api.get("/api/projects");
export const createProject = (data: any) => api.post("/api/projects", data);

export default api;
