const UserModel = require('../modals/User')
const CourseModal = require('../modals/Course')
const bcrypt = require('bcrypt') // password ko secure karne ke liye yea install kiya tha 
const cloudinary = require('cloudinary').v2; // iss server par hum profile image rakhinge 
const jwt = require('jsonwebtoken') // login ko security provide karne ke liye token generate ke liye 
const nodemailer = require('nodemailer')
cloudinary.config({ // yea cloudinary ki website se hee copy kiya hai setup
    cloud_name: 'dxgc3lozv',
    api_key: '567333937548657',
    api_secret: 'S3ahzgvK1y-9_z79CQek3asqdPc',

});

class FrontController {

    static dashboard = async (req, res) => {
        try {
            // render mai hamesha view walle page kaa name diya jaata hai jo .ejs walle hote hai aur redirect mai router ke path kaa name diya jaata hai 
            //console.log(req.user)
            const { name, email, _id, image } = req.profiledata
            const btech = await CourseModal.findOne({ profiledata_id: _id, course: 'btech' })
            const bca = await CourseModal.findOne({ profiledata_id: _id, course: 'bca' })
            const mca = await CourseModal.findOne({ profiledata_id: _id, course: 'mca' })
            res.render("dashboard", { n: name, image: image, b: btech, bc: bca, mc: mca })  // yea (n:name,image:image) isliye kiya jisse ki navbar mai side mai user jisne login kiya hai uska name aur image show hogi 
        } catch (error) {
            console.log(error)
        }

    }

    static login = (req, res) => {
        try {
            res.render("login", { message: req.flash('success'), error: req.flash('error') }) // yahan message mai store hua hai ( Registration successfully Please Login here ) jo humne neeche insert mai error mai daala tha . Humko kyunki yea message login walle page par hee to show karana hai 
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            res.render("registeration", { message: req.flash('error') })

        } catch (error) {
            console.log(error)
        }

    }

    static insert = async (req, res) => {
        // console.log(req.files.image) // jo input ke name mai diya tha wo hai yea image

        const file = req.files.image
        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {

            folder: 'studentimage',
        })
        // console.log(imageUpload)
        // const mai jo yea (name ,email,password,confirm_password) hai wo form ke input walle hai 
        const { name, email, password, confirm_password } = req.body
        const users = await UserModel.findOne({ email: email }) // yahan 1st email hai Usermodal walla aur 2nd email hai jo uper humne store kar rakha hai uper jo input se aarha hai 

        //console.log(users);
        if (users) {
            req.flash('error', 'Email already exists ')
            res.redirect('/register')
        } else {
            if (name && email && password && confirm_password) {
                if (password == confirm_password) {
                    try {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }
                        });
                        await result.save(); // save se saara data result mai save ho jaayega . yahan se data user model par jaayega
                    //    this.SendEmail(name, email);
                        req.flash('success', 'Registration Successfully . Please Login here')
                        res.redirect('/')


                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    req.flash('error', ' Password and Confirm Password Does not Match ')
                    res.redirect('/register')
                }
            } else {
                req.flash('error', ' All Fields are required ')
                res.redirect('/register') // path is given
            }
        }


    };

    static verify_login = async (req, res) => {

        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const ismatch = await bcrypt.compare(password, user.password) // yahan user nai login page par jo password daala hai usse compare karringe bcrypt ki help se hashpassword se
                    if (ismatch) {
                        // multiple login
                        if (user.role == 'student') {
                            // generate token 
                            const token = jwt.sign({ ID: user._id }, 'shyamsharma@123#15062002');
                            //console.log(token)
                            res.cookie('token', token) // token to cookie mai store karliya
                            res.redirect('/dashboard')
                        }
                        if (user.role == 'admin') {
                            // generate token 
                            const token = jwt.sign({ ID: user._id }, 'shyamsharma@123#15062002');
                            //console.log(token)
                            res.cookie('token', token) // token to cookie mai store karliya
                            res.redirect('/admin/dashboard')
                        }

                    } else {
                        req.flash('error', ' email or password is not valid .')
                        res.redirect('/')
                    }
                } else {
                    req.flash('error', 'you are not a registered user.')
                    res.redirect('/')
                }
            } else {
                req.flash('error', ' All Fields are required ')
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }

    }

    static logout = async (req, res) => {
        try {
            res.clearCookie('token') // jisse jab logout karringe to token hat jaayega cookies se 
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }

    }

    static about = async (req, res) => {
        try {
            const { name, email, _id, image } = req.profiledata
            res.render("about", { n: name, image: image })

        } catch (error) {
            console.log(error)
        }

    }

    static contact = async (req, res) => {
        try {
            const { name, email, _id, image } = req.profiledata
            res.render("contact", { n: name, image: image })

        } catch (error) {
            console.log(error)
        }

    }

    static profile = async (req, res) => {
        try {
            const { name, email, _id, image } = req.profiledata
            res.render('profile', { n: name, image: image, e: email, message: req.flash('success'), error: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    static change_password = async (req, res) => {
        try {
            const { name, email, _id, image } = req.profiledata
            //console.log(req.body)
            const { oldpassword, newpassword, cpassword } = req.body
            if (oldpassword && newpassword && cpassword) {
                const user = await UserModel.findById(_id)
                const ismatch = await bcrypt.compare(oldpassword, user.password)
                if (!ismatch) {
                    req.flash('error', ' Old Password is incorrrect ')
                    res.redirect('/profile')
                } else {
                    if (newpassword !== cpassword) {
                        req.flash('error', ' Password and Confirm Password is not matched')
                        res.redirect('/profile')
                    } else {
                        const newHashpassword = await bcrypt.hash(newpassword, 10)
                        await UserModel.findByIdAndUpdate(_id, {
                            $set: { password: newHashpassword }
                        })

                        req.flash('message', ' Password Change Sussessfully ')
                        res.redirect('/logout')

                    }
                }
            } else {
                req.flash('error', ' All Fields are required ')
                res.redirect('/profile')
            }


        } catch (error) {
            console.log(error)
        }
    }

    static profile_update = async (req, res) => {

        try {
            // console.log(req.files.image)

            if (req.files) { // yea if condition jab challegi jab user ko image update karna hai to (input mai image aarhi hogi to if condition challegi)
                const user = await UserModel.findById(req.profiledata._id); // humne pahelle user ki id mai se data nikala 
                const image_id = user.image.public_id; // fir data mai se image ki id nikal li humne aur image_id mai store karli
                await cloudinary.uploader.destroy(image_id); // yahan wahi id wali image (purani profile image) ko delete kardiya 

                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, { // yahan new profile image ko upload kardiya 
                    folder: 'studentimage',

                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };

            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,

                }
            }
            const update_profile = await UserModel.findByIdAndUpdate(req.profiledata._id, data)
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    //    email sending code 

    // static SendEmail = async (name, email) => {

    //     //console.log("email sending")
    //     //consollog("propertyName")
    //     // console.log(email)

    //     //connenct with the smtp server   from: "test@gmail.com", // sender address
    //     try {
    //         let transporter = await nodemailer.createTransport({
    //             host: "smtp.gmail.com",
    //             port: 587,
    //             secure:false,

    //             auth: {
    //                 user: "shyamupadhya15@gmail.com",
    //                 pass: "nzmfjmjzcdvmjmik",
    //             },

    //         });
    //         let info = await transporter.sendMail({
    //             from: "shyamupadhya15@gmail.com", // sender address
    //             to: email, // list of receivers
    //             subject: "Create User Registration Succesfully", // Subject line
    //             text: "hello", // plain text body
    //             html: `Hello <b>${name} , </b><br><br>Thank you for registering on ITM University .We're excited to have you join our community of learners.<br><br>Registration is successful !! now  please login...<br><br>Once you Login , you'll be able  to  access your personalized dashboard , where you can explore and register for various courses tailored to your interests and goals.<br><br>We look forward to accompanying you on your learning journey!  :) <br><br> Best regards,<br> From ITM University Team`, // html body
    //         });
    //         console.log("Messge sent: %s", info.messageId);

    //     } catch (error) {
    //         console.log(error)
    //     }


    // };











}




// humne login to bna liya par koi user direct dashboard kaa url past karke dashboard par pahuch jaayega to essa naa ho uske liye hum login ke liye token generate karinge aur token se phir security provide karringe login ko jisse direct dashboard naa open ho .Aur yea token local store mai jaakar store hoga 
// to token generate karne ke liye humme do cheez chaiye ekk to user ki login id aur secret key . jab user login karlega tab id aur key generate hoti hai 
// aur yea jo token generate hoga yea unique hoga isse hum local storage mai bhej dinge cookies mai aur fir baad mai wahi token ko get karinge aur check karinge ki jo user login kar rha hai yea token ussi kaa hai yaa nhi agar nhi to wapis login walle page par pahucha dinge
// midleware :- abb agar koi user ki request aayi  direct yea url ki (localhost:3000/dashboard) to wo pahelle midleware ke paas jaayega aur midleware check karega ki wo user login hai yaa nhi aur login hai to token kahan hai uska aur token ko get karega aur check karega ki yea ussi ka token hai tab dashboard par pahucha dinge 
// midleware security kaa kaam karta hai request aur response ke beech mai


module.exports = FrontController



