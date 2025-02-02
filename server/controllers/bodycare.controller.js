const Bodycare = require('../models/bodycare.model');
const reviewModel = require('../models/review.model');
const socketManager = require('../utils/socketManager');

// Create a new Bodycare
exports.createBodycare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const newBodycare = new Bodycare(req.body);
    console.log(req.data)
    const savedBodycare = await newBodycare.save();
    io.emit('get-all-products')
    res.status(201).json({ success: true, data: savedBodycare });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create Bodycare', error: error.message });
  }

}

// Get all Bodycares with optional filters, pagination, and sorting
exports.getAllBodycares = async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
  try {
    
    const Bodycares = await Bodycare.find(filters)
      .sort(sort)
      // .limit(limit * 1)
      // .skip((page - 1) * limit);
      
    res.status(200).json({ success: true, data: Bodycares });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Bodycares', error: error.message });
  }
};

// Get a Bodycare by ID
exports.getBodycareById = async (req, res) => {
  try {
    const Bodycare = await Bodycare.findById(req.params.id);
    
        const reviews = await reviewModel.findOne({ productId:req.params.id })
            .populate('reviews.user', 'name');
    if (!Bodycare) {
      return res.status(404).json({ success: false, message: 'Bodycare not found' });
    }
    res.status(200).json({ success: true, data: Bodycare,reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Bodycare', error: error.message });
  }
};

// Update a Bodycare by ID
exports.updateBodycare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const updatedBodycare = await Bodycare.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBodycare) {
      return res.status(404).json({ success: false, message: 'Bodycare not found' });
    }
    res.status(200).json({ success: true, data: updatedBodycare });
    io.emit('get-all-products')
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update Bodycare', error: error.message });
  }
};

// Delete a Bodycare by ID
exports.deleteBodycare = async (req, res) => {
  try {
    const io = socketManager.getIO();
    const deletedBodycare = await Bodycare.findByIdAndDelete(req.params.id);
    if (!deletedBodycare) {
      return res.status(404).json({ success: false, message: 'Bodycare not found' });
    }
    io.emit('get-all-products')
    res.status(200).json({ success: true, message: 'Bodycare deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete Bodycare', error: error.message });
  }
};
