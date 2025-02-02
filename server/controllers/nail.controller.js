const Nail = require('../models/nailProducts.model');
const socketManager = require('../utils/socketManager');

// Create a new Nail
exports.createNail = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const newNail = new Nail(req.body);
    console.log(req.data)
    const savedNail = await newNail.save();
    io.emit('get-all-products')
    res.status(201).json({ success: true, data: savedNail });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create Nail', error: error.message });
  }
};

// Get all Nails with optional filters, pagination, and sorting
exports.getAllNails = async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
  try {
    const Nails = await Nail.find(filters)
      .sort(sort)
      // .limit(limit * 1)
      // .skip((page - 1) * limit);
    res.status(200).json({ success: true, data: Nails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Nails', error: error.message });
  }
};

// Get a Nail by ID
exports.getNailById = async (req, res) => {
  try {
    const Nail = await Nail.findById(req.params.id);
    const reviews = await reviewModel.findOne({ productId:req.params.id })
            .populate('reviews.user', 'name');
    if (!Nail) {
      return res.status(404).json({ success: false, message: 'Nail not found' });
    }
    res.status(200).json({ success: true, data: Nail,reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Nail', error: error.message });
  }
}

// Update a Nail by ID
exports.updateNail = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const updatedNail = await Nail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedNail) {
      return res.status(404).json({ success: false, message: 'Nail not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, data: updatedNail });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update Nail', error: error.message });
  }
};

// Delete a Nail by ID
exports.deleteNail = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const deletedNail = await Nail.findByIdAndDelete(req.params.id);
    if (!deletedNail) {
      return res.status(404).json({ success: false, message: 'Nail not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, message: 'Nail deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete Nail', error: error.message });
  }
};
