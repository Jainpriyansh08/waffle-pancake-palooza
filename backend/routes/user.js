
const express = require('express');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Create or update user profile
// @route   POST /api/users/profile
// @access  Private
router.post('/profile', protect, async (req, res) => {
  try {
    const { name, email, dob } = req.body;

    // Find existing profile
    let profile = await UserProfile.findOne({ user: req.user.id });

    // Create or update profile
    if (profile) {
      profile = await UserProfile.findOneAndUpdate(
        { user: req.user.id },
        { name, email, dob },
        { new: true }
      );
    } else {
      profile = await UserProfile.create({
        user: req.user.id,
        name,
        email,
        dob,
        dcCoins: 0,
        totalOrders: 0
      });

      // Update user profile completion status
      await User.findByIdAndUpdate(
        req.user.id,
        { isProfileComplete: true },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add DC coins to user
// @route   PUT /api/users/coins
// @access  Private
router.put('/coins', protect, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid amount'
      });
    }

    const profile = await UserProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.dcCoins += Number(amount);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
