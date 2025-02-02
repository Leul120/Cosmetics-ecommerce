const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  country: String,
  logo: String, // URL to brand logo
  crueltyFree: { type: Boolean, default: false },
  veganFriendly: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Brand', brandSchema);
