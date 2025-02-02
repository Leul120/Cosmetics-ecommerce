const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phoneNumber: String,
  // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  loyaltyPoints: { type: Number, default: 0 },
  profileImage: String,
  preferredSkinType: { type: String, enum: ['Oily', 'Dry', 'Combination', 'Normal'] },
  preferences: [String],
  spent:{type:Number,default:0},
  isVerified:{type:Boolean,default:false},
  verificationCode:Number,
  role:{type:String,enum:["user","admin"],default:"user"},
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next()
  }
  this.password=await bcrypt.hash(this.password,12)
  this.confirmPassword=undefined
  next()
})
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
}

module.exports = mongoose.model('User', userSchema);
