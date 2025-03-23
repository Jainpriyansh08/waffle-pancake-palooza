
# Drizzle n Crunch Backend API

This is the backend API for the Drizzle n Crunch mobile application, built with Node.js, Express, and MongoDB.

## Setup and Installation

1. Install dependencies
```
npm install
```

2. Configure environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/drizzlecrunch
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

3. Run the server
```
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with phone number
- `GET /api/auth/me` - Get current logged-in user

### User Profile
- `POST /api/users/profile` - Create or update user profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/coins` - Add DC coins to user

### Menu Items
- `GET /api/menu` - Get all available menu items
- `GET /api/menu/category/:category` - Get menu items by category
- `GET /api/menu/:id` - Get a specific menu item

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders for current user
- `GET /api/orders/:id` - Get a specific order
- `PUT /api/orders/:id/status` - Update order status

## Technologies Used
- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- bcrypt.js for password hashing
