const Brand = require('../models/brand');

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const savedBrand = await newBrand.save();
    res.status(201).json({ success: true, data: savedBrand });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create brand', error: error.message });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve brands', error: error.message });
  }
};

// Get a brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve brand', error: error.message });
  }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBrand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update brand', error: error.message });
  }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete brand', error: error.message });
  }
};
