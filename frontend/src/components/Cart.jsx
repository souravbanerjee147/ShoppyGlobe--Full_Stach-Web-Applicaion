import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../store/actions';
import CartItem from './CartItem';
import { cartAPI } from '../services/api'; 
import './Cart.css';

const Cart = () => {
  const [backendCart, setBackendCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchCartFromBackend();
    }
  }, [token]);

  const fetchCartFromBackend = async () => {
    try {
      setLoading(true);
      const result = await cartAPI.get();
      setBackendCart(result.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // If error, use local cart
      setBackendCart(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      if (token) {
        try {
          await cartAPI.clear();
          setBackendCart({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      } else {
        dispatch(clearCart());
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Use backend cart if user is logged in, otherwise use local cart
  const displayCart = token && backendCart ? backendCart : cart;
  
  if (loading) {
    return (
      <div className="cart">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!displayCart || !displayCart.items || displayCart.items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items to your cart yet...</p>
        <Link to="/" className="continue-shopping">Start Shopping</Link>
      </div>
    );
  }

  // Calculate totals
  const subtotal = displayCart.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const totalItems = displayCart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button 
          className="clear-cart-btn"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
      
      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          
          <div className="cart-items">
            {displayCart.items.map(item => (
              <CartItem 
                key={item.id || item._id} 
                item={item} 
              />
            ))}
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          
          <div className="cart-actions">
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
          
          <div className="secure-checkout">
            <span className="lock-icon"></span>
            <span>Secure checkout - end-to end Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;









