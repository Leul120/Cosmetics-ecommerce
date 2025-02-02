const bodycareModel = require('../models/bodycare.model');
const fragranceModel = require('../models/fragrance.model');
const haircareModel = require('../models/haircare.model');
const makeupModel = require('../models/makeup.model');
const nailProductsModel = require('../models/nailProducts.model');
const reviewModel = require('../models/review.model');
// const Product = require('../models/product');
const skincareModel = require('../models/skincare.model');

// Create a new product
// exports.createProduct = async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const savedProduct = await newProduct.save();
//     res.status(201).json({ success: true, data: savedProduct });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
//   }
// };

// Get all products with optional filters, pagination, and sorting
exports.getAllProducts = async (req, res) => {
//   const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
  try {
    const product1 = await fragranceModel.find()
    const product2=await skincareModel.find()
    const product3=await haircareModel.find()
    const product4=await bodycareModel.find()
    const product5=await nailProductsModel.find()
    const product6=await makeupModel.find()

    const allData=[
        ...product1,
        ...product2,
        ...product3,
        ...product4,
        ...product5,
        ...product6
    ]
    const products=allData.sort(() => Math.random() - 0.5);

    res.status(200).json(products);
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Failed to retrieve products', error: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const category=req.params.category
    let product={}
    
    if(category==='bodycare'){
         product = await bodycareModel.findById(req.params.id);
         
    }else if(category==='fragrance'){
        product = await fragranceModel.findById(req.params.id);
    }else if(category==='haircare'){
        product = await haircareModel.findById(req.params.id);
    }else if(category==='nail'){
        product = await nailProductsModel.findById(req.params.id);
    }else if(category==='makeup'){
        product = await makeupModel.findById(req.params.id);
    }else if(category==='skincare'){
        product = await skincareModel.findById(req.params.id);
    }


    
    
    if (!product) {
      return res.status(400).json({ success: false, message: 'Product not found' });
    }else{
      const reviews = await reviewModel.findOne({ productId:req.params.id })
            .populate('reviews.user', 'name');
            
            res.status(200).json({product ,reviews});
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Failed to retrieve product', error: error.message });
  }
};

// Update a product by ID
// exports.updateProduct = async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!updatedProduct) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     res.status(200).json({ success: true, data: updatedProduct });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
//   }
// };

// Delete a product by ID
// exports.deleteProduct = async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     res.status(200).json({ success: true, message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
//   }
// };
