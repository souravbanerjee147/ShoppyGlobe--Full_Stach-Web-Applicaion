const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart, Get user's cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'title price thumbnail brand discountPercentage stock');

    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = await Cart.create({ user: req.user._id });
    }

    // Calculate prices with discounts
    const itemsWithDetails = cart.items.map(item => {
      const product = item.product;
      const discountedPrice = product.price - (product.price * (product.discountPercentage || 0) / 100);
      const itemTotal = discountedPrice * item.quantity;
      
      return {
        ...item.toObject(),
        product: {
          ...product.toObject(),
          discountedPrice,
          originalPrice: product.price
        },
        itemTotal
      };
    });

    const subtotal = itemsWithDetails.reduce((sum, item) => sum + item.itemTotal, 0);

    res.json({
      success: true,
      data: {
        ...cart.toObject(),
        items: itemsWithDetails,
        subtotal
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart'
    });
  }
};

// POST /api/cart/items, Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product exists and is present in stock
    const product = await Product.findOne({
      _id: productId,
      isActive: true,
      stock: { $gt: 0 }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or out of stock'
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id });
    }

    // Check if product is already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = product.price;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    cart.lastUpdated = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart'
    });
  }
};

// PUT /api/cart/items/:itemId - Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    cart.lastUpdated = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart item'
    });
  }
};

// DELETE /api/cart/items/:itemId - Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // Remove item
    cart.items.splice(itemIndex, 1);
    cart.lastUpdated = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart'
    });
  }
};

// DELETE /api/cart - Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    cart.lastUpdated = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};