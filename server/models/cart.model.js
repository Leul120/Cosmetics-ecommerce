const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: String,
        // ref: 'Product', // Uncomment this if you want to populate product details
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
      status: { type: String, enum: ['Pending', 'CheckedOut'], default: 'Pending' },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0, // overall cart discount
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'checked-out', 'abandoned'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


CartSchema.pre('save', function (next) {
  let subtotal = 0;
  let total = 0;
  this.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    total += itemTotal - (itemTotal * (item.discount / 100));
  });

  this.subtotal = subtotal;
  this.total = total - (total * (this.discount / 100));

  this.updatedAt=Date.now()
  next();
});

module.exports = mongoose.model('Cart', CartSchema);




