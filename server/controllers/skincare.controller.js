const Skincare = require('../models/skincare.model');
const socketManager = require('../utils/socketManager');

// Create a new Skincare
exports.createSkincare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const newSkincare = new Skincare(req.body);
    console.log(req.data)
    const savedSkincare = await newSkincare.save();
    io.emit('get-all-products')
    res.status(201).json({ success: true, data: savedSkincare });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create Skincare', error: error.message });
  }
};

// Get all Skincares with optional filters, pagination, and sorting
exports.getAllSkincares = async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
  try {
    const Skincares = await Skincare.find(filters)
      .sort(sort)
      // .limit(limit * 1)
      // .skip((page - 1) * limit);
    res.status(200).json({ success: true, data: Skincares });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Skincares', error: error.message });
  }
};

// Get a Skincare by ID
exports.getSkincareById = async (req, res) => {
  try {
    const Skincare = await Skincare.findById(req.params.id);
    const reviews = await reviewModel.findOne({ productId:req.params.id })
            .populate('reviews.user', 'name');
    if (!Skincare) {
      return res.status(404).json({ success: false, message: 'Skincare not found' });
    }
    res.status(200).json({ success: true, data: Skincare ,reviews});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Skincare', error: error.message });
  }
};

// Update a Skincare by ID
exports.updateSkincare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const updatedSkincare = await Skincare.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSkincare) {
      return res.status(404).json({ success: false, message: 'Skincare not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, data: updatedSkincare });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update Skincare', error: error.message });
  }
};

// Delete a Skincare by ID
exports.deleteSkincare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const deletedSkincare = await Skincare.findByIdAndDelete(req.params.id);
    if (!deletedSkincare) {
      return res.status(404).json({ success: false, message: 'Skincare not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, message: 'Skincare deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete Skincare', error: error.message });
  }
};
