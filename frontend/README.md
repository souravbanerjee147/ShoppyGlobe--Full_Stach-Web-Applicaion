# **ShoppyGlobe An E-commerce Web Application**

A modern e-commerce web application built with React, Redux, and React Router. ShoppyGlobe gives a seamless shopping experience with product browsing, cart management, and secure checkout.


## ✨ **Features**

### **Core Features**
- 📦 **Product Catalog** - Browse products with search and filtering
- 🛒 **Shopping Cart** - Add, remove, and update item quantities
- 🔍 **Product Search** - Real-time search functionality
- 📱 **Responsive Design** - Works perfectly on all devices
- 🌓 **Dark/Light Theme** - Toggle between themes with persistence
- 💳 **Checkout Process** - Complete order placement with form validation

### **Advanced Features**
- 🗂️ **Product Details** - Comprehensive product information with images gallery
- ⭐ **User Reviews** - View and read product reviews
- 📊 **Cart Persistence** - Items saved across browser sessions
- 🚀 **Performance Optimized** - Lazy loading and code splitting
- 🛡️ **Error Handling** - Graceful error states and 404 pages
- 🎨 **Modern UI/UX** - Beautiful gradients, shadows, and animations

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - Component-based UI library
- **React Router 6** - Client-side routing
- **Redux** - State management
- **CSS3** - Custom styling with CSS Variables
- **Vite** - Build tool and development server

### **State Management**
- **Redux** - Global state management
- **LocalStorage** - Cart persistence
- **Context API** - Theme management

### **API**
- **DummyJSON** - Mock product data API


## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/souravbanerjee147/shoppyglobe.git
cd shoppyglobe
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173/`

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 📱 **Application Screens**

### **Home Page**
- Product grid layout with search bar
- Responsive product cards with images
- Add to cart functionality
- Real-time search filtering

### **Product Detail Page**
- High-quality image gallery
- Product specifications
- Customer reviews
- Stock availability
- Add to cart functionality

### **Shopping Cart**
- Cart item management
- Quantity adjustment
- Price calculations
- Clear cart option
- Proceed to checkout

### **Checkout Page**
- Multi-step checkout process
- Form validation
- Order summary
- Secure payment simulation
- Order confirmation

### **404 Page**
- Custom error page
- Navigation options
- Search functionality
- Contact support

## 🔧 **Key Technical Implementations**

### **State Management**
- **Redux Store**: Centralized state for cart and search
- **LocalStorage**: Persistent cart across sessions
- **Context API**: Theme management

### **Performance Optimizations**
- **Code Splitting**: React.lazy for route-based splitting
- **Image Lazy Loading**: Native loading="lazy"
- **Memoization**: Optimized re-renders
- **Debounced Search**: 300ms delay for API calls

### **Error Handling**
- **API Error Boundaries**: Graceful error states
- **Form Validation**: Client-side validation
- **404 Routing**: Custom not-found page
- **Network Error Handling**: Retry mechanisms

### **Accessibility**
- **Semantic HTML**: Proper HTML5 elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant colors

## 🎨 **Styling Features**

### **Design System**
- **CSS Variables**: Theme-based color system
- **Responsive Grid**: Flexbox and CSS Grid
- **Modern UI**: Gradients, shadows, and transitions
- **Dark/Light Mode**: System preference detection

### **Responsive Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1200px
- **Desktop**: > 1200px

## 🔄 **API Integration**

The application uses [DummyJSON](https://dummyjson.com/) for product data:

```javascript
// Product List
GET https://dummyjson.com/products

// Search Products
GET https://dummyjson.com/products/search?q={query}

// Product Details
GET https://dummyjson.com/products/{id}
```

## 📝 **Development Guidelines**

### **Code Standards**
- **Component Structure**: Functional components with hooks
- **Prop Validation**: PropTypes for all components
- **File Organization**: Feature-based folder structure
- **Code Comments**: Comprehensive documentation



## 🚨 **Known Issues & Solutions**

### **Common Issues**
1. **API Rate Limiting**: DummyJSON has rate limits; use mock data for development
2. **CORS Issues**: Development server proxy configuration available
3. **Image Loading**: Fallback images for broken links
4. **Browser Compatibility**: Works on Chrome, Firefox, Safari, Edge

### **Troubleshooting**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run lint

# Clear browser cache
Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

## 👏 **Acknowledgments**

- [DummyJSON](https://dummyjson.com/) for providing mock product data
- [React](https://reactjs.org/) team for the amazing library
- [Vite](https://vitejs.dev/) for the fast build tool
- All contributors and testers

## 📧 Contact

Your Name - Sourav Banerjee 

Project Link: https://github.com/souravbanerjee147/shoppyglobe.git

## ⭐ Show your support

Give me a ⭐️ if this project helped you!

---

*Built with ❤️ using React + Vite*






