const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    firstname: {type:String, required:true},
    email: {type:String, unique:true, required:true},
    password: {type:String,required:true},
    // password_confirmation: {type:String, required:true}
    isAdmin: {type: Boolean, default:false},
    resetPasswordToken : {type:String, default:undefined},
    resetPasswordExpires: {type:Date, default:undefined}
    
});

// Add the resetPasswordToken and resetPasswordExpires fields to the schema
// userSchema.add({
//     resetPasswordToken: String,
//     resetPasswordExpires: Date,
// });


const User = mongoose.model('User',userSchema);

module.exports = User;