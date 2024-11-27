import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si non authentifié
      window.location.href = '/connexion';
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // Statistiques
  getStats: (dateRange: string) => api.get(`/admin/stats?range=${dateRange}`),
  
  // SEO
  getSeoSettings: () => api.get('/admin/seo'),
  updateSeoSettings: (data: any) => api.post('/admin/seo', data),
  
  // Promotions
  getPromotions: () => api.get('/admin/promotions'),
  createPromotion: (data: any) => api.post('/admin/promotions', data),
  updatePromotion: (id: string, data: any) => api.put(`/admin/promotions/${id}`, data),
  deletePromotion: (id: string) => api.delete(`/admin/promotions/${id}`),
  
  // Messages
  getMessages: () => api.get('/admin/messages'),
  getMessage: (id: string) => api.get(`/admin/messages/${id}`),
  replyToMessage: (id: string, content: string) => 
    api.post(`/admin/messages/${id}/reply`, { content }),
  markMessageAsRead: (id: string) => api.put(`/admin/messages/${id}/read`),
  
  // Utilisateurs
  getUsers: () => api.get('/admin/users'),
  createUser: (data: any) => api.post('/admin/users', data),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
};

export default api;