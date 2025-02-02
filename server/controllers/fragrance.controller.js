const Fragrance = require('../models/fragrance.model');
const socketManager = require('../utils/socketManager');

// Create a new Fragrance
exports.createFragrance = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const newFragrance = new Fragrance(req.body);
    console.log(req.data)
    const savedFragrance = await newFragrance.save();
    io.emit('get-all-products')
    res.status(201).json({ success: true, data: savedFragrance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create Fragrance', error: error.message });
  }
};

// Get all Fragrances with optional filters, pagination, and sorting
exports.getAllFragrances = async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
  try {
    const fragrances = await Fragrance.find(filters)
      .sort(sort)
      // .limit(limit * 1)
      // .skip((page - 1) * limit);
    res.status(200).json({ success: true, data: fragrances });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Fragrances', error: error.message });
  }
};

// Get a Fragrance by ID
exports.getFragranceById = async (req, res) => {
  try {
    const fragrance = await Fragrance.findById(req.params.id);
    const reviews = await reviewModel.findOne({ productId:req.params.id })
            .populate('reviews.user', 'name');
    if (!Fragrance) {
      return res.status(404).json({ success: false, message: 'Fragrance not found' });
    }
    res.status(200).json({ success: true, data: fragrance,reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Fragrance', error: error.message });
  }
};

// Update a Fragrance by ID
exports.updateFragrance = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const updatedFragrance = await Fragrance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFragrance) {
      return res.status(404).json({ success: false, message: 'Fragrance not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, data: updatedFragrance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update Fragrance', error: error.message });
  }
};

// Delete a Fragrance by ID
exports.deleteFragrance = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const deletedFragrance = await Fragrance.findByIdAndDelete(req.params.id);
    if (!deletedFragrance) {
      return res.status(404).json({ success: false, message: 'Fragrance not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, message: 'Fragrance deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete Fragrance', error: error.message });
  }
};
