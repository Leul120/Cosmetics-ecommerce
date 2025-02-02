const mongoose=require('mongoose')
const skincareSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  brand: { type: String, required: true }, // Brand name
  // price: { type: Number, required: true }, // Price of the product
  type: { 
    type: String, 
    enum: ['moisturizer', 'cleanser', 'exfoliant', 'serum', 'toner', 'sunscreen', 'mask'], // Expanded skincare types
    required: true 
  }, // Specific skincare types
  skinType: { 
    type: String, 
    enum: ['normal', 'dry', 'oily', 'combination', 'sensitive'] 
  }, // Targeted skin types
  ingredients: [{ type: String }], // List of ingredients
  sizes: [{
    size:String,
    price:Number
  }],
  category: { type: String, default: 'skincare' }, // Category (default to 'skincare')
  description: { type: String }, // Product description
  stock: { type: Number, default: 0 }, // Stock availability
  images: [{ 
    imageUrl: String, // URL for product images
    publicId: String // Public ID for image storage
  }], // Array of image URLs

  // New fields
  benefits: [{ type: String }], // List of product benefits (e.g., hydration, brightening)
  texture: { type: String }, // Product texture (e.g., cream, gel, lotion)
  concerns: [{ 
    type: String, 
    enum: ['acne', 'wrinkles', 'dark spots', 'redness', 'dullness', 'pores', 'dryness'] 
  }], // Skin concerns the product addresses
  usageInstructions: { type: String }, // Instructions on how to use the product
  spf: { type: Number }, // SPF level for products offering sun protection
  suitableForSensitiveSkin: { type: Boolean, default: false }, // Whether the product is suitable for sensitive skin
  
  // Certifications and attributes
  certifications: [{ type: String }], // Certifications like 'Vegan', 'Cruelty-Free', 'Dermatologist-Tested'
  isVegan: { type: Boolean, default: false }, // Vegan flag
  isCrueltyFree: { type: Boolean, default: false }, // Cruelty-Free flag
  fragranceFree: { type: Boolean, default: false }, // Whether the product is fragrance-free
  parabenFree: { type: Boolean, default: false }, // Whether the product is paraben-free

  // User reviews
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who submitted the review
    rating: { type: Number, min: 1, max: 5 }, // Rating between 1 and 5
    comment: { type: String }, // Review comment
    date: { type: Date, default: Date.now } // Date of the review
  }], // Array of reviews
  ratings: { type: Number, default: 0 }, // Average product rating
  reviewCount: { type: Number, default: 0 }, // Total number of reviews

  // Additional marketing and logistics
  expirationDate: { type: Date }, // Expiration date for the product
  isFeatured: { type: Boolean, default: false }, // Whether the product is featured
  discount: { 
    percentage: { type: Number }, // Discount percentage
    validUntil: { type: Date } // Discount validity
  }, // Discount information
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Array of related products for cross-selling or upselling

  createdAt: { type: Date, default: Date.now } // Creation date
});


module.exports = mongoose.model('Skincare', skincareSchema);
