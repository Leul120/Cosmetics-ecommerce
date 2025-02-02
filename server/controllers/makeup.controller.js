const Makeup = require('../models/makeup.model');
const socketManager = require('../utils/socketManager');

// Create a new Makeup
exports.createMakeup = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const newMakeup = new Makeup(req.body);
    console.log(req.data)
    io.emit('get-all-products')
    const savedMakeup = await newMakeup.save();
    res.status(201).json({ success: true, data: savedMakeup });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create Makeup', error: error.message });
  }
};

// Get all Makeups with optional filters, pagination, and sorting
exports.getAllMakeups = async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
  try {
    const Makeups = await Makeup.find(filters)
      .sort(sort)
      // .limit(limit * 1)
      // .skip((page - 1) * limit);
    res.status(200).json({ success: true, data: Makeups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Makeups', error: error.message });
  }
};

// Get a Makeup by ID
exports.getMakeupById = async (req, res) => {
  try {

    const Makeup = await Makeup.findById(req.params.id);
    const reviews = await reviewModel.findOne({ productId:req.params.id })
            .populate('reviews.user', 'name'); 
    if (!Makeup) {
      return res.status(404).json({ success: false, message: 'Makeup not found' });
    }
    res.status(200).json({ success: true, data: Makeup });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Makeup', error: error.message });
  }
};

// Update a Makeup by ID
exports.updateMakeup = async (req, res) => {
  console.log(req.params.id)
  try {
    const io = socketManager.getIO();
    const updatedMakeup = await Makeup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMakeup) {
      return res.status(404).json({ success: false, message: 'Makeup not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, data: updatedMakeup });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Failed to update Makeup', error: error.message });
  }
};

// Delete a Makeup by ID
exports.deleteMakeup = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const deletedMakeup = await Makeup.findByIdAndDelete(req.params.id);
    if (!deletedMakeup) {
      return res.status(404).json({ success: false, message: 'Makeup not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, message: 'Makeup deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete Makeup', error: error.message });
  }
};
