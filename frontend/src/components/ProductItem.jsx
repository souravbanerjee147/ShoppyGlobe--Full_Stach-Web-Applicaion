import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions';
import PropTypes from 'prop-types';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id || product._id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      brand: product.brand
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = 'https://via.placeholder.com/300x200/cccccc/969696?text=Product+Image';
  };

  // Use _id if id doesn't exist
  const productId = product.id || product._id;
  
  return (
    <div className="product-item">
      <Link to={`/product/${productId}`} className="product-item-link">
        <div className="product-image-container">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            loading="lazy"
            className="product-image"
            onError={handleImageError}
          />
          {product.discountPercentage > 0 && (
            <span className="product-discount">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
        
        <div className="product-info">
          <div className="product-brand">{product.brand || 'Generic'}</div>
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">
            {product.description ? 
              product.description.substring(0, 80) + (product.description.length > 80 ? '...' : '') : 
              'No description available'
            }
          </p>
          
          <div className="product-footer">
            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.discountPercentage > 0 && (
                <span className="original-price">
                  {formatPrice(product.price / (1 - product.discountPercentage/100))}
                </span>
              )}
            </div>
            
            <div className="product-rating">
              <span className="rating-stars">
                {'★'.repeat(Math.floor(product.rating || 0))}
                {(product.rating || 0) % 1 >= 0.5 ? '⭐' : ''}
                {'☆'.repeat(5 - Math.ceil(product.rating || 0))}
              </span>
              <span className="rating-value">
                {product.rating ? product.rating.toFixed(1) : '0.0'}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        <span>🛒</span>
        Add to Cart
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    brand: PropTypes.string,
    description: PropTypes.string,
    discountPercentage: PropTypes.number,
    rating: PropTypes.number
  }).isRequired
};

export default ProductItem;