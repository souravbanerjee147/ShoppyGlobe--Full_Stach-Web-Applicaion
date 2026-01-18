

import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/actions';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (window.confirm(`Remove "${item.title}" from cart?`)) {
      dispatch(removeFromCart(item.id || item._id));
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      dispatch(updateQuantity(item.id || item._id, newQuantity));
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      handleQuantityChange(value);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-product">
        <img 
          src={item.thumbnail} 
          alt={item.title}
          loading="lazy"
          className="cart-item-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
          }}
        />
        <div className="cart-item-details">
          <h3 className="cart-item-title">{item.title}</h3>
          {item.brand && <p className="cart-item-brand">{item.brand}</p>}
          <p className="cart-item-price">{formatPrice(item.price)} each</p>
        </div>
      </div>
      
      <div className="cart-item-quantity">
        <div className="quantity-controls">
          <button 
            className="quantity-btn minus"
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          
          <input
            type="number"
            min="1"
            max="99"
            value={item.quantity}
            onChange={handleInputChange}
            className="quantity-input"
            aria-label="Quantity"
          />
          
          <button 
            className="quantity-btn plus"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        <button 
          className="remove-item-btn"
          onClick={handleRemove}
          aria-label={`Remove ${item.title} from cart`}
        >
          Remove
        </button>
      </div>
      
      <div className="cart-item-unit-price">
        {formatPrice(item.price)}
      </div>
      
      <div className="cart-item-total">
        <span className="total-price">{formatPrice(itemTotal)}</span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow both string and number
    _id: PropTypes.string, 
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    brand: PropTypes.string,
    quantity: PropTypes.number.isRequired
  }).isRequired
};

export default CartItem;
