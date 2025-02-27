
import axios from "axios";

const BASE_URL = "https://navisa-api.onrender.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminApi = {
  login: async (email: string, password: string) => {
    const response = await api.post("/admin/login", { email, password });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get("/admin/users/all");
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await api.get(`/admin/user/${id}`);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/admin/user/${id}`);
    return response.data;
  },

  createClientAdmin: async (data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) => {
    const response = await api.post("/admin/create-admin", data);
    return response.data;
  },

  getAllClientAdmins: async () => {
    const response = await api.get("/admin/client-admins/all");
    return response.data;
  },

  getClientAdmin: async (id: string) => {
    const response = await api.get(`/admin/client-admins/${id}`);
    return response.data;
  },

  deleteClientAdmin: async (id: string) => {
    const response = await api.delete(`/admin/client-admins/${id}`);
    return response.data;
  },

  createVisa: async (visaName: string, visaData: any) => {
    const response = await api.post(`/admin/visas/create?visa_name=${visaName}`, visaData);
    return response.data;
  },

  getAllVisas: async () => {
    const response = await api.get('/admin/visas/all');
    return response.data;
  },
};
