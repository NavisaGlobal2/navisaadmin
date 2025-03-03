
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const BASE_URL = 'https://navisa-api.onrender.com/api/v1';
// const BASE_URL = 'http://localhost:5050/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle JWT errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to expired JWT or related auth issues
    const isJwtError = 
      error.response?.data?.message?.includes('token has invalid claims: token is expired') ||
      error.response?.data?.message?.includes('invalid JWT');
    
    // Check for unauthorized errors
    const isUnauthorized = 
      error.response?.data?.error === 'Unauthorized' ||
      error.response?.status === 401;

    if (isJwtError) {
      // Clear token and userData from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      
      // Show toast notification to user
      toast({
        title: 'Session Expired',
        description: 'Your session has expired. Please log in again.',
        variant: 'destructive',
      });
      
      // Reload the page to force redirect to login
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } else if (isUnauthorized) {
      // Show toast notification for unauthorized access
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to perform this action. Please contact your administrator.',
        variant: 'destructive',
      });
    }
    
    return Promise.reject(error);
  }
);

export const adminApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/admin/login', { email, password });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users/all');
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

  createClientAdmin: async (data: { email: string; first_name: string; last_name: string; }) => {
    const response = await api.post('/admin/create-admin', data);
    return response.data;
  },

  getAllClientAdmins: async () => {
    const response = await api.get('/admin/client-admins/all');
    return response.data;
  },

  getAllClientAdminsWithClients: async () => {
    const response = await api.get('/admin/clients-and-admins/all');
    return response.data;
  },

  getClientAdmin: async (id: string) => {
    const response = await api.get(`/admin/client-admins/${id}`);
    return response.data;
  },

  assignClient: async (data: { admin_id: string; client_id: string }) => {
    const response = await api.post('/admin/assign-client', data);
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

  createSuperAdmin: async (email: string) => {
    const response = await api.post('/admin/create-super-admin', { email });
    return response.data;
  },

  //Remove uper Admin
  removeSuperAdmin: async (email: string) => {
    const response = await api.post('/admin/remove-super-admin', { email });
    return response.data;
  },

  getAllSuperAdmins: async () => {
    const response = await api.get('/admin/super-admins/all');
    return response.data;
  },

  getAllApplications: async () => {
    const response = await api.get('/admin/all-applications');
    return response.data;
  },

  approveDocument: async (id: string) => {
    const response = await api.put(`/admin/application/approve-document/${id}`);
    return response.data;
  },

  rejectDocument: async (id: string) => {
    const response = await api.put(`/admin/application/reject-document/${id}`);
    return response.data;
  },
  getMyClients: async () => {
    const response = await api.get('/client-admin/clients/all');
    return response.data;
  },

  getUserDetails: async (id: string) => {
    const response = await api.get(`/admin/user/${id}`);
    return response.data;
  },
};
