const mongoose=require('mongoose')

const fragranceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Fragrance name with trimming to avoid unnecessary spaces
  brand: { type: String, required: true, trim: true }, // Brand name with trimming
  price: { type: Number, required: true, min: 0 }, // Price should be non-negative
  type: { 
    type: String, 
    enum: ['perfume', 'cologne', 'body spray', 'eau de toilette', 'eau de parfum'], // Common fragrance types
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['unisex', 'male', 'female'], // Gender-based classification
    required: true 
  },
  sizes: [{
    size:String,
    price:Number
  }],
  scentProfile: [{ type: String, trim: true }], // Describes the scent (e.g., floral, woody, citrus, aquatic)
  category: { type: String, default: 'fragrance', immutable: true }, // Immutable category for product classification
  description: { type: String, required: true, trim: true }, // Detailed description of the product
  stock: { type: Number, default: 0, min: 0 }, // Stock should never be negative
  ingredients: [{ type: String, trim: true }], // Key ingredients in the fragrance
  longevity: { 
    type: String, 
    enum: ['short', 'moderate', 'long-lasting'], // Duration of the fragrance on the skin
    required: true 
  },
  season: [{ 
    type: String, 
    // enum: ['summer', 'winter', 'spring', 'fall'],
    trim:true, // Recommended seasons for the fragrance
  }],
  occasion: [{ 
    type: String, 
    trim:true
  }],
  concentration: { 
    type: String, 
    enum: ['parfum', 'eau de parfum', 'eau de toilette', 'eau de cologne'], // Concentration levels of the fragrance
  },
  images: [
    {
      imageUrl: { type: String, required: true }, // Image URL required
      publicId: { type: String, required: true }, // Public ID for Cloudinary or similar services
    }
  ],
  reviews: [
    {
      reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reviewer's name or identifier
      rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
      comment: { type: String, required: true }, // Review comment
      createdAt: { type: Date, default: Date.now }, // Timestamp for the review
    }
  ],
  ratings: { type: Number, default: 0 }, // Average rating for the fragrance, calculated from reviews
  bestSeller: { type: Boolean, default: false }, // Flag to indicate if the fragrance is a best-seller
  featured: { type: Boolean, default: false }, // Flag to indicate if the fragrance is featured in promotions
  discontinued: { type: Boolean, default: false }, // Flag to indicate if the fragrance is no longer in production
  discount: { 
    percentage: { type: Number }, // Discount percentage (if any)
    validUntil: { type: Date } // Discount validity
  }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, //
});


fragranceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});




module.exports = mongoose.model('Fragrance', fragranceSchema);
