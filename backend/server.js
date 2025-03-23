
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/order'));

// Basic route
app.get('/', (req, res) => {
  res.send('Drizzle n Crunch API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
