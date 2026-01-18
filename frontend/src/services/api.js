const API_BASE_URL = 'http://localhost:5001/api';

// Generic API call function
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Product API functions
export const productAPI = {
  getAll: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const result = await apiRequest(`/products${queryParams ? `?${queryParams}` : ''}`);
      
      // Map _id to id for frontend compatibility
      if (result.data && Array.isArray(result.data)) {
        result.data = result.data.map(product => ({
          ...product,
          id: product._id || product.id
        }));
      }
      
      return result;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return {
        success: true,
        count: 0,
        data: []
      };
    }
  },
  
  getById: async (id) => {
    try {
      const result = await apiRequest(`/products/${id}`);
      if (result.data) {
        result.data.id = result.data._id || result.data.id;
      }
      return result;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  },
  
  search: (query) => productAPI.getAll({ search: query }),
};

// Auth API functions
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => apiRequest('/auth/me'),
};

// Cart API functions - ADD THIS SECTION
export const cartAPI = {
  get: () => apiRequest('/cart'),
  
  addItem: (productId, quantity = 1) => apiRequest('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),
  
  updateItem: (itemId, quantity) => apiRequest(`/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  
  removeItem: (itemId) => apiRequest(`/cart/items/${itemId}`, {
    method: 'DELETE',
  }),
  
  clear: () => apiRequest('/cart', {
    method: 'DELETE',
  }),
  
  getSummary: () => apiRequest('/cart/summary'),
};

// Export everything
export default {
  apiRequest,
  productAPI,
  authAPI,
  cartAPI
};