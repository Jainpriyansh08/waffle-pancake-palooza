
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash', 'card', 'wallet']
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  coinsEarned: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate order number before saving
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    // Generate a random order number like DN12345
    const random = Math.floor(10000 + Math.random() * 90000);
    this.orderNumber = `DC${random}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
