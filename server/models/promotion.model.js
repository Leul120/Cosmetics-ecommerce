const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  discountPercentage: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Promotion', promotionSchema);
