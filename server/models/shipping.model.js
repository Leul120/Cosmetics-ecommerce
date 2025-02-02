const shippingSchema = new mongoose.Schema({
  method: { type: String, required: true }, // e.g., 'Standard', 'Express'
  cost: { type: Number, required: true },
  estimatedDelivery: { type: String, required: true } // e.g., '3-5 business days'
});

module.exports = mongoose.model('Shipping', shippingSchema);
