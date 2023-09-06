const express = require('express')
const bcrypt = require('bcrypt');

const User  = require('../models/userModel');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');


exports.getUsers = async (req, res) => {

    const user = await User.find({},'firstname email');

    if(user){
        return res.json(user);
    }
}


// register new user

exports.registerUser = async (req, res) => {

    const {firstname, email, password, password_confirmation} = req.body;

    if(!firstname || !email || !password || !password_confirmation){
        return res.status(400).json({error:"invalid request, all fields are required"});

    }

    if(!validator.isEmail(email)){
        return res.status(400).json({error:"invalid email address"});
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }

    if(!validator.equals(password,password_confirmation)){
        return res.status(400).json({error:"password not matched"});
    }


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try{

        

        const user = await new User({
            firstname, email, password: hashPassword,
        });

        if(user){
            user.save();

            // generate jwt token

            const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'3h'});

            return res.status(200).json({user,token});
        }
    }

    catch(error){
        return res.status(500).json({error:"add internal server error occurred"});
    }
}


// login user

exports.loginUser = async(req, res) => {
    

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error:"invalid inputs, all fields are required"});
    }

    const existed = await User.findOne({email});

    if(!existed){
        return res.status(400).json({error:"User not found"});
    }

    const validatePassword = await bcrypt.compare(password, existed.password);

    if(!validatePassword){
        return res.status(400).json({error:"Invalid Password"});
    }

    
    try{
        const user = await User.findOne({email});
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'3h'});

        return res.status(200).json({user,token});
    }

    catch(error){
        return res.status(500).json({message : "invalid error"});
    }


}


// forgot password

exports.forgotPassword = async(req,res) => {

    const {email} = req.body;

    const generateRandon = () => {
        return crypto.randomBytes(20).toString('hex');
    }

    if(!email){
        return res.status(400).json({error:"email field is required"});
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({error:"invalid email format"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({error:"User not registered"});
    }

    const resetToken = generateRandon();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000 ;

    await user.save();


    return res.status(200).json({
        message:"password reset mail has been set to your email",
        content:`You are receiving this email because you (or someone else) requested a password reset for your account.
        Please click on the following link or paste it into your browser to reset your password:
        ${process.env.BASE_URL}/reset-password/${resetToken}
        If you did not request this, please ignore this email and your password will remain unchanged.`
    });

    

}


// reset-password



// reset password

exports.resetPassword = async(req,res) => {


const {password, password_confirmation} = req.body;

const resetToken = req.params['token'];

// validations

if(!password || !password_confirmation){
    return res.status(400).json({error:"password fields are required"});
}

if(!validator.equals(password,password_confirmation)){
    return res.status(400).json({error:"passwords not matched"});
}

const user = await User.findOne({resetPasswordToken : resetToken , resetPasswordExpires : {$gt : Date.now()}});

if(!user){
    return res.status(400).json({error:"expired or invalid reset token"});
}

// brycrpty password

const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(password, salt);

// update user password
user.password = hashPassword;
user.resetPasswordToken = undefined;
user.resetPasswordExpires = undefined;

await user.save();

const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'3h'});

return res.status(200).json({user, token});



// return res.status(200).json({message : resetToken});

    

}





