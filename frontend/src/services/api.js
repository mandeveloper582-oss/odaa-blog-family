import axios from 'axios';
import toast from 'react-hot-toast';

// Use environment variable or fallback
const BASE_URL = import.meta.env.VITE_API_URL || 'https://odaa-blog-family.orender.com';
const API_URL = `${BASE_URL.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL: API_URL,
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
    const status = err?.response?.status;
    const msg = err?.response?.data?.message || err.message || 'Request failed';
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    toast.error(msg);
    return Promise.reject(err);
  }
);

export const getPosts = (params) => api.get('/posts', { params });
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data, config) => api.post('/posts', data, config);
export const updatePost = (id, data, config) => api.put(`/posts/${id}`, data, config);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const likePost = (id) => api.post(`/posts/${id}/like`);
export const addComment = (postId, data) => api.post(`/posts/${postId}/comment`, data);
export const login = (data) => api.post('/auth/login', data);

export default api;