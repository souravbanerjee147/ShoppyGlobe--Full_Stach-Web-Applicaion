const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const auth = require('../middleware/auth');

// All cart routes require authentication
router.use(auth);

// GET /api/cart
router.get('/', getCart);

// POST /api/cart/items
router.post('/items', addToCart);

// PUT /api/cart/items/:itemId
router.put('/items/:itemId', updateCartItem);

// DELETE /api/cart/items/:itemId
router.delete('/items/:itemId', removeFromCart);

// DELETE /api/cart
router.delete('/', clearCart);

module.exports = router;