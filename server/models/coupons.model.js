const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // The coupon code
  description: String, // Description of the coupon
  discountType: { 
    type: String, 
    enum: ['percentage', 'fixed'], // Percentage-based or fixed amount discount
    required: true 
  },
  discountValue: { type: Number, required: true }, // e.g., 20 for 20% or $10
  validFrom: { type: Date, required: true }, // Start date of the coupon validity
  validUntil: { type: Date, required: true }, // End date of the coupon validity
  usageLimit: { type: Number, default: 1 }, // How many times this coupon can be used
  usageCount: { type: Number, default: 0 }, // Tracks how many times it has been used
  minimumOrderAmount: { type: Number, default: 0 }, // Minimum order value to apply the coupon
  applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Products that the coupon applies to
  applicableCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Categories that the coupon applies to
  applicableToAll: { type: Boolean, default: false }, // Whether the coupon is applicable to all products
  isActive: { type: Boolean, default: true }, // If the coupon is active or disabled
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);
