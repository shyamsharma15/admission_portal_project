const mongoose = require('mongoose');

// define schema(fields)
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:
    {
        public_id: {  // database mai public_id aur url bhejna padega kyunki public_id unique hoti hai har image ki to agar user ko profile change karna hai to purani profile server se delete ho jaaye faltu data naa bhare 
            type:String,

        },
        url:{
            type:String,
        }
    },
    role:{
        type:String,
        default:'student'
    }


},{timestamps:true})

// create collection

const UserModel = mongoose.model('users',UserSchema)
// users collection ka name hai aur UserSchema collection ki fields hai 
module.exports = UserModel


