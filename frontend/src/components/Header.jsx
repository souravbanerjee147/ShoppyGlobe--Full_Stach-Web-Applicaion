
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { setSearchTerm } from '../store/actions';
import PropTypes from 'prop-types';
import './Header.css';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(setSearchTerm(value));
  };

  const handleSearchClear = () => {
    setSearchValue('');
    dispatch(setSearchTerm(''));
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShoppyGlobe</span>
          </Link>
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link cart-link">
                <span className="cart-text">Cart</span>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
                <span className="cart-icon">🛒</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-controls">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
            {searchValue && (
              <button 
                className="search-clear"
                onClick={handleSearchClear}
                aria-label="Clear search"
              >
                x
              </button>
            )}
          </div>
          
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func
};

export default Header;