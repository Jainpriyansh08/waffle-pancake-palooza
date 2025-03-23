
const express = require('express');
const Order = require('../models/Order');
const UserProfile = require('../models/UserProfile');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Please add items to your order'
      });
    }

    // Get user profile for loyalty calculation
    const userProfile = await UserProfile.findOne({ user: req.user.id });

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    // Calculate coins based on loyalty tier
    let coinsEarned = 0;
    
    if (userProfile.totalOrders >= 300) { // Gold
      coinsEarned = Math.round(totalAmount * 1.25);
    } else if (userProfile.totalOrders >= 150) { // Silver
      coinsEarned = Math.round(totalAmount * 1);
    } else if (userProfile.totalOrders >= 50) { // Bronze
      coinsEarned = Math.round(totalAmount * 0.75);
    } else { // Regular
      coinsEarned = Math.round(totalAmount * 0.5);
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod,
      coinsEarned,
      status: 'confirmed'
    });

    // Update user profile with coins and increment total orders
    userProfile.dcCoins += coinsEarned;
    userProfile.totalOrders += 1;
    await userProfile.save();

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get all user orders
// @route   GET /api/orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure user owns the order
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (would normally be restricted to admin)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a status'
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // For this demo, allowing users to update their own order status
    // In production, this would be admin-only
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
