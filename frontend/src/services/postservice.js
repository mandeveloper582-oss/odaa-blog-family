import api from './api';

// Get all posts
export const getPosts = async (filters = {}) => {
  try {
    const res = await api.get('/posts');
    return res.data;
  } catch (err) {
    console.error('Error getting posts:', err);
    throw err;
  }
};

// Get single post
export const getPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error getting post:', err);
    throw err;
  }
};

// Create post
export const createPost = async (postData, imageFile = null) => {
  try {
    const form = new FormData();
    form.append('title', postData.title);
    form.append('content', postData.content);
    if (imageFile) form.append('image', imageFile);
    const res = await api.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  } catch (err) {
    console.error('Error creating post:', err);
    throw err;
  }
};

// Update post
export const updatePost = async (id, postData, imageFile = null) => {
  try {
    if (imageFile) {
      const form = new FormData();
      form.append('title', postData.title);
      form.append('content', postData.content);
      form.append('image', imageFile);
      const res = await api.put(`/posts/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      return res.data;
    }
    const res = await api.put(`/posts/${id}`, postData);
    return res.data;
  } catch (err) {
    console.error('Error updating post:', err);
    throw err;
  }
};

// Delete post
export const deletePost = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
    return true;
  } catch (err) {
    console.error('Error deleting post:', err);
    throw err;
  }
};

// Like post
export const likePost = async (id) => {
  try {
    const res = await api.post(`/posts/${id}/like`);
    return res.data;
  } catch (err) {
    console.error('Error liking post:', err);
    throw err;
  }
};

// Add comment
export const addComment = async (postId, commentData) => {
  try {
    const res = await api.post(`/posts/${postId}/comment`, commentData);
    return res.data;
  } catch (err) {
    console.error('Error adding comment:', err);
    throw err;
  }
};
// Increment views
export const incrementViews = async (id) => {
  try {
    await api.get(`/posts/${id}`);
  } catch (err) {
    console.error('Error incrementing views:', err);
  }
};