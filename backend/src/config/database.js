const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Check if we need to seed
    if (process.env.NODE_ENV === 'development') {
      const Product = require('../models/Product');
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('Database is empty. Run "npm run seed" to add sample products.');
      }
    }
    
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;