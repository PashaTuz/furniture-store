import axios from 'axios';

/**
 * Спільний axios-інстанс для всього застосунку.
 * Автоматично додає базову адресу сервера та Bearer-токен до кожного запиту.
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor: перед КОЖНИМ запитом перевіряємо, чи є токен в localStorage,
// і якщо є — додаємо його в заголовок Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
