const CourseModel = require('../../modals/Course')

class AdminController{
     
    static dashboard = async(req,res)=>{
       try {
        const {name,email,_id,image} = req.profiledata // yea isliye jisse navbar mai user ka name aur image show karna ke liye 
        const course = await CourseModel.find()
        //console.log(course)
        res.render('admin/dashboard',{n:name,image:image,c:course,message:req.flash('success')})
       } catch (error) {
        console.log(error)
       }
    }

    static admin_view = async (req, res) => { // isse data ko vs code mai display karrlinge humne
        try {
            // id ko get karne ke liye params kaa use karte hai 
            //console.log(req.params.id) 
            const {name,email,_id,image} = req.profiledata // // yea (n:name,image:image) isliye kiya jisse ki navbar mai side mai user jisne login kiya hai uska name aur image show hogi 
            const data = await CourseModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/view', { d: data , n:name,image:image}) // yahan humne data ko d mai store karliya aur render ki help se display walle page par bhej diya 

        } catch (error) {
            console.log(error)
        }
    }

    static admin_edit = async (req, res) => {
        try {
            const {name,email,_id,image} = req.profiledata // // yea (n:name,image:image) isliye kiya jisse ki navbar mai side mai user jisne login kiya hai uska name aur image show hogi 
            //console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/edit', { d: data , n:name,image:image })

        } catch (error) {
            console.log(error)
        }
    }

    static admin_update = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.id)
            const update = await CourseModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,// yahan 1st walla name jo hai wo model ke under hai wo walla hai aur doosera name jo hai (req.body.name walla)wo form ke under input mai jo name hai wo walla hai 
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                gender: req.body.gender,
                qualification: req.body.qualification,
                course: req.body.course
            })
            req.flash('success','Updated Successfully  :) ')
            res.redirect('/admin/dashboard')

        } catch (error) {
            console.log(error)
        }
    }

    static admin_delete = async (req, res) => {
        try {
              // console.log(req.body)
              //console.log(req.params.id)
            const update = await CourseModel.findByIdAndDelete(req.params.id)
            req.flash('success',' Delete Successfully  :)')
            res.redirect('/admin/dashboard') 


        } catch (error) {
            console.log(error)
        }
    }

  
    static update_approve = async(req,res)=>{
        try {
        // console.log(req.body)
        const result = await CourseModel.findByIdAndUpdate(req.params.id,{
            comment:req.body.comment,
            status:req.body.status,

        })
        res.redirect('/admin/dashboard')
        } catch (error) {
         console.log(error)
        }
     }

     





}

module.exports = AdminController