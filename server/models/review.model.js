const mongoose=require('mongoose')
const reviewSchema = new mongoose.Schema({
  productId: { type:String,  required: true },
  reviews:[{
       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    rating: { type: Number, min: 1, max: 5 }, // User rating
    comment: { type: String }, // Review comment
    date: { type: Date, default: Date.now() }
  }]
});

module.exports = mongoose.model('Review', reviewSchema);
