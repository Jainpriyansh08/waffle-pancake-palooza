
const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  dob: {
    type: Date,
    required: [true, 'Please add date of birth']
  },
  dcCoins: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for getting the loyalty badge
UserProfileSchema.virtual('loyaltyBadge').get(function() {
  if (this.totalOrders >= 300) return 'gold';
  if (this.totalOrders >= 150) return 'silver';
  if (this.totalOrders >= 50) return 'bronze';
  return 'none';
});

// Virtual for getting the coins per order based on loyalty status
UserProfileSchema.virtual('coinsPerOrder').get(function() {
  const badge = this.loyaltyBadge;
  
  switch (badge) {
    case 'gold': return 125;
    case 'silver': return 100;
    case 'bronze': return 75;
    default: return 50;
  }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
