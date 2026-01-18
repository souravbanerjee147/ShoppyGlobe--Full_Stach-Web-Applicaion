import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers';

// Load cart from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('shoppyglobe-cart');
    if (!serializedState) return undefined;
    
    const parsedState = JSON.parse(serializedState);
    
    // Validate and sanitize loaded data
    if (!parsedState || typeof parsedState !== 'object') return undefined;
    
    return {
      items: Array.isArray(parsedState.items) ? parsedState.items : [],
      total: typeof parsedState.total === 'number' ? parsedState.total : 0,
      lastUpdated: parsedState.lastUpdated || new Date().toISOString()
    };
  } catch (err) {
    console.error('Error loading cart state:', err);
    return undefined;
  }
};

// Save cart to localStorage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('shoppyglobe-cart', serializedState);
  } catch (err) {
    console.error('Error saving cart state:', err);
  }
};

// Load persisted state
const persistedState = loadCartState();

const rootReducer = combineReducers({
  cart: cartReducer,
  search: (state = '', action) => {
    switch (action.type) {
      case 'SET_SEARCH_TERM':
        return action.payload;
      default:
        return state;
    }
  }
});

const store = createStore(
  rootReducer,
  { cart: persistedState || { items: [], total: 0, lastUpdated: new Date().toISOString() } }
);

// Subscribe to store cart changes
store.subscribe(() => {
  const state = store.getState();
  saveCartState(state.cart);
});

export default store;