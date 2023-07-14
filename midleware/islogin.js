// yea page humne isliye banaya kii jabb hum new tab mai apni website kaa url daale to dobara login naa karna pade agar pichle tab mai already login tha to 


const islogin = async(req,res,next)=>{
    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if(token){
        res.redirect('/dashboard')
    }
    next()
}

module.exports = islogin


