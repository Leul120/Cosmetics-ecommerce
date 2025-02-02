const express=require('express')
const { getAllProducts, getProductById } = require('../controllers/product.controller')
const { restrictTo, protect } = require('../controllers/authControllers')
const router=express.Router()

router.route('/get-all-products').get(getAllProducts)
router.route('/get-all-products-admin').get(protect,restrictTo("admin"),getAllProducts)
router.route('/get-product/:category/:id').get(getProductById)


module.exports=router