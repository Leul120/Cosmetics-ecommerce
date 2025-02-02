const Category = require('../models/category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve categories', error: error.message });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve category', error: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category', error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
  }
};
