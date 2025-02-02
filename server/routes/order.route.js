const express=require('express')
const { createOrder, updateOrder, deleteOrder, getAllOrders, getOrderById } = require('../controllers/order.controller')
const { pay, verifyPayment } = require('../utils/payment')
const { protect, restrictTo } = require('../controllers/authControllers')
const router=express.Router()

router.route('/create-order').post(protect,createOrder)
router.route('/update-order/:id').patch(protect,updateOrder)
router.route('/delete-order/:id').delete(protect,deleteOrder)
router.route('/get-all-orders').get(protect,restrictTo("admin"),getAllOrders)
router.route('/get-order').get(protect,getOrderById)
router.route('/pay').post(protect,pay)
router.route('/verify-payment/:orderID/:id').get(verifyPayment)
module.exports=router