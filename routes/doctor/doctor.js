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


router.post('/login', async (req, res) => {
    try {
        const CheckIfEmailExists = await doctor.findOne({ hospitalemailid: req.body.hospitalemailid })


        if (CheckIfEmailExists) {
            const validUser = await bcrypt.compare(
                req.body.password, CheckIfEmailExists.password
            );
            if (validUser) {
                const jwtdata = await {
                    doctor: {
                        id: CheckIfEmailExists._id
                    }
                }
                const jwttoken = await jwt.sign(jwtdata, PRIVATE_KEY)
                res.status(200).json({
                    success: true, response: "Login Successful", token: jwttoken
                })
            }
            else {
                res.status(400).json({
                    success: false, response: "Invalid Login Credentials"
                })
            }
        } else {
            res.status(400).json({
                success: false, response: "Invalid Login Credentials"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }


})

router.get('/fetchappointments', authDoctor, async (req, res) => {
    console.log(req.user.id)
    try {
        const fetchappointmentsofadoctor = await appointment.find({ doctor: req.user.id })
        return res.status(200).json({ success: true, response: fetchappointmentsofadoctor })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})
router.put('/confirmtimeslot/:id', authDoctor, async (req, res) => {
    try {
        const selectdateandtimeslot = await appointment.findByIdAndUpdate(req.params.id, { appointmentdate: req.body.appointmentdate, timeslot: req.body.timeslot, status: "confirmed" })
        const GetMailOfThePatient = await appointment.findById(req.params.id, { emailid: 1 })
        if (selectdateandtimeslot) {
            importmailfunctions.SendAppointmentConfirmMailToPatient(GetMailOfThePatient.emailid)
            return res.status(200).json({ success: true, response: "Appointment Confirmed Successfully" })

        }
    } catch (error) {
        return res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})

module.exports = router