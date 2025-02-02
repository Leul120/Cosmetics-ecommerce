const mongoose=require('mongoose')
const bodyCareSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  brand: { type: String, required: true }, // Brand name

  type: { 
    type: String, 
    enum: ['lotion', 'scrub', 'deodorant', 'body wash', 'body butter', 'body oil'], // Expanded body care types
    required: true 
  }, // Specific body care types
  category: { type: String, default: 'bodycare' }, // Category fixed as bodycare
  ingredients: [{ type: String }], // Ingredients list
  description: { type: String }, // Product description
  stock: { type: Number, default: 0 }, // Available stock
  images: [{ 
    publicId: String, // Cloud storage ID
    imageUrl: String  // URL of the image
  }], // Image URLs

  // New fields
  sizes: [{
    size:String,
    price:Number
  }], // Product size (e.g., 200ml, 8oz)
  weight: { type: String }, // Product weight (if applicable)
  skinType: { 
    type: String, 
    enum: ['normal', 'dry', 'oily', 'sensitive', 'combination'] // Suitable skin types
  }, // Targeted skin types
  fragrance: { type: String }, // Fragrance description (e.g., lavender, citrus)
  usageInstructions: { type: String }, // How to use the product
  benefits: [{ type: String }], // List of benefits (e.g., moisturizes, exfoliates, soothes skin)
  safetyWarnings: { type: String }, // Warnings (e.g., for sensitive skin, avoid eyes)
  // Product reviews
  ratings: { type: Number, default: 0 }, // Average rating
  reviewCount: { type: Number, default: 0 }, // Number of reviews

  // Additional fields for marketing and usage details
  certifications: [{ type: String }], // Any certifications (e.g., Organic, Vegan, Cruelty-Free)
  skinSafe: { type: Boolean, default: false }, // Whether the product is safe for skin
  hypoallergenic: { type: Boolean, default: false }, // Hypoallergenic flag for sensitive skin
  expirationDate: { type: Date }, // Expiration date
  isFeatured: { type: Boolean, default: false }, // Whether the product is a featured item
  discount: { 
    percentage: { type: Number }, // Discount percentage (if any)
    validUntil: { type: Date } // Discount validity
  }, // Discount details
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Related products (e.g., body scrub related to body lotion)
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
});

module.exports = mongoose.model('BodyCare', bodyCareSchema);
