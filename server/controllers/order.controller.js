// const Order = require('../models/order');
const orderModel = require('../models/order.model');
const socketManager = require('../utils/socketManager');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const newOrder = new orderModel(req.body);
    const savedOrder = await newOrder.save();
    io.emit('get-order')
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    
    const orders = await orderModel.find().populate('userId');
    res.status(200).json(orders );
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve orders', error: error.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    // console.log(req.params.id)
    const order = await orderModel.find({userId:req.user._id.toString(),paymentStatus:"Completed"})
    console.log(order)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json(  order );
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Failed to retrieve order', error: error.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const io = socketManager.getIO();

    const updatedOrder = await orderModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true, runValidators: true });
    // if (!updatedOrder) {
    //   return res.status(404).json({ success: false, message: 'Order not found' });
    // }
    io.emit('get-order')
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Failed to update order', error: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    io.emit('get-order')
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order', error: error.message });
  }
}
