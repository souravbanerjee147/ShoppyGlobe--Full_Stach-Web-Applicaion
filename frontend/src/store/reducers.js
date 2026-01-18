import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_QUANTITY, 
  CLEAR_CART 
} from './actions';

const initialState = {
  items: [],
  total: 0,
  lastUpdated: new Date().toISOString()
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
          updatedAt: new Date().toISOString()
        };
      } else {
        updatedItems = [...state.items, {
          ...action.payload,
          quantity: 1,
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }];
      }
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        lastUpdated: new Date().toISOString()
      };
    }
    
    case REMOVE_FROM_CART:{
      const updatedItems = state.items.filter(item => 
        item.id.toString() !== action.payload.toString() // Compare as strings
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        lastUpdated: new Date().toISOString()
      };
    }
    
    case UPDATE_QUANTITY:{
      const { productId, quantity } = action.payload;
      const updatedCartItems = state.items.map(item =>
        item.id.toString() === productId.toString() // Compare as strings
          ? { ...item, quantity: quantity, updatedAt: new Date().toISOString() }
          : item
      );
      return {
        ...state,
        items: updatedCartItems,
        total: calculateTotal(updatedCartItems),
        lastUpdated: new Date().toISOString()
      };
    }
    
    case CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
};

export default cartReducer;