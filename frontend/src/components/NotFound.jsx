import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon"></div>
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          
          <div className="error-message">
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <p>Here are some helpful links instead:</p>
          </div>
          
          <div className="error-links">
            <Link to="/" className="error-link">
              <span className="link-icon"></span>
              <span>Homepage</span>
            </Link>
            
            <Link to="/cart" className="error-link">
              <span className="link-icon">🛒</span>
              <span>Shopping Cart</span>
            </Link>
            
            <button onClick={() => window.history.back()} className="error-link">
              <span className="link-icon"></span>
              <span>Go Back</span>
            </button>
          </div>
          
          <div className="error-search">
            <p>Or try searching for what you need:</p>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
              />
              <button className="search-btn">Search</button>
            </div>
          </div>
          
          <div className="error-contact">
            <p>Still can't find what you're looking for?</p>
            <a href="mailto:support@shoppyglobe.com" className="contact-link">
              Contact Support
            </a>
          </div>
        </div>
        
        <div className="error-illustration">
          <div className="illustration">
            <div className="cart-icon">🛒</div>
            <div className="question-mark">?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;