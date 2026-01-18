import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions';
import { productAPI } from '../services/api'; // Make sure this is imported
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching product ID:', id);
        
        const result = await productAPI.getById(id);
        console.log('Product API response:', result);
        
        if (result.data) {
          setProduct(result.data);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id || product._id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand
      }));
      
      // Show feedback
      const btn = document.querySelector('.add-to-cart-detail');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/400x300/cccccc/969696?text=Product+Image';
  };

  if (loading) {
    return (
      <div className="product-detail loading">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail error">
        <h2>Error Loading Product</h2>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail not-found">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')}>Browse Products</button>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * (product.discountPercentage || 0) / 100);

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Products
      </button>
      
      <div className="detail-container">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
              loading="lazy"
              onError={handleImageError}
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.slice(0, 5).map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`} 
                    loading="lazy"
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="product-info">
          <div className="product-header">
            <h1>{product.title}</h1>
            <div className="product-meta">
              <span className="brand">{product.brand || 'No brand'}</span>
              <span className="category">{product.category}</span>
            </div>
          </div>
          
          <div className="product-rating">
            <div className="stars">
              {'★'.repeat(Math.floor(product.rating || 0))}
              {(product.rating || 0) % 1 >= 0.5 ? '⭐' : ''}
              {'☆'.repeat(5 - Math.ceil(product.rating || 0))}
            </div>
            <span className="rating-value">{(product.rating || 0).toFixed(1)}</span>
            <span className="reviews">{product.reviews?.length || 0} reviews</span>
          </div>
          
          <div className="product-price-container">
            <div className="current-price">{formatPrice(discountedPrice)}</div>
            {product.discountPercentage > 0 && (
              <>
                <div className="original-price">
                  {formatPrice(product.price)}
                </div>
                <div className="discount">
                  Save {Math.round(product.discountPercentage)}%
                </div>
              </>
            )}
          </div>
          
          <div className="product-stock">
            <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stock > 0 && (
              <span className="stock-count">{product.stock} units available</span>
            )}
          </div>
          
          <div className="product-tabs">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews?.length || 0})
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="product-description">
                <p>{product.description}</p>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div className="product-specs">
                <div className="specs-grid">
                  <div><strong>Brand:</strong> {product.brand || 'Not specified'}</div>
                  <div><strong>Category:</strong> {product.category}</div>
                  <div><strong>Price:</strong> {formatPrice(product.price)}</div>
                  {product.discountPercentage > 0 && (
                    <div><strong>Discount:</strong> {product.discountPercentage}%</div>
                  )}
                  <div><strong>Stock:</strong> {product.stock} units</div>
                  <div><strong>Rating:</strong> {(product.rating || 0).toFixed(1)}/5</div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="product-reviews">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="reviews-list">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="review-item">
                        <div className="review-header">
                          <span className="reviewer-name">
                            {review.user?.firstName || 'Anonymous'}
                          </span>
                          <div className="review-rating">
                            <span className="stars">
                              {'★'.repeat(Math.floor(review.rating || 0))}
                            </span>
                            <span className="rating-value">{review.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="review-comment">{review.comment}</div>
                        <div className="review-date">
                          {new Date(review.date || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-reviews">
                    No reviews yet. Be the first to review this product!
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="product-actions">
            <button
              className="add-to-cart-detail"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button 
              className="buy-now" 
              disabled={product.stock <= 0}
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;