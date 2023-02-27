const jwt = require("jsonwebtoken")
const PRIVATE_KEY = process.env.PRIVATE_KEY


const authDoctor = async (req, res, next) => {
    let success = false
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(400).json({ success: success, error: "login again" })

        }
        const data = await jwt.verify(token, PRIVATE_KEY);
        if (data === null || data === false || data === undefined) {
            return res.status(400).json({ success: success, error: "login again" })


        }
        success = true
        req.user = data.doctor


        next()
    } catch (error) {
        success = false
        return res.status(400).json({ success: success, err: error.message })

    }

}



module.exports = authDoctor