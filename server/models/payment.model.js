const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'Stripe'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  transactionId: String,
  paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
