const inventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  stockQuantity: { type: Number, required: true },
  lowStockThreshold: { type: Number, default: 10 }, // Alert when stock falls below this number
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);
