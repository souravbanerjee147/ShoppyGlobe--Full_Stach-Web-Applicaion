const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    title: "iPhone 15 Pro",
    description: "The latest iPhone with A17 Pro chip, titanium design, and professional camera system. Features a titanium frame, Action button, and USB-C connectivity.",
    price: 999.99,
    discountPercentage: 5,
    rating: 4.8,
    stock: 50,
    brand: "Apple",
    category: "Smartphones",
    thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1694897733219-9a5e4f1541be?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with S Pen, advanced AI features, and quad camera system. Features Titanium frame, Snapdragon 8 Gen 3, and 200MP camera.",
    price: 1299.99,
    discountPercentage: 8,
    rating: 4.7,
    stock: 35,
    brand: "Samsung",
    category: "Smartphones",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "MacBook Pro 16-inch",
    description: "Powerful laptop with M3 Max chip, Liquid Retina XDR display, and up to 22 hours battery life. Perfect for professionals and creative work.",
    price: 2499.99,
    discountPercentage: 3,
    rating: 4.9,
    stock: 25,
    brand: "Apple",
    category: "Laptops",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Sony WH-1000XM5",
    description: "Premium noise canceling wireless headphones with 30-hour battery life. Industry-leading noise cancellation and Hi-Res Audio support.",
    price: 399.99,
    discountPercentage: 12,
    rating: 4.8,
    stock: 100,
    brand: "Sony",
    category: "Headphones",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Nike Air Max 270",
    description: "Comfortable lifestyle sneakers with the tallest Air Max unit yet. Features breathable mesh upper and rubber outsole for all-day comfort.",
    price: 159.99,
    discountPercentage: 15,
    rating: 4.5,
    stock: 200,
    brand: "Nike",
    category: "Shoes",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop"
    ]
  }
];


//reupdatation of new products
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();