const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    title: {type:String, required:true},
    coursecode :{type:String, unique:true},
    type: {type:String, required:true},
    level: {type:String, required:true},
    payment_type: {type:String, required:true},
    amount: {type:Number, required:true},
    tutor: {type:String, required:true},
    minutes: {type:Number, default:undefined},
    image_url: {type:String, required:true},
    tutor_description: {type:String, required:true},
    course_description: {type:String, required:true},
    is_active: {type:Boolean, default:true},
    rating: {type:Number, default:undefined},

});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;