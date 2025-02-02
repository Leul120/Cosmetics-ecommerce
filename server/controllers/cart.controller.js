// const {socket} = require("../app");
const mongoose = require('mongoose');
const cartModel = require("../models/cart.model");
const socketManager = require('../utils/socketManager');



exports.addToCart = async (req, res) => {
  const io = socketManager.getIO();
  try {
    const { productId, quantity, items, discount, total,size } = req.body;
    
    const userId = req.user._id.toString();
    let cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      
      cart = new cartModel({ user: userId, items: items});
    } else {
      
      const productIndex = cart.items.findIndex(item =>item.product === productId && item.size===size);
    
      
      if (productIndex > -1) {
        
        cart.items[productIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity, ...items });
      }
    }


    const updatedCart = await cart.save();
    io.emit('get-cart')
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to add to cart', error: error.message });
  }
};


// Get a customer's cart
exports.getCartByCustomer = async (req, res) => {
  try {
    
    // Find the cart for the given customer
    
    const cart = await cartModel.findOne({ user:req.user._id });
    

    if (!cart) {
      return res.status(400).json({ success: false, message: 'Cart not found' });
    }

    // If the cart is empty, return an empty product array
    if (!cart.items || cart.items.length === 0) {
      return res.status(200).json({ success: true, products: [] });
    }
    
   
    // Return the list of populated products
    res.status(200).json({ success: true, cart });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve cart', error: error.message });
  }
};

// Remove a product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    const cart = await cartModel.findOne({ customer: customerId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.products = cart.products.filter(item => item.product.toString() !== productId);
    const updatedCart = await cart.save();
    socket.emit('get-cart')
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove from cart', error: error.message });
  }
};

// Update Cart Item Quantity
exports.updateCartItem = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const { userId, id } = req.params;
    const { quantity } = req.body;

    let cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(item => item._id.toString() === id);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    cart.items[productIndex].quantity = quantity;

    // Recalculate total
    const updatedTotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity * ((100 - item.discount) / 100)), 0);
    cart.total = updatedTotal;

    const updatedCart = await cart.save();
    io.emit('get-cart')
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update cart item', error: error.message });
  }
};

// Remove Item from Cart
exports.removeCartItem = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const { userId, id } = req.params;

    let cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(item => item._id.toString() === id);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    // Remove the item
    cart.items.splice(productIndex, 1);

    // Recalculate total
    const updatedTotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity * ((100 - item.discount) / 100)), 0);
    cart.total = updatedTotal;

    const updatedCart = await cart.save();
    io.emit('get-cart')
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to remove cart item', error: error.message });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const userId = req.params.userId;

    let cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Clear all items
    cart.items = [];
    cart.total = 0;

    const updatedCart = await cart.save();
    io.emit('get-cart')
    res.status(200).json({ success: true, message: 'Cart cleared', data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to clear cart', error: error.message });
  }
};

// Checkout Cart
exports.addNote=async(req,res)=>{
  try{
    const io = socketManager.getIO();
    const {productId,id}=req.params
    const {note}=req.body
    let cart = await cartModel.findOne({ user: req.user._id });

    
      
      const productIndex = cart.items.findIndex(item => item._id.toString() === productId);
      console.log(productIndex)
      if(productIndex>-1){
      cart.items[productIndex].note=note
      const updatedCart = await cart.save();
    io.emit('get-cart')
    res.status(200).json({ success: true, data: updatedCart });
      }else{
        res.status(400).json("error")
      }
    
  }catch(error){
    console.log(error)
    res.status(400).json(error.message)
  }
}
exports.checkoutCart = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const userId = req.params.userId;

    let cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Mark the cart as checked-out
    cart.status = 'checked-out';

    const checkedOutCart = await cart.save();
    io.emit('get-cart')
    res.status(200).json({ success: true, message: 'Cart checked out', data: checkedOutCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to checkout cart', error: error.message });
  }
};
exports.getAllCart=async(req,res)=>{
  try{
    const cart=await cartModel.find().populate('user')
    res.status(200).json(cart)
  }catch(error){
    console.log(error)
    res.status(200).json(error)
  }
}