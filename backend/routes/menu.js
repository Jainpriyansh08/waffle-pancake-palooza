
const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get menu items by category
// @route   GET /api/menu/category/:category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      category: req.params.category,
      isAvailable: true 
    });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
