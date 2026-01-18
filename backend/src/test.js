// Quick test to check MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/shoppyglobe');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoppyglobe')
  .then(() => {
    console.log('✅ MongoDB Connected!');
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    console.log('Database:', mongoose.connection.db.databaseName);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message);
    console.log('\nTroubleshooting:');
    console.log('1. Is MongoDB running?');
    console.log('2. Check connection string in .env file');
    console.log('3. For MongoDB Atlas: Is your IP whitelisted?');
    console.log('4. For local MongoDB: Run "mongod" in another terminal');
    process.exit(1);
  });