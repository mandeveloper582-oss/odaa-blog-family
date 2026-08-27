import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = (
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000'
).replace(/\/$/, '');

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Request failed';

    if (status === 401) {
      localStorage.removeItem('token');
    }

    toast.error(message);

    return Promise.reject(error);
  }
);

export const getPosts = (params) =>
  api.get('/posts', { params });

export const getPost = (id) =>
  api.get(`/posts/${id}`);

export const createPost = (data, config) =>
  api.post('/posts', data, config);

export const updatePost = (id, data, config) =>
  api.put(`/posts/${id}`, data, config);

export const deletePost = (id) =>
  api.delete(`/posts/${id}`);

export const likePost = (id) =>
  api.post(`/posts/${id}/like`);

export const addComment = (postId, data) =>
  api.post(`/posts/${postId}/comment`, data);

export const login = (data) =>
  api.post('/auth/login', data);

export default api;