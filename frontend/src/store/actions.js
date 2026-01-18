// Cart Actions
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

// Search Action
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    ...product,
    addedAt: new Date().toISOString()
  }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId.toString() // Ensure it's a string for comparison
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { 
    productId: productId.toString(), // Ensure it's a string
    quantity: Math.max(1, quantity) 
  }
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term
});