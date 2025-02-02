const express=require('express')
const { addReview, getReviewsByProduct, updateReview, deleteReview } = require('../controllers/review.controller')
const { protect } = require('../controllers/authControllers')
const router=express.Router()

router.route('/add-review').post(protect,addReview)
router.route('/get-review/:productId').get(protect,getReviewsByProduct)
router.route('/update-review/:productId/:reviewId').patch(protect,updateReview)
router.route('/delete-review/:productId/:reviewId').delete(protect,deleteReview)

module.exports=router