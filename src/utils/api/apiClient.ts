import axios from 'axios';
import { handleApiError } from './errorHandler';
import { sessionService } from '../../services/security/SessionService';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = sessionService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionService.clearSession();
      window.location.href = '/connexion';
    }
    return Promise.reject(handleApiError(error));
  }
);

export default apiClient;