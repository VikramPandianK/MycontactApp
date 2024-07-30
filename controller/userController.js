const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//@desc Get list of users
//@route GET api/v1/users
//@access public
const getAllUsers = asyncHandler(async(req,res)=>{
res.send("welcome");
});

//@desc Create User
//@route POST api/v1/users/register
//@access public
const registerUser = asyncHandler(async(req,res)=>{
 const {username,email,phone,password} = req.body;
 if(!username || !email || !phone || !password){
    res.status(400);
    throw new Error("Please provide all the details");
 }
 const checkUser = await User.findOne({email});

 if(checkUser){
    res.status(400);
    throw new Error("User already registered ");
 }
 const hashPassword  = await bcrypt.hash(password,10);
 const user = await User.create(
   { username, email,phone,password:hashPassword}
 )
 if(user){
    res.status(201).json({msg:"success","user Id":user.id,"user email":user.email});
 }else{
     res.status(400);
     throw new Error("Data is invalid")
 }

});

//@desc Login User
//@route POST api/v1/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const checkUser = await User.findOne({email});
    
    if(!checkUser){
     res.status(400);
     throw new Error(`Can't find the user with this email id ${email}`);
    }
    const passwordCheck = await bcrypt.compare(password,checkUser.password);
    if(checkUser && passwordCheck){
        const accessToken = jwt.sign({
            user:{
                id: checkUser.id,
                username :  checkUser.username,
                email : checkUser.email,
                phone: checkUser.phone
            }
        },process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"15m"} );
        res.status(200).json({token:accessToken,username:checkUser.username,email:checkUser.email,phone:checkUser.phone});
    }else{
       res.status(400).json({msg:"Email or password is incorrect",status:"Error"});
    }
   
});

//@desc Current User
//@route POST api/v1/users/current
//@access private
const currentUser = asyncHandler(async(req,res)=>{
res.json({user:req.user});
});







module.exports = {getAllUsers,registerUser,loginUser,currentUser}
