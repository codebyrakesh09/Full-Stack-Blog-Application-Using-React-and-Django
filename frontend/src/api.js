import axios from 'axios';

// Base URL of the Django REST Framework backend.
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Blog post API calls ---

// Get all posts, optionally filtered by a search term.
export const getPosts = (search = '') => {
  const params = search ? { search } : {};
  return api.get('/posts/', { params });
};

// Get a single post by id.
export const getPost = (id) => api.get(`/posts/${id}/`);

// Create a new post.
export const createPost = (data) => api.post('/posts/', data);

// Update an existing post (full update).
export const updatePost = (id, data) => api.put(`/posts/${id}/`, data);

// Delete a post.
export const deletePost = (id) => api.delete(`/posts/${id}/`);

export default api;
