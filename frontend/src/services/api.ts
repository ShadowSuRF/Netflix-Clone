import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) => api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Movies
export const movieAPI = {
  getAll: (params?: Record<string, string | number>) => api.get('/movies', { params }),
  getById: (id: string) => api.get(`/movies/${id}`),
  getTrending: () => api.get('/movies/trending'),
  getFeatured: () => api.get('/movies/featured'),
  getNewReleases: () => api.get('/movies/new-releases'),
  getByGenre: (genre: string) => api.get(`/movies/genre/${genre}`),
  search: (q: string) => api.get('/movies/search', { params: { q } }),
  toggleMyList: (id: string) => api.post(`/movies/${id}/my-list`),
  updateProgress: (id: string, progress: number) => api.post(`/movies/${id}/progress`, { progress }),
};

// User
export const userAPI = {
  getMyList: () => api.get('/user/my-list'),
  getWatchHistory: () => api.get('/user/watch-history'),
  updateProfile: (data: { name?: string; avatar?: string }) => api.put('/user/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) => api.put('/user/change-password', data),
};

export default api;
