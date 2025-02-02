const mongoose=require('mongoose')
const haircareSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  brand: { type: String, required: true }, // Brand name
  // price: { type: Number, required: true }, // Price of the product
  type: { 
    type: String, 
    enum: ['shampoo', 'conditioner', 'styling gel', 'treatment', 'serum', 'mask'], // Expanded types
    required: true 
  }, // Specific haircare types
  hairType: { 
    type: String, 
    enum: ['straight', 'wavy', 'curly', 'coily', 'all hair types'] // Expanded hair types
  }, // Targeted hair types
  category: { type: String, default: 'haircare' }, // Category fixed as haircare
  ingredients: [{ type: String }], // Ingredients list
  description: { type: String }, // Product description
  stock: { type: Number, default: 0 }, // Available stock
  images: [{ 
    imageUrl: String, // URL of the image
    publicId: String  // Cloud storage ID
  }], // Image URLs
  
  // New fields
  sizes: [{
    size:String,
    price:Number
  }],// Product size (e.g., 200ml, 16oz)
  weight: { type: String }, // Product weight (if applicable)
  usageInstructions: { type: String }, // How to use the product
  benefits: [{ type: String }], // List of benefits (e.g., moisturizes, strengthens)
  safetyWarnings: { type: String }, // Warnings (e.g., for sensitive skin, avoid eyes)
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    rating: { type: Number, min: 1, max: 5 }, // User rating
    comment: { type: String }, // Review comment
    date: { type: Date, default: Date.now } // Date of the review
  }], // Product reviews
  ratings: { type: Number, default: 0 }, // Average rating
  reviewCount: { type: Number, default: 0 }, // Number of reviews

  // Additional fields for marketing and usage details
  certifications: [{ type: String }], // Any certifications (e.g., Organic, Vegan, Cruelty-Free)
  skinSafe: { type: Boolean, default: false }, // Whether the product is skin-safe
  suitableForChildren: { type: Boolean, default: false }, // Child-friendly
  expirationDate: { type: Date }, // Expiration date
  isFeatured: { type: Boolean, default: false }, // Whether the product is a featured item
  discount: { 
    percentage: { type: Number }, // Discount percentage (if any)
    validUntil: { type: Date } // Discount validity
  }, // Discount details
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Related products (e.g., conditioner for a shampoo)
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
});

module.exports = mongoose.model('Haircare', haircareSchema);
