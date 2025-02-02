const mongoose = require('mongoose');

const makeupSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  brand: { type: String, required: true }, // Brand name
  // price: { type: Number, required: true }, // Product price
  type: { 
    type: String, 
    // enum: ['foundation', 'mascara', 'lipstick', 'eyeshadow', 'blush', 'highlighter', 'concealer'], // Expanded makeup types
    required: true 
  }, // Specific makeup types
  shades: [{ type: String }], // Array of available shades/colors
  ingredients: [{ type: String }], // Ingredients list
  category: { type: String, default: 'makeup' }, // Fixed as 'makeup'
  description: { type: String }, // Product description
  stock: { type: Number, default: 0 }, // Stock availability
  images: [{ 
    imageUrl: String, 
    publicId: String 
  }], // Image URLs
  
  // Additional fields
  sizes: [{
    size:String,
    price:Number
  }],// Product size (e.g., 30ml, 50ml)
  finish: { 
    type: String, 
    enum: ['matte', 'satin', 'glossy', 'dewy', 'natural'] 
  }, // Product finish (relevant for foundation, lipstick, etc.)
  skinType: { 
    type: String, 
    enum: ['normal', 'dry', 'oily', 'combination', 'sensitive','all'] 
  }, // Suitable skin types
  SPF: { type: Number, min: 0 }, // SPF protection level (if applicable)
  longWear: { type: Boolean, default: false }, // Whether the product is long-lasting
  waterproof: { type: Boolean, default: false }, // Whether the product is waterproof
  crueltyFree: { type: Boolean, default: false }, // Cruelty-free certification
  vegan: { type: Boolean, default: false }, // Vegan product flag

  // User interaction fields
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    rating: { type: Number, min: 1, max: 5 }, // User rating (1-5 stars)
    comment: { type: String }, // Review comment
    date: { type: Date, default: Date.now } // Review date
  }], // Customer reviews
  ratings: { type: Number, default: 0 }, // Average rating score
  reviewCount: { type: Number, default: 0 }, // 
  
  // Application and benefits details
  applicationTips: { type: String }, // Tips on how to apply the product
  benefits: [{ type: String }], // List of benefits (e.g., hydrating, long-lasting)
  safetyWarnings: { type: String }, // Safety warnings (e.g., avoid contact with eyes)
  
  expirationDate: { type: Date }, // Expiration date for product
  isFeatured: { type: Boolean, default: false }, // Whether the product is featured
  discount: { 
    percentage: { type: Number }, // Discount percentage
    validUntil: { type: Date } // Validity of the discount
  }, // Discount information
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Makeup' }], // Related products (e.g., related shades, products from the same line)
  createdAt: { type: Date, default: Date.now }, // Product creation date
});



module.exports = mongoose.model('Makeup', makeupSchema);
