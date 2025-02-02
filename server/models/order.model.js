const mongoose=require('mongoose')
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: {
        type: String,
       
        required: true,
      },
      image:String,
      brand:String,
      size:String,
      name:String,
      note:String,
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
      productModel: {
        type: String,
        enum: ["fragranceModel", "skincareModel", "haircareModel", "nailProductModel", "makeupModel","bodycareModel"],
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0, // percentage discount for the product (optional)
      },
    },
  ],
  phoneNumber:Number,
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  shippingAddress: {
    type:String,
    // required:true
  },

  shippingStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
