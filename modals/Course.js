const mongoose = require('mongoose');

// define schema(fields)
const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    mobile_number:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    profiledata_id:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Pending",
    },
    comment:{
        type:String,
    
    }
},{timestamps:true})

// create collection

const CourseModel = mongoose.model('course',CourseSchema)
// course collection ka name hai aur CourseSchema collection ki fields hai 
module.exports = CourseModel
