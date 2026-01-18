# **ShoppyGlobe - Complete E-commerce Platform**

![ShoppyGlobe Logo] (For Practice only )(https://via.placeholder.com/1200x400/667eea/ffffff?text=ShoppyGlobe+E-commerce)

A full-stack e-commerce application with React frontend and Node.js/Express/MongoDB backend featuring JWT authentication, product management, shopping cart, and checkout system.


## **✨ Features**

### **Frontend (React)**
- 🎨 Modern, responsive UI with dark/light theme toggle
- 🔍 Product search and filtering
- 🛒 Shopping cart with local storage persistence
- 🔐 JWT-based authentication
- 📱 Mobile-responsive design
- ⚡ Lazy loading for performance optimization
- 🎯 Error boundaries for graceful error handling

### **Backend (Node.js/Express)**
- 🔐 Secure JWT authentication & authorization
- 🗄️ MongoDB with Mongoose ODM
- 🛡️ Input validation & sanitization
- 📦 RESTful API with proper HTTP status codes
- 🚀 Rate limiting & security headers
- 📝 Comprehensive error handling
- 🔄 CORS enabled for frontend-backend communication

## **🛠️ Tech Stack**

### **Frontend**
- **React 18** - UI Library
- **React Router 6** - Navigation
- **Redux Toolkit** - State management
- **Vite** - Build tool & dev server
- **CSS3** - Styling with CSS variables
- **PropTypes** - Type checking

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing


## **🚀 Installation**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier) or local MongoDB
- Git

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd shoppyglobe
```

### **2. Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB credentials

# Seed the database
npm run seed

# Start development server
npm run dev
```
Backend will run at: `http://localhost:5001`

### **3. Frontend Setup**
```bash
# Open new terminal, navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will run at: `http://localhost:5173`

## **🔧 Environment Variables**


### **MongoDB Atlas Setup**
1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user with read/write permissions
3. Whitelist IP address (use `0.0.0.0/0` for testing)
4. Get connection string from "Connect" button

## **📚 API Documentation**

### **Base URL**
```
http://localhost:5001/api
```

### **Authentication Endpoints**

| Method | Endpoint          | Description       | Auth Required |
|--------|-------------------|-------------------|---------------|
| POST   | `/auth/register`  | Register new user |      No       |
| POST   | `/auth/login`     | Login user        |      No       |
| GET    | `/auth/me`        | Get current user  |     Yes       |

#### **Register Request**
```json
POST /api/auth/register
{
  "firstName": "Rahul",
  "lastName": "Dey",
  "email": "rahul1@gmail.com",
  "password": "rahul123"
}
```

#### **Login Request**
```json
POST /api/auth/login
{
  "email": "rahul1@gmail.com",
  "password": "rahul123"
}
```

### **Product Endpoints**

| Method | Endpoint                      |    Description     |  Auth Required |
|--------|-------------------------------|--------------------|----------------|
| GET    | `/products`                   | Get all products   |    No          |
| GET    | `/products/:id`               | Get single product |    No          |
| POST   | `/products`                   | Create product     |    Yes (Admin) |
| GET    | `/products?search=query`      | Search products    |    No          |
| GET    | `/products?category=category` | Filter by category |    No          |

#### **Query Parameters**
- `search` - Search in title, description, brand
- `category` - Filter by category
- `minPrice`, `maxPrice` - Price range filter
- `sort` - Sort by: `price_asc`, `price_desc`, `rating`, `newest`

### **Cart Endpoints** (All require authentication)

| Method |        Endpoint       |     Description       |
|--------|-----------------------|-----------------------|
| GET    | `/cart`               | Get user's cart       |
| POST   | `/cart/items`         | Add item to cart      |
| PUT    | `/cart/items/:itemId` | Update item quantity  |
| DELETE | `/cart/items/:itemId` | Remove item from cart |
| DELETE | `/cart`               | Clear entire cart     |

#### **Add to Cart Request**

step 1: do loging
step 2: 
1. Headers ➡️ value : application/json
2. Auth.   ➡️ Bearer ➡️ Bearer Token : (`<your-token>`) : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmM5Yjk3ZmE1NDM2NzE2Yjc4ZGE3ZiIsImVtYWlsIjoicmFodWwxQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY4NzI1ODIwLCJleHAiOjE3NjkzMzA2MjB9.fCdTU0NdswS20dH14aJmuAjfyHtQWHEeB5m8AHc5w9U`
step 3: Body : 
```json
POST /api/cart/items
{
  "productId": "696bd48b031b1c4549c080ba",
  "quantity": 2
}
```

### **Health Check**
```
GET /api/health
```
Returns server status and database connection status.

## **🧪 Testing with ThunderClient**

### **1. Setup Collection**
Create a new collection in Thunder Client with these requests:

#### **Auth Flow:**
1. **Register:** `POST /api/auth/register`
2. **Login:** `POST /api/auth/login` (Save token from response)
3. **Set Header:** Add `Authorization: Bearer <token>` to all protected requests

#### **Product Flow:**
1. **Get Products:** `GET /api/products`
2. **Get Single Product:** `GET /api/products/:id`
3. **Search Products:** `GET /api/products?search=iphone`

#### **Cart Flow:**
1. **Get Cart:** `GET /api/cart` (Initially empty)
2. **Add to Cart:** `POST /api/cart/items`
3. **Update Quantity:** `PUT /api/cart/items/:itemId`
4. **Remove Item:** `DELETE /api/cart/items/:itemId`
5. **Clear Cart:** `DELETE /api/cart`

### **2. Environment Variables in ThunderClient**
Create environment with:
```json
{
  "baseUrl": "http://localhost:5001/api",
  "token": "your_jwt_token_here",
  "productId": "mongodb_product_id_here"
}
```

### **3. Test Sequence Screenshots**
Document your testing with screenshots of:
1. ✅ Successful registration
2. ✅ Successful login with JWT token
3. ✅ GET products listing
4. ✅ GET cart with items
5. ✅ POst update cart item quantity


## **📸 Screenshots**

1. All products :-
Method: POST 
URL: http://localhost:5001/api/products 

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/34053fd6-9bca-4dad-9e68-dcdf634a582c" />


2. Products category :-
Method: GET 
URL: http://localhost:5001/api/products?category=Smartphones

   <img width="2881" height="1800" alt="image" src="https://github.com/user-attachments/assets/9f977418-b6d7-4a15-a97a-77923b168bf8" />

3. Products Search :- 
Method: GET 
URL: http://localhost:5001/api/products?search=iPhone

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/83eed8a2-fae8-4bd4-98f4-9f57bb2ff505" />

4. Register User :- 
Method: POST 
URL: http://localhost:5001/api/auth/register

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/eed3274b-5641-4f1d-a0a1-8ad9b925c662" />

5. Login(If Already Registered) :- 
Method: POST 
URL: http://localhost:5001/api/auth/login

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/97df01d0-9d9b-4f16-8223-b119d8e3a217" />

6. Cart before loging:-
Method: POST 
URL: http://localhost:5001/api/cart/items

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/b1029b35-4b1b-4f72-a903-7ccd73298bb3" />

7. Cart after login:- 
Method: POST 
URL: http://localhost:5001/api/cart/items

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/86b84a87-f351-4c0a-a2b9-0ecdbc83c6ed" />


<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/852b2113-fa2a-48ba-a551-886226f075d6" />


<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/333aaa06-9973-4958-b92e-78290cdc3adb" />








### **Application Views**
```
1. Home Page - Product Listing
2. Product Detail Page
3. Shopping Cart Page
4. Checkout Page
5. Dark/Light Theme Toggle
6. Responsive Mobile View
```

### **API Testing**
```
1. ThunderClient Collection
2. Postman Test Results
3. MongoDB Atlas Database
4. Authentication Flow
5. Cart Operations
```

## **🌐 Deployment**

### **Backend Deployment (locally)**

# move to backend folder 
```bash
#move inside backend
cd backend

# Set environment variables (.env) inside backend folder

# Creat backend/.env file in terminal
cat > .env << 'EOF'
#---------------------------------------------------------------------------------------------------------------------------
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb+srv://souravayrah1_db_user:Cockp!t147@shoppyglobe.jthqgop.mongodb.net/shoppyglobe?retryWrites=true&w=majority&appName=shoppyglobe
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
#---------------------------------------------------------------------------------------------------------------------------
EOF

# Install any missing dependencies
npm install helmet

# Seed the database
npm run seed

# Start the backend server
npm run dev
```

# if therminal shows EADDRINUSE (Port 5000 already in use), run this command, and restart the server
```bash
# Kill existing processes
pkill -f node
```


### **Frontend Deployment (Vercel/Netlify)**
```bash
# Build for production
npm install

# Start the frontend server
npm run dev
```


## **🔍 Troubleshooting**

### **Common Issues & Solutions**

#### **1. MongoDB Connection Failed**
```bash
# Check MongoDB status
mongod --version

# For MongoDB Atlas:
# 1. Check IP whitelist (0.0.0.0/0 for testing)
# 2. Verify database user credentials
# 3. Check cluster is running
```

#### **2. CORS Errors**
```javascript
// In backend/src/index.js
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

#### **3. JWT Token Issues**
- Token expires in 7 days (configurable)
- Check `Authorization` header format: `Bearer <token>`
- Verify JWT secret matches in .env

#### **4. Frontend-Backend Connection**
```bash
# Test backend is running
curl http://localhost:5001/api/health

# Test frontend API calls
curl http://localhost:5001/api/products
```

#### **5. Database Seed Issues**
```bash
# Clear and reseed database
cd backend
npm run seed

# Check seeded data
mongo "mongodb+srv://cluster.mongodb.net/shoppyglobe" --username user
> db.products.find().count()
```

## **🤝 Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### **Development Guidelines**
- Follow existing code style
- Add tests for new features
- Update documentation
- Use meaningful commit messages

## **📄 License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **🙏 Acknowledgments**

- **React** - Frontend library
- **Express** - Backend framework
- **MongoDB Atlas** - Database hosting
- **Vite** - Build tool
- **Unsplash** - Product images

## **📞 Support**

For support, email: souravayrah1@gmail.com or create an issue in the repository.

---

## 📧 Contact

Your Name - Sourav Banerjee 

Project Link: https://github.com/souravbanerjee147/ShoppyGlobe--Full_Stach-Web-Applicaion.git


**Happy Shopping!** 🛍️


  
**Built with ❤️ by Sourav Banerjee**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

