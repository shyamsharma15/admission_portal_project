const CourseModal = require('../modals/Course')



class CourseController {

    static course_insert = async (req, res) => {
        const { name, email, course} = req.body // yea extra hai 
        try {
            //  console.log(req.body)
            const result = new CourseModal({
                name: req.body.name,// yahan 1st walla name jo hai wo model ke under hai wo walla hai aur doosera name jo hai (req.body.name walla)wo form ke under input mai jo name hai wo walla hai 
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                gender: req.body.gender,
                qualification: req.body.qualification,
                course: req.body.course,
                profiledata_id:req.profiledata.id,

            })
            await result.save()
            req.flash('success',' Course Registration Successfully  :)')
            res.redirect('/course_display')
        }
        catch (error) {
            console.log(error)
        }
    }

    static Course_display = async (req, res) => { // isse data ko vs code mai display karrlinge humne
        try {
            const {name,email,_id,image} = req.profiledata // yea isliye jisse navbar mai user ka name aur image show karna ke liye 
            const data = await CourseModal.find({profiledata_id:req.profiledata._id}) // isse yea hoga kii jo student registration kar rha hai sirf ussi kaa data usko display walle page par show hoga aur kissi student kaa show nhi hoga 
           
            
            // console.log(data);
            res.render('courses/display', { d: data, message:req.flash('success'),n:name,image:image}) // yahan humne data ko d mai store karliya aur render ki help de display walle page par bhej diya 

        } catch (error) {
            console.log(error)
        }
    }
    //  hum course view isliye bna rhae hai taaki view button par click karke student jisne register kiya hai uski poori information check kar saken
    static Course_view = async (req, res) => { // isse data ko vs code mai display karrlinge humne
        try {
            // id ko get karne ke liye params kaa use karte hai 
            //console.log(req.params.id) 
            const {name,email,_id,image} = req.profiledata // // yea (n:name,image:image) isliye kiya jisse ki navbar mai side mai user jisne login kiya hai uska name aur image show hogi 
            const data = await CourseModal.findById(req.params.id)
            // console.log(data);
            res.render('courses/view', { d: data , n:name,image:image}) // yahan humne data ko d mai store karliya aur render ki help se display walle page par bhej diya 

        } catch (error) {
            console.log(error)
        }
    }

    static Course_edit = async (req, res) => {
        try {
            const {name,email,_id,image} = req.profiledata // // yea (n:name,image:image) isliye kiya jisse ki navbar mai side mai user jisne login kiya hai uska name aur image show hogi 
            //console.log(req.params.id)
            const data = await CourseModal.findById(req.params.id)
            //console.log(data);
            res.render('courses/edit', { d: data , n:name,image:image })

        } catch (error) {
            console.log(error)
        }
    }
    
    //   jo courses modals hai btech,bca,mca hai unko edit karne ke liye 
    static Course_update = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.id)
            const update = await CourseModal.findByIdAndUpdate(req.params.id, {
                name: req.body.name,// yahan 1st walla name jo hai wo model ke under hai wo walla hai aur doosera name jo hai (req.body.name walla)wo form ke under input mai jo name hai wo walla hai 
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                gender: req.body.gender,
                qualification: req.body.qualification,
                course: req.body.course
            })
            req.flash('success','Updated Successfully  :) ')
            res.redirect('/course_display')

        } catch (error) {
            console.log(error)
        }
    }

    static Course_delete = async (req, res) => {
        try {
           // console.log(req.body)
          // console.log(req.params.id)
            const update = await CourseModal.findByIdAndDelete(req.params.id)
            req.flash('success',' Delete Successfully  :)')
            res.redirect('/course_display') 

        } catch (error) {
            console.log(error)
        }
    }




}


module.exports = CourseController


