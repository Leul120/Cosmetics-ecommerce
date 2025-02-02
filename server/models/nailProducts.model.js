const mongoose=require('mongoose')
const nailProductSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  brand: { type: String, required: true }, // Brand name
  // price: { type: Number, required: true }, // Price of the product
  type: { 
    type: String, 
    enum: ['nail polish', 'nail treatment', 'remover', 'top coat', 'base coat'], // Expanded nail product types
    required: true 
  }, // Specific nail product types
  colors: [{ type: String }], // Available colors for nail polishes
  ingredients: [{ type: String }], // List of ingredients
  category: { type: String, default: 'nail' }, // Product category fixed as 'nail'
  description: { type: String }, // Product description
  stock: { type: Number, default: 0 }, // Available stock quantity
  images: [{ 
    imageUrl: String, // URL for the image
    publicId: String  // Public ID for image storage
  }], // Array of image URLs

  // New fields
  finish: { 
    type: String, 
    enum: ['matte', 'glossy', 'shimmer', 'metallic'] 
  }, // Finish of the nail polish (matte, glossy, etc.)
  sizes: [{
    size:String,
    price:Number
  }], // Size of the product (e.g., 15ml bottle of nail polish)
  nailType: { 
    type: String, 
    enum: ['normal', 'weak', 'brittle', 'dry'] 
  }, // Suitable nail types
  benefits: [{ type: String }], // List of product benefits (e.g., strengthening, nourishing)
  dryingTime: { type: String }, // Estimated drying time for the nail polish or treatment
  longLasting: { type: Boolean, default: false }, // Whether the product is long-lasting
  chipResistant: { type: Boolean, default: false }, // Chip resistance flag
  scent: { type: String }, // Fragrance or scent of the product (if any)
  
  // Certifications and Marketing
  certifications: [{ type: String }], // Certifications like 'Vegan', 'Cruelty-Free', 'Paraben-Free'
  isVegan: { type: Boolean, default: false }, // Vegan flag
  isCrueltyFree: { type: Boolean, default: false }, // Cruelty-Free flag
  
  // User reviews
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user who submitted the review
    rating: { type: Number, min: 1, max: 5 }, // Rating between 1 and 5
    comment: { type: String }, // Review comment
    date: { type: Date, default: Date.now } // Date of the review
  }], // Array of reviews
  ratings: { type: Number, default: 0 }, // Average rating of the product
  reviewCount: { type: Number, default: 0 }, // Total number of reviews
  
  // Additional marketing fields
  expirationDate: { type: Date }, // Expiration date for the product
  isFeatured: { type: Boolean, default: false }, // If the product is a featured product
  discount: { 
    percentage: { type: Number }, // Discount percentage if any
    validUntil: { type: Date } // Validity of the discount
  }, // Discount details
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Array of related product IDs
  
  createdAt: { type: Date, default: Date.now } // Creation date
});



module.exports = mongoose.model('NailProduct', nailProductSchema);
