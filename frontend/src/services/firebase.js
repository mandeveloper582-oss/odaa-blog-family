import api from './api';
import { mockPosts } from '../data/mockdata';

// ========================
// AUTH FUNCTIONS
// ========================

// Admin login with Firebase Authentication
export const adminLogin = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (err) {
    return { error: err?.response?.data?.message || err.message };
  }
};

export const adminLogout = async () => {
  try {
    localStorage.removeItem('token');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getCurrentUser = async () => {
  if (!localStorage.getItem('token')) return null;

  try {
    const res = await api.post('/auth/me');
    return res.data;
  } catch (err) {
    return null;
  }
};


// ========================
// POST FUNCTIONS
// ========================

// Get all posts with optional filters
export const getPosts = async (filters = {}) => {
  try {
    const res = await api.get('/posts', { params: filters });
    return { success: true, posts: res.data };
  } catch (err) {
    return { success: true, posts: mockPosts };
  }
};

// Get single post
export const getPost = async (postId) => {
  try {
    const res = await api.get(`/posts/${postId}`);
    return { success: true, post: res.data };
  } catch (err) {
    const mockPost = mockPosts.find((p) => p._id === postId);
    if (mockPost) return { success: true, post: mockPost };
    return { success: false, error: err.message };
  }
};

// Create post (admin only)
export const createPost = async (postData, imageFile = null) => {
  try {
    if (imageFile) {
      const form = new FormData();
      Object.entries(postData).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          form.append(key, JSON.stringify(value));
        } else {
          form.append(key, value);
        }
      });
      form.append('image', imageFile);
      const res = await api.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      return { success: true, post: res.data };
    }

    const res = await api.post('/posts', postData);
    return { success: true, post: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

// Update post (admin only)
export const updatePost = async (postId, postData, imageFile = null) => {
  try {
    if (imageFile) {
      const form = new FormData();
      Object.entries(postData).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          form.append(key, JSON.stringify(value));
        } else {
          form.append(key, value);
        }
      });
      form.append('image', imageFile);
      await api.put(`/posts/${postId}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      return { success: true };
    }

    await api.put(`/posts/${postId}`, postData);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

// Delete post (admin only)
export const deletePost = async (postId) => {
  try {
    await api.delete(`/posts/${postId}`);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Like post
export const likePost = async (postId) => {
  try {
    const res = await api.post(`/posts/${postId}/like`);
    return { success: true, likes: res.data.likes };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Increment views
export const incrementViews = async (postId) => {
  try {
    await api.get(`/posts/${postId}`); // backend increments views on GET
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


// ========================
// COMMENT FUNCTIONS
// ========================

// Get comments for post
export const getComments = async (postId) => {
  try {
    const res = await api.get(`/posts/${postId}`);
    return { success: true, comments: res.data.comments || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Add comment to post
export const addComment = async (postId, commentData) => {
  try {
    const res = await api.post(`/posts/${postId}/comment`, commentData);
    return { success: true, comment: res.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Delete comment
export const deleteComment = async (commentId, postId) => {
  try {
    await api.delete(`/posts/${postId}/comment/${commentId}`);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


// ========================
// STORAGE FUNCTIONS
// ========================

// Upload image is not supported as a separate endpoint yet.
export const uploadImage = async () => ({ success: false, error: 'Use createPost or updatePost with an image file' });

// Delete image from Firebase Storage
export const deleteImage = async () => ({ success: false, error: 'Not implemented' });
