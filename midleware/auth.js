const jwt = require('jsonwebtoken') // token ko get karne ke liye humne yea package isstall(npm install cookies-parser) kiya tha login mai seccurity daalne ke liye 
//const usermodal = require('../modals/User')
const UserModel = require('../modals/User')
const checkuserauth = async(req,res,next)=>{
    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error', 'Unauthorized User ')
        res.redirect('/')
    }else{
        const verify = jwt.verify(token,'shyamsharma@123#15062002') // yahan par verify mai store karlinge token ki id aur check karinge ki same hai yaa nhi 
        //console.log(verify)
        const user = await UserModel.findById(verify.ID)
        //console.log(user)
        req.profiledata = user
        next() // iss next se wapis web.js mai router.get dashboard par pahuch jaayinge aur dashboard khul jaayega
    }
}

module.exports = checkuserauth


