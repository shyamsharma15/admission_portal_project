const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/admissionportal"
const live_Url = 'mongodb+srv://shyamsharma15062002:shyam123@cluster0.i8cnuld.mongodb.net/admissionportal?retryWrites=true&w=majority'


const connectDB= ()=>{
    // for local DB
    return mongoose.connect(live_Url)

    //for cloud DB
    // return mongoose.connect(database)
    .then(()=>{
        console.log("Connected Successfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB
