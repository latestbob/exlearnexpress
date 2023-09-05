const express = require('express')
const bcrypt = require('bcrypt');

const User  = require('../models/userModel');
const validator = require('validator')


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
            return res.status(200).json({user:user});
        }
    }

    catch(error){
        return res.status(500).json({error:"add internal server error occurred"});
    }
}






