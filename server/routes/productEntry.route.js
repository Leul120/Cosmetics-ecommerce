const express=require('express')
const router=express.Router()

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const { createFragrance } = require('../controllers/fragrance.controller');
const { createNail } = require('../controllers/nail.controller');
const { createHaircare } = require('../controllers/haircare.controller');
const { createBodycare } = require('../controllers/bodycare.controller');
const { createSkincare } = require('../controllers/skincare.controller');
const { createMakeup } = require('../controllers/makeup.controller');
const { protect, restrictTo } = require('../controllers/authControllers');
// const { approveProperty } = require('../controllers/adminControllers');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder to store images in Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
}).fields([
  { name: 'image', maxCount: 10 },
  
]);

router.post('/upload',protect,restrictTo("admin"), upload, (req, res) => {
  try {
    const files = req.files;

    
    console.log(files)
    // Process property images
    
     const response = files.image.map((file) => ({
        imageUrl: file.path,
        publicId: file.filename,
      }));
    

    // Process deed image
    

    // Process ID image
    

    res.json({
      message: 'Images uploaded successfully',
      images: response,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error });
  }
});

// Delete route
router.get('/delete/uploads/:publicId',protect,restrictTo("admin"), async (req, res) => {
  try {
    const { publicId } = req.params; // Expect an array of publicIds
    await cloudinary.uploader.destroy(publicId);
    console.log("image deleted")
    res.json({ message: 'Images deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting images', error });
  }
});

// Update route
router.put('/update',protect,restrictTo("admin"), upload, async (req, res) => {
  try {
    const { publicIds } = req.body; // Expect an array of publicIds
    const files = req.files;

    const response = {};

    // Delete the old images and upload the new ones
    if (publicIds.property && files.property) {
      const deletePromises = publicIds.property.map(publicId => cloudinary.uploader.destroy(publicId));
      await Promise.all(deletePromises);

      response.propertyImages = files.property.map((file) => ({
        imageUrl: file.path,
        publicId: file.filename,
      }));
    }

    if (publicIds.deed && files.deed) {
      await cloudinary.uploader.destroy(publicIds.deed[0]);

      response.deedImage = {
        imageUrl: files.deed[0].path,
        publicId: files.deed[0].filename,
      };
    }

    if (publicIds.id && files.id) {
      await cloudinary.uploader.destroy(publicIds.id[0]);

      response.idImage = {
        imageUrl: files.id[0].path,
        publicId: files.id[0].filename,
      };
    }

    res.json({
      message: 'Images updated successfully',
      images: response,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating images', error });
  }
});

router.route('/create-fragrance').post(protect,restrictTo("admin"),createFragrance)
router.route('/create-makeup').post(protect,restrictTo("admin"),createMakeup)
router.route('/create-skincare').post(protect,restrictTo("admin"),createSkincare)
router.route('/create-bodycare').post(protect,restrictTo("admin"),createBodycare)
router.route('/create-haircare').post(protect,restrictTo("admin"),createHaircare)
router.route('/create-nail').post(protect,restrictTo("admin"),createNail)

module.exports=router