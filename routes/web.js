const express = require('express')
const FrontController = require('../controllers/FrontController')
const CourseController = require('../controllers/CourseController')
const router = express.Router()
const checkuserauth = require('../midleware/auth') 
const islogin = require('../midleware/islogin')
const AdminController = require('../controllers/admin/AdminController')

//route : path btana

// FrontController
router.get("/",islogin,FrontController.login)
router.get("/about",checkuserauth,FrontController.about)
router.get("/contact",checkuserauth,FrontController.contact)
router.get("/register",FrontController.register)
router.post('/insert',FrontController.insert)
router.get("/dashboard", checkuserauth ,FrontController.dashboard)
router.post('/verify_login',FrontController.verify_login)
router.get('/logout',FrontController.logout)
router.get('/profile',checkuserauth,FrontController.profile)
router.post('/change_password',checkuserauth,FrontController.change_password)
router.post('/profile_update',checkuserauth,FrontController.profile_update)


// CourseControler
router.post('/course_insert',checkuserauth,CourseController.course_insert)
router.get('/course_display',checkuserauth,CourseController.Course_display)
router.get('/course_view/:id',checkuserauth,CourseController.Course_view)
router.get('/course_view/:id',checkuserauth,CourseController.Course_view)
router.get('/course_view/:id',checkuserauth,CourseController.Course_view)
router.get('/course_edit/:id',checkuserauth,CourseController.Course_edit)
router.post('/course_update/:id',checkuserauth,CourseController.Course_update)
router.get('/course_delete/:id',checkuserauth,CourseController.Course_delete)

// AdminController
router.get('/admin/dashboard',checkuserauth,AdminController.dashboard)
router.get('/admin_view/:id',checkuserauth,AdminController.admin_view)
router.get('/admin_edit/:id',checkuserauth,AdminController.admin_edit)
router.post('/admin_update/:id',checkuserauth,AdminController.admin_update)
router.get('/admin_delete/:id',checkuserauth,AdminController.admin_delete)
router.post('/update_approve/:id',checkuserauth,AdminController.update_approve)





module.exports = router 
