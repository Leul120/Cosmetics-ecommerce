const express=require('express')
const { loginUser, registerUser, verifyUser, updateUserProfile, getAllUsers, getUserProfile, resendCode, googleLogin, googleSignup, protect, restrictTo } = require('../controllers/authControllers')
const router=express.Router()

router.route('/login').post(loginUser)
router.route('/signup').post(registerUser)
router.route('/verify-user/:id').get(verifyUser)
router.route('/get-all-users').get(protect,restrictTo("admin"),getAllUsers)
router.route('/get-user/:id').get(getUserProfile)
router.route('/update-profile').patch(protect,updateUserProfile)
router.route('/resend-code/:verificationCode/:email').get(resendCode)
router.route('/google-login').post(googleLogin)
router.route('/google-signup').post(googleSignup)
module.exports=router