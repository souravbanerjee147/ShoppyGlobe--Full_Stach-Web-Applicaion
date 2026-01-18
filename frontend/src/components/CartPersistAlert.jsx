import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './CartPersistAlert.css';

const CartPersistAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    // Check cart restored from localStorage have items or not
    if (!hasShown && cart.items.length > 0) {
      const lastShown = localStorage.getItem('cart-alert-last-shown');
      const oneHourAgo = Date.now() - 60 * 60 * 1000;
      
      if (!lastShown || parseInt(lastShown) < oneHourAgo) {
        setShowAlert(true);
        setHasShown(true);
        localStorage.setItem('cart-alert-last-shown', Date.now().toString());
        
        // Auto-hide after 8 seconds
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 8000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [cart.items.length, hasShown]);

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleViewCart = () => {
    window.location.href = '/cart';
  };

  if (!showAlert) return null;

  const itemCount = cart.items.length;
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-persist-alert">
      <div className="alert-content">
        <div className="alert-icon">🛒</div>
        <div className="alert-text">
          <h3>Welcome Back!</h3>
          <p>
            Your cart has been restored with {itemCount} item{itemCount !== 1 ? 's' : ''} 
            ({totalItems} total).
          </p>
          <div className="alert-details">
            <span className="total-amount">Total: ${cart.total.toFixed(2)}</span>
            {cart.lastUpdated && (
              <span className="last-updated">
                Last updated: {new Date(cart.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
        <div className="alert-actions">
          <button onClick={handleViewCart} className="view-cart-btn">
            View Cart
          </button>
          <button onClick={handleClose} className="close-alert-btn" aria-label="Close">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPersistAlert;