const Product = require('../models/Product');

// GET /api/products - Get all products
const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort = 'newest'
    } = req.query;

    // Build query
    let query = { isActive: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build sort
    let sortOption = {};
    switch (sort) {
      case 'price_asc':
        sortOption.price = 1;
        break;
      case 'price_desc':
        sortOption.price = -1;
        break;
      case 'rating':
        sortOption.rating = -1;
        break;
      case 'newest':
        sortOption.createdAt = -1;
        break;
      default:
        sortOption.createdAt = -1;
    }

    const products = await Product.find(query).sort(sortOption);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

// GET /api/products/:id - Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product is active
    if (!product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

// POST /api/products - Create product (admin only)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct
};