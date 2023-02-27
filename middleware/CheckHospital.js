// HOSPITAL MIDDLEWARE



const jwt = require("jsonwebtoken")
const PRIVATE_KEY = process.env.PRIVATE_KEY
const hospital = require('../model/hospitalmodel');



const authHospital = async (req, res, next) => {
    let success = false
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(400).json({ success: false, error: "login again" })
        }
        const data = await jwt.verify(token, PRIVATE_KEY);
        if (data === null || data === false || data === undefined) {
            return res.status(400).json({ success: false, error: "login again" })
        }
        const findhospital = await hospital.findById(data.hospital.id);
        if (findhospital === null || findhospital === false || findhospital === undefined) {
            return res.status(400).json({ success: false, error: "login again" })
        }

        success = true
        req.user = data.hospital


        next()
    } catch (error) {
        success = false
        return res.status(400).json({ success: success, err: error.message })

    }

}



module.exports = authHospital