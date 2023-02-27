require('dotenv').config()
const express = require('express');   //imported package express
const jwt = require('jsonwebtoken');  //imported package jsonwebtoken
const bcrypt = require('bcrypt');     //imported package bcrypt
const PRIVATE_KEY = process.env.PRIVATE_KEY
const router = express.Router()
const hospital = require('../../model/hospitalmodel');
const extrafunctions = require('../ExtraFunctions/ExtraFunction');
const authHospital = require('../../middleware/CheckHospital');


//Details Checking Function
// const CheckDetails = (hospitallogo, hospitalname, hospitalemailid, hospitalphoneno, state, district, pincode, address, registeredon, latestpaymenton) => {

//     if (
//         hospitallogo === null || hospitalname === null || hospitalemailid === null || hospitalphoneno === null || state === null || district === null || pincode === null || address === null || registeredon === null || latestpaymenton === null || hospitallogo === "" || hospitalname === "" || hospitalemailid === "" || hospitalphoneno === "" || state === "" || district === "" || pincode === "" || address === "" || registeredon === "" || latestpaymenton === ""
//     ) {
//         return false
//     }
//     return true
// }

// Register New Hospital API
router.post('/register', async (req, res) => {
    try {
        const CheckIfEmailExists = await hospital.findOne({ hospitalemailid: req.body.hospitalemailid })
        const CheckIfPhonenoExists = await hospital.findOne({ hospitalphoneno: req.body.hospitalphoneno })
        const CheckIfHospitalnameExists = await hospital.findOne({ hospitalname: req.body.hospitalname })
        // const passwordChecked = await extrafunctions.CheckpasswordLength(req.body.password)
        // if (passwordChecked === false) {
        //     return res.status(400).json({
        //         success: false, response: "Please Enter A Valid Password"
        //     })
        // }
        // const detailschecked = CheckDetails(req.body.hospitallogo, req.body.hospitalname, req.body.hospitalemailid, req.body.hospitalphoneno, req.body.state, req.body.district, req.body.pincode, req.body.address, req.body.registeredon, req.body.latestpaymenton)
        // if (detailschecked === false) {
        //     return res.status(400).json({
        //         success: false, response: "Please Enter All The Fields"
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
        if (CheckIfHospitalnameExists) {
            return res.status(400).json({
                success: false, response: "Hospital name  Already Exists"
            })
        }
        const saltRounds = await bcrypt.genSalt(10);
        console.log(req.body.password)
        const secpass = await bcrypt.hash(req.body.password, saltRounds)
        const CreateHospital = await hospital.create({
            hospitallogo: req.body.hospitallogo,
            hospitalname: req.body.hospitalname,
            hospitalemailid: req.body.hospitalemailid,
            hospitalphoneno: req.body.hospitalphoneno,
            password: secpass,

        })
        if (CreateHospital) {
            const jwtdata = await {
                hospital: {
                    id: CreateHospital._id
                }
            }
            const jwttoken = await jwt.sign(jwtdata, PRIVATE_KEY)

            res.status(200).json({
                success: true, response: "Hospital Registered Successfully", token: jwttoken
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})


//Hospital Login Api
router.post('/login', async (req, res) => {
    try {
        const CheckIfEmailExists = await hospital.findOne({ hospitalemailid: req.body.hospitalemailid })


        if (CheckIfEmailExists) {
            const validUser = await bcrypt.compare(
                req.body.password, CheckIfEmailExists.password
            );
            if (validUser) {
                const jwtdata = await {
                    hospital: {
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


//EDIT HOSPITAL INFORMATION API
router.put('/update', authHospital, async (req, res) => {
    // console.log(req.user.id)
    try {
        // console.log(req.body)
        // const CheckIfEmailExists = await doctor.findOne({ _id: { $not: { $eq: req.user.id } } })
        // const CheckIfPhonenoExists = await doctor.findOne({ hospitalphoneno: req.body.hospitalphoneno })
        // const CheckIfHospitalnameExists = await doctor.findOne({ hospitalname: req.body.hospitalname })
        // if (CheckIfEmailExists) {
        //     return res.status(400).json({
        //         success: false, response: "Email Already Exists"
        //     })
        // }
        // // if (CheckIfPhonenoExists) {
        // //     return res.status(400).json({
        // //         success: false, response: "Phone no  Already Exists"
        // //     })
        // // }

        const UpdateHospitalDetails = await hospital.findByIdAndUpdate(req.user.id, req.body, { returnOriginal: false })
        if (UpdateHospitalDetails) {
            res.status(200).json({
                success: true, response: UpdateHospitalDetails
            })
        } else {

            res.status(400).json({
                success: false, response: "Server Error Occured"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false, response: "Server Error Occured"
        })
    }
})


router.get('/fetchdetails', authHospital, async (req, res) => {
    try {
        const GetHospitalDetails = await hospital.findById(req.user.id)
        return res.status(200).json({ success: true, response: GetHospitalDetails })
    } catch (error) {
        return res.status(500).json({ success: true, response: "Internal Server Error Occured" })

    }
})

//PAYMENT API





module.exports = router
