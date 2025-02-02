const {OAuth2Client}=require('google-auth-library')
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer');
const userModel = require('../models/user.model');
const AppError = require('../utils/appError');
const {promisify}=require('util')

const signJWT=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET)
}

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

 let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'codeetgo@gmail.com',
                pass:"ajtr hgyi yqsz tkgv"
            }
        })
// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role,verificationCode } = req.body;
        
        // Check if the user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new userModel({
            name,
            email,
            password,
            verificationCode
        });
       
        await user.save();

        const token=signJWT(user._id)
res.cookie("token",token)
        let mailOptions={
            from:'"LD COSMO"',
            to:req.body.email,
            subject:'Verify your email address.',
            text:"Welcome To LD COSMO",
            html:`
            <p>Hello</p>
            <p>Welcome to LD COSMO! Please verify your email address by inserting this code in your verifying page:</p>
            <p><strong>${verificationCode}</strong></p>
            <p>If you didn't create an account with LD COSMO, please ignore this email.
            </p>
            `
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
                res.status(400).json({
                    status:400,
                    message:"An Error Occurred"
                })
            }
            res.status(200).json({status:200,
        message:"Email sent successfully, Please check your email to verify and please check the spams folder in your email if you don't find it in your inbox",
            token,
            id:user._id})
        })   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
};

// Login user
exports.loginUser = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        if(!email||!password){
        return next(new AppError('Please provide email and password!',400))
    }else{
        let user= await userModel.findOne({email:email}).select('+password')
        if(!user || !await user.correctPassword(password,user.password) ||!user.isVerified){
            res.status(401).json({message:"Incorrect email or password!"})
            return
        }
        const token =signJWT(user._id)
        res.cookie("token", token,{httpOnly:true});
        res.status(200).json(token);
    }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllUsers=async(req,res)=>{
    try{
        const users=await userModel.find()
        res.status(200).json(users)
    }catch(error){
        console.log(error)
    }
}
exports.resendCode=async (req,res)=>{
    try{
        const {verificationCode,email}=req.params
        let mailOptions={
            from:'"LD COSMO"<LD COSMO>',
            to:email,
            subject:'Verify your email address.',
            text:"Welcome To LD COSMO",
            html:`
            <p>Hello</p>
            <p>Welcome to LD COSMO! Please verify your email address by inserting this code in your verifying page:</p>
            <p><strong>${verificationCode}</strong></p>
            <p>If you didn't create an account with LD COSMO, please ignore this email.
            </p>
            `
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
                res.status(400).json({
                    status:400,
                    message:"An Error Occurred"
                })
            }
            res.status(200).json({status:200,
        message:"Email sent successfully, Please check your email to verify and please check the spams folder in your email if you don't find it in your inbox",
            })
        })
    }catch(error) {
        console.log(error)
    }
}

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, currentPassword,newPassword,phoneNumber,emailAlert } = req.body;

        let user = await userModel.findById(req.user.id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.phoneNumber=phoneNumber || user.phoneNumber
            user.emailAlert=emailAlert|| user.emailAlert
            user.smsAlert=smsAlert|| user.smsAlert
            if (password && await user.correctPassword(currentPassword,user.password)) {
                user.password=newPassword||user.password 
            }

            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.verifyUser = async (req, res) => {
    try {
        
        

        let user = await userModel.findById(req.params.id);

        if (user) {
            user.isVerified = true;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all users (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete user (Admin)
exports.deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllUser=async(req,res)=>{
    try{
        const users=await userModel.find({})
        res.status(200).json(users)
    }catch(error){
       res.status(500).json({ message: err.message }); 
    }
}
exports.googleSignup=async(req,res)=>{
    try{
        const googleToken=req.body.credential
        const  ticket=await client.verifyIdToken({
            idToken:googleToken,
            audience:process.env.GOOGLE_CLIENT_ID 
        }) 
        const payload=ticket.getPayload()
        const {sub,email,name,picture}=payload
        console.log(sub,email)
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new userModel({
            name,
            email,
            password:sub,
            profilePicture:picture,
            isVerified:true
            
        });
       
        await user.save();

        const token=signJWT(user._id)
        res.cookie("token",token)
        res.status(201).json(token)
    }catch(error){
        console.log(error)
        res.status(400).json(error.message)
    }
}

exports.googleLogin=async(req,res)=>{
    try{
        const googleToken=req.body.credential
        const  ticket=await client.verifyIdToken({
            idToken:googleToken,
            audience:process.env.GOOGLE_CLIENT_ID 
        }) 
        const payload=ticket.getPayload()
        const {sub,email}=payload
         let user= await userModel.findOne({email:email}).select('+password')
        if(!user || !await user.correctPassword(sub,user.password) ||!user.isVerified){
            res.status(401).json({message:"You haven't signed in!!"})
            return
        }
        const token =signJWT(user._id)
        res.cookie("token",token)
        
        res.status(200).json(token);

    }catch(error){
        console.log(error)
        res.status(400).json(error.message)
    }
}
exports.protect=async(req,res,next)=>{
    try{
        
      
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
        console.log(token)
    }

    if(!token){
       
        return res.status(401).json({ message: 'You are not logged in! Please log in to get access' });
    }
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    const currentUser=await userModel.findById(decoded.id)
    if(!currentUser){
        // return next(new AppError('The user belonging to this token does no longer exist.',401))
        return res.status(401).json({ message: 'User does not exist!' });

    }
    req.user=currentUser
    next()
}catch(error){
    res.status(400).json(error.message)
}
}
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next(); // Proceed if role is allowed
  };
};
