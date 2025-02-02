const Haircare = require('../models/haircare.model');
const socketManager = require('../utils/socketManager');

// Create a new Haircare
exports.createHaircare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const newHaircare = new Haircare(req.body);
    console.log(req.data)
    const savedHaircare = await newHaircare.save();
    io.emit('get-all-products')
    res.status(201).json({ success: true, data: savedHaircare });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create Haircare', error: error.message });
  }
};

// Get all Haircares with optional filters, pagination, and sorting
exports.getAllHaircares = async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
  try {
    const Haircares = await Haircare.find(filters)
      .sort(sort)
      // .limit(limit * 1)
      // .skip((page - 1) * limit);
    res.status(200).json({ success: true, data: Haircares });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Haircares', error: error.message });
  }
};

// Get a Haircare by ID
exports.getHaircareById = async (req, res) => {
  try {
    const Haircare = await Haircare.findById(req.params.id);
    const reviews = await reviewModel.findOne({ productId:req.params.id })
            .populate('reviews.user', 'name'); 
    if (!Haircare) {
      return res.status(404).json({ success: false, message: 'Haircare not found' });
    }
    res.status(200).json({ success: true, data: Haircare,reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Haircare', error: error.message });
  }
};

// Update a Haircare by ID
exports.updateHaircare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const updatedHaircare = await Haircare.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedHaircare) {
      return res.status(404).json({ success: false, message: 'Haircare not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, data: updatedHaircare });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update Haircare', error: error.message });
  }
};

// Delete a Haircare by ID
exports.deleteHaircare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const deletedHaircare = await Haircare.findByIdAndDelete(req.params.id);
    if (!deletedHaircare) {
      return res.status(404).json({ success: false, message: 'Haircare not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, message: 'Haircare deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete Haircare', error: error.message });
  }
};
