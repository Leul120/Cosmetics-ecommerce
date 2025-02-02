const express=require('express')
const { addToCart, getCartByCustomer, removeCartItem, updateCartItem, getAllCart, addNote } = require('../controllers/cart.controller')
const { protect, restrictTo } = require('../controllers/authControllers')
const router=express.Router()

router.route('/add-to-cart').post(protect,addToCart)
router.route('/get-from-cart').get(protect,getCartByCustomer)
router.route('/remove-item/:id').delete(protect,removeCartItem)
router.route('/update-item/:id').patch(protect,updateCartItem)
router.route('/get-all-cart').get(protect,restrictTo("admin"),getAllCart)
router.route('/add-note/:productId').post(protect,addNote)

module.exports=router