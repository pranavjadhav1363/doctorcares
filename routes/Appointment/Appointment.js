require('dotenv').config()
const tc = require("time-slots-generator");
const _12FromTo24Hours = require("12fromto24hours");

const express = require('express');   //imported package express
const jwt = require('jsonwebtoken');  //imported package jsonwebtoken
const bcrypt = require('bcrypt');
const doctor = require('../../model/doctorinfo');

const appointment = require('../../model/Appointmentmodel');
const SendAppointmentRegisteredMailToPatient = require('../MailManagement/MailManagementFunction');
const importmailfunctions = require('../MailManagement/MailManagementFunction');
const SendAppointmentConfirmedMailToPatient = require('../MailManagement/MailManagementFunction');
const SendAppointmentConfirmedMailToDoctor = require('../MailManagement/MailManagementFunction');
const ExtraFunction = require('../ExtraFunctions/ExtraFunction')
const authDoctor = require('../../middleware/CheckDoctor');
const hospital = require('../../model/hospitalmodel');
const authHospital = require('../../middleware/CheckHospital');
const router = express.Router()
const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

console.log(convertTime12to24('01:02:00 PM'));
console.log(convertTime12to24('05:06 PM'));
console.log(convertTime12to24('12:00 PM'));
console.log(convertTime12to24('12:00 AM'));

router.post('/createappointment', authHospital, async (req, res) => {
    const getdoctorname = await doctor.findById(req.body.doctor)
    const body = req.body
    for (const key in body) {
        if (key === 'extranote') {
            continue
        }
        if (body[key] === null || body[key] === undefined || body[key] === '') {
            return res.status(409).json({ success: false, response: `${key} is Empty` })

        }
    }

    try {
        const getdoctoremailid = await doctor.findById(req.body.doctor)
        const CreateAppointmnet = await appointment.create({
            name: req.body.name,
            phoneno: req.body.phoneno,
            age: req.body.age,
            emailid: req.body.emailid,
            gender: req.body.gender,
            doctorname: req.body.doctorname,
            extranote: req.body.extranote,
            doctor: req.body.doctor,
            hospital: req.user.id,
            appointmentdate: req.body.appointmentdate,
            timeslot: req.body.timeslot,
        })
        if (CreateAppointmnet) {
            // console.log(first)
            const doctoremail = await doctor.findById(req.body.doctor, { emailid: 1 })
            importmailfunctions.SendAppointmentRegisteredMailToDoctor(doctoremail.emailid, CreateAppointmnet.name, CreateAppointmnet.appointmentdate, CreateAppointmnet.timeslot)
            importmailfunctions.SendAppointmentRegisteredMailToPatient(CreateAppointmnet.emailid, CreateAppointmnet.doctorname, CreateAppointmnet.appointmentdate, CreateAppointmnet.timeslot, CreateAppointmnet._id)
            // console.log(doctoremail.emailid)
            return res.status(200).json({ success: true, response: "Appointment Booked Successfully" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})



//Fetch Hospitals
router.get('/fetchhospitals', async (req, res) => {
    try {
        const getAllhospitals = await hospital.find();


        return res.status(200).json({ success: true, response: getAllhospitals })

    } catch (error) {
        return res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})



//Fetch Docors of a hospital

router.get('/getdoctorsofaparticularhospital/:id', authHospital, async (req, res) => {
    try {
        const getdoctors = await doctor.findById(req.params.id)
        return res.status(200).json({ success: true, response: getdoctors })


    } catch (error) {
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})


router.post('/fetchappointmentstime/:id', async (req, res) => {
    // date span from to 

    // 1.database madbna je already book ahettana kadnar
    //2.fetch working time of doctor
    try {
        // const
        // ExtraFunction.CreateTimeSlot()

        let datee = new Date(req.body.appointmentdate)
        console.log(1)
        const AlreadybookedTimeSlot = await appointment.find({ $and: [{ appointmentdate: datee }, { doctor: req.params.id }] }).select({ _id: 0, timeslot: 1 })
        console.log(2)
        const FindDoctorhours = await doctor.findById(req.params.id).select({ span: 1, _id: 0, WorkingHourFrom: 1, WorkingHourTo: 1 })
        console.log(3)
        let starttime = FindDoctorhours.WorkingHourFrom
        let endtime = FindDoctorhours.WorkingHourTo
        console.log(endtime)
        starttime = convertTime12to24(starttime) + ':00'
        endtime = convertTime12to24(endtime) + ':00'
        console.log(4)
        console.log(starttime)
        console.log(endtime)
        // starttime = starttime.slice(0, -3)
        // console.log(starttime)
        // const endtime = FindDoctorhours.WorkingHourTo + ':00'
        console.log(starttime)
        console.log(endtime)
        const span = FindDoctorhours.span
        console.log(span)
        const timeslotcreated = ExtraFunction.CreateTimeSlot(starttime, endtime, span)
        console.log(5)
        console.log(timeslotcreated)
        let timeslots = [];
        let NewAlreadybookedTimeSlot = []
        for (let i = 0; i < AlreadybookedTimeSlot.length; i++) {
            console.log(5)
            NewAlreadybookedTimeSlot.push(AlreadybookedTimeSlot[i].timeslot)

        }
        NewAlreadybookedTimeSlot = new Set(NewAlreadybookedTimeSlot)
        if (AlreadybookedTimeSlot.length > 0) {
            console.log(6)
            timeslots = timeslotcreated.filter(x => !NewAlreadybookedTimeSlot.has(x))
            // console.log(first)
            console.log("hii", timeslots)
        } else {

            timeslots = timeslotcreated
        }


        return res.json({ success: true, response: timeslots })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})

router.get('/getappointment/:id', authHospital, async (req, res) => {
    try {
        const GetAppointmentDetails = await appointment.findById(req.params.id)
        return res.status(200).json({ success: true, response: GetAppointmentDetails })
    } catch (error) {
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})

router.put('/updatepaymentstatus/:id', async (req, res) => {
    try {
        const UpdatePaymentStatus = await appointment.findByIdAndUpdate(req.params.id, { status: req.body.status })
        if (UpdatePaymentStatus) {
            return res.status(200).json({ success: true, response: "Updated Successfully" })

        }
    } catch (error) {
        res.status(500).json({
            success: false, response: "Server Error Occured"
        })
    }
})

module.exports = router

