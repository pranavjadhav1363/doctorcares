require('dotenv').config()
const express = require('express');   //imported package express
const jwt = require('jsonwebtoken');  //imported package jsonwebtoken
const bcrypt = require('bcrypt');     //imported package bcrypt
const PRIVATE_KEY = process.env.PRIVATE_KEY
const router = express.Router()
const doctor = require('../../model/doctorinfo');
const authDoctor = require('../../middleware/CheckDoctor');
const extrafunctions = require("../ExtraFunctions/ExtraFunction")
const authHospital = require('../../middleware/CheckHospital');
const appointment = require('../../model/Appointmentmodel');


// const CheckDetails = (name,  phoneno, emailid,  workingdays, time, telephoneno) => {

//     if (
//         name === null || image === null || phoneno === null || emailid === null || degree === null || password === null || experience === null || specialization === null || workingdays === null || time === null || telephoneno === null || name === "" || image === "" || phoneno === "" || emailid === "" || degree === "" || password === "" || experience === "" || specialization === "" || workingdays === "" || time === "" || telephoneno === ""

//     ) {
//         return false
//     }
//     return true
// }


//Add Doctor
router.post('/adddoctor', authHospital, async (req, res) => {

    try {
        const CheckIfEmailExists = await doctor.findOne({ emailid: req.body.emailid })
        const CheckIfPhonenoExists = await doctor.findOne({ phoneno: req.body.phoneno })
        // const detailschecked = CheckDetails(req.body.name, req.body.image, req.body.phoneno, req.body.emailid, req.body.password, req.body.degree, req.body.experience, req.body.specialization, req.body.workingdays, req.body.time, req.body.telephoneno)
        // const passwordChecked = extrafunctions.CheckpasswordLength(req.body.password)
        // if (detailschecked === false) {
        //     return res.status(400).json({
        //         success: false, response: "Please Enter All The Fields"
        //     })
        // }
        // if (passwordChecked === false) {
        //     return res.status(400).json({
        //         success: false, response: "Please Enter A Valid Password"
        //     })
        // }
        if (CheckIfEmailExists) {
            return res.status(400).json({
                success: false, response: "Email Already Exists"
            })
        }
        if (CheckIfPhonenoExists) {
            return res.status(400).json({
                success: false, response: "Phone no  Already Exists"
            })
        }



        //Creation/Registration of a New Doctor
        const CreateDoctor = await doctor.create({
            name: req.body.name,
            phoneno: req.body.phoneno,
            emailid: req.body.emailid,
            workingdays: req.body.workingdays,
            hospital: req.user.id,
            span: req.body.span,
            WorkingHourFrom: req.body.WorkingHourFrom,
            WorkingHourTo: req.body.WorkingHourTo
        })
        if (CreateDoctor) {

            res.status(200).json({
                success: true, response: "Doctor Created Successfully",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})

//Edit Doctor
router.put('/update/:id', authHospital, async (req, res) => {
    try {
        const CheckIfEmailExists = await doctor.findOne({ emailid: req.body.emailid })

        // if (CheckIfEmailExists) {
        //     return res.status(400).json({
        //         success: false, response: "Email Already Exists"
        //     })
        // }
        // if (CheckIfPhonenoExists) {
        //     return res.status(400).json({
        //         success: false, response: "Phone no  Already Exists"
        //     })
        // }

        const UpdateDoctorDetails = await doctor.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' }).select({ password: 0 })
        if (UpdateDoctorDetails) {
            res.status(200).json({
                success: true, response: UpdateDoctorDetails
            })
        } else {
            res.status(400).json({
                success: false, response: "Server Error Occured"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})

//Delete A Doctor
router.delete('/deletedoctor/:id', authHospital, async (req, res) => {
    try {
        const DeleteADoctor = await doctor.findByIdAndDelete(req.params.id);
        if (DeleteADoctor) {
            res.status(200).json({
                success: true, response: "Doctor Deleted Successfully"
            })
        } else {
            res.status(400).json({
                success: false, response: "Server Error Occured"
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }

})

//Fetch Doctors 
router.get('/getdoctorsofhospital', authHospital, async (req, res) => {
    try {
        const doctors = await doctor.find({ hospital: req.user.id }, { password: 0 })
        if (doctors) {
            res.status(200).json({
                success: true, response: doctors
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})


//Fetch appointment of a particular Doctors
router.get('/fetchappointmentsofadoctor/:id', authHospital, async (req, res) => {

    try {
        const fetchappointmentsofaDoctor = await appointment.find({ doctor: req.params.id });

        res.status(200).json({
            success: true, response: fetchappointmentsofaDoctor
        })

    } catch (error) {
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }

})



router.get('/getappointments', authHospital, async (req, res) => {
    try {
        const GetAllAppointments = await appointment.find({ hospital: req.user.id })
        res.status(200).json({
            success: true, response: GetAllAppointments
        })
    } catch (error) {
        res.status(500).json({
            success: false, response: "Server Error Occured"
        })
    }
})




module.exports = router
