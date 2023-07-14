// express node js ki framework hai 
const express = require('express')
const { connect } = require('mongoose')
const connectDB = require('./db/connectdb')
const app = express()
const port = 3000
const web = require('./routes/web')
const fileUpload = require('express-fileupload'); // profile img pahelle temporary file mai jaata hai phir upload walle folder mai jaati hai 
var session = require('express-session')
var flash = require('connect-flash')
const cookieParser = require('cookie-parser')
app.use(fileUpload({useTempFiles:true})); 
// To show message      
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000 },
  resave: false,
  saveUninitialized: false,

}));
app.use(flash());

// cookies
app.use(cookieParser())


// const { connect } = require('http2')
app.use(express.urlencoded({ extended:true })); // yea line hamesha iss line ( app.use('/',web) ) ke uper hee likhinge . yea line isliye likhi taaki data sahi format mai uth kar aaye json format mai ..

// connect db
connectDB()
app.set('view engine', 'ejs')
// route localhost:3000
app.use('/',web)
// static files:- css ko call karne ke liye 
app.use(express.static('public'))



// server create
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
