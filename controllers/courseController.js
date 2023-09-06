const express = require('express')

const Course = require('../models/courseModel');



exports.getCourse = async(req,res) => {
   

    const course = await Course.find({});



    return res.status(200).json(course);
}


// create new course

exports.createCourse = async(req, res) => {
    // title: {type:String, required:true},
    // coursecode :{type:String, unique:true},
    // type: {type:String, required:true},
    // level: {type:String, required:true},
    // payment_type: {type:String, required:true},
    // amount: {type:Number, required:true},
    // tutor: {type:String, required:true},
    // minutes: {type:Number, required:true},
    // image_url: {type:String, required:true},
    // tutor_description: {type:String, required:true},
    // course_description: {type:String, required:true},
    // is_active: {type:Boolean, default:true},
    // rating: {type:Number, default:undefined},


    const {title, coursecode, type, level, payment_type, amount, tutor, image_url, tutor_description, course_description} = req.body;

    // validation

    if(!title || !coursecode || !type || !level || !payment_type || !amount || !tutor || !image_url || !tutor_description || !course_description){
        return res.status(400).json({error:"all necessary fields are required"});
    }

    // check if course with coursecode already exists

    const course = await Course.findOne({coursecode});

    if(course){
        return res.status(400).json({error:"Course already exists"});
    }

    // create the course

    const newCourse = new Course({
        title, coursecode, type, level, payment_type, amount, tutor, image_url, tutor_description, course_description
    });

    await newCourse.save();

    return res.status(200).json(newCourse);

}


// get unique course with the coursecode

exports.getUnique = async(req, res) => {

    const coursecode = req.params['coursecode'];


    const course = await Course.findOne({coursecode});
    
    if(!course){
        return res.status(400).json({error : "Course does not exists"});

    }

    return res.status(200).json({course});

}


