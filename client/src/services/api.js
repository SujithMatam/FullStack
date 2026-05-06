import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const saveSearchHistory = async (query) => {
  const response = await api.post('/users/search-history', { query });
  return response.data;
};

// --- Uploads ---
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // Return full URL since it's served from the backend
  return `http://localhost:5000${response.data}`;
};

// --- Blogs ---
export const getBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await api.post('/blogs', blogData);
  return response.data;
};

// --- Reviews ---
export const getReviews = async (blogId) => {
  const response = await api.get(`/blogs/${blogId}/reviews`);
  return response.data;
};

export const addReview = async (blogId, reviewData) => {
  const response = await api.post(`/blogs/${blogId}/reviews`, reviewData);
  return response.data;
};

export default api;
