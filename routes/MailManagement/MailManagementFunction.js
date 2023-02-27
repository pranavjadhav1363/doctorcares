

const nodemailer = require('nodemailer')

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

const SendAppointmentRegisteredMailToPatient = async (Patientmail, doctorname, date, time, id) => {
    console.log(EMAIL, PASSWORD)
    try {


        const datee = new Date(date)

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: false,
            secure: true,
            service: 'gmail',
            auth: {
                user: EMAIL, // TODO: your gmail account
                pass: PASSWORD // TODO: your gmail password
            }
        });
        console.log("step 1 cleaRED")

        // Step 2
        let mailOptions = {
            from: EMAIL, // TODO: email sender
            to: Patientmail, // TODO: email receiver
            subject: 'Doctor Care Appointmnet Booked Successfully',
            html: `<p>Your Appointmet has been book on ${date} with timeslot ${time} for Doctor ${doctorname}.Please Confirm Your Appointment Id at Reception.Your Appointment Id is ${id} </p>`
        };
        console.log("sECONF step cleared")

        // Step 3
        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                console.log(err)
                // return res.json({ err: err });
            }
            console.log("mail send to " + Patientmail)
            // return res.json('Email sent!!!');

        });



    } catch (error) {
        console.log(error)
        // return res.json({ success: false, response: "Internal Server Error" })

    }


}
const SendAppointmentRegisteredMailToDoctor = async (Doctormail, name, date, time) => {
    console.log(EMAIL, PASSWORD)
    try {

        const datee = new Date(date)
        console.log(Doctormail, name, date, time)
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
                user: EMAIL, // TODO: your gmail account
                pass: PASSWORD // TODO: your gmail password
            }
        });
        console.log("step 1 cleaRED")

        // Step 2
        let mailOptions = {
            from: EMAIL, // TODO: email sender
            to: Doctormail, // TODO: email receiver
            subject: 'You Have a New Appointment',
            html: `<p>You have A new appointment from a Patient.Patient Name is ${name} Appointment Date is ${datee} and Timeslot is ${time} </p>`
        };
        console.log("sECONF step cleared")

        // Step 3
        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                console.log(err)
                // return res.json({ err: err });
            }
            console.log("mail send to " + Doctormail)
            // return res.json('Email sent!!!');

        });



    } catch (error) {
        console.log(error)
        // return res.json({ success: false, response: "Internal Server Error" })

    }


}
const SendAppointmentConfirmMailToPatient = async (patientmail) => {
    console.log(EMAIL, PASSWORD)
    try {



        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            ignoreTLS: false,
            secure: false,
            service: 'gmail',
            auth: {
                user: EMAIL, // TODO: your gmail account
                pass: PASSWORD // TODO: your gmail password
            }
        });
        console.log("step 1 cleaRED")

        // Step 2
        let mailOptions = {
            from: EMAIL, // TODO: email sender
            to: patientmail, // TODO: email receiver
            subject: 'Your appointment has been approved ',
            html: `<p>Your Appointment has been approved at date 15 jan with time 11.15 am
            Please pay to confirm this timeslot</p>`
        };
        console.log("sECONF step cleared")

        // Step 3
        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                console.log(err)
                // return res.json({ err: err });
            }
            console.log("mail send to " + patientmail)
            // return res.json('Email sent!!!');

        });



    } catch (error) {
        console.log(error)
        // return res.json({ success: false, response: "Internal Server Error" })

    }


}
const SendAppointmentConfirmedMailToPatient = async (patientmail) => {
    console.log(EMAIL, PASSWORD)
    try {



        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            ignoreTLS: false,
            secure: false,
            service: 'gmail',
            auth: {
                user: EMAIL, // TODO: your gmail account
                pass: PASSWORD // TODO: your gmail password
            }
        });
        console.log("step 1 cleaRED")

        // Step 2
        let mailOptions = {
            from: EMAIL, // TODO: email sender
            to: patientmail, // TODO: email receiver
            subject: 'Payment is approved',
            html: `<p>you can vist the opd at 15 jan 11.15am</p>`
        };
        console.log("sECONF step cleared")

        // Step 3
        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                console.log(err)
                // return res.json({ err: err });
            }
            console.log("mail send to " + patientmail)
            // return res.json('Email sent!!!');

        });



    } catch (error) {
        console.log(error)
        // return res.json({ success: false, response: "Internal Server Error" })

    }


}
const SendAppointmentConfirmedMailToDoctor = async (doctormail) => {
    console.log(EMAIL, PASSWORD)
    try {



        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            ignoreTLS: false,
            secure: false,
            service: 'gmail',
            auth: {
                user: EMAIL, // TODO: your gmail account
                pass: PASSWORD // TODO: your gmail password
            }
        });
        console.log("step 1 cleaRED")

        // Step 2
        let mailOptions = {
            from: EMAIL, // TODO: email sender
            to: doctormail, // TODO: email receiver
            subject: 'Payment done',
            html: `<p>Patient with details has paid the fees and will arrive at 15 jan 11.15am</p>`
        };
        console.log("sECONF step cleared")

        // Step 3
        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                console.log(err)
                // return res.json({ err: err });
            }
            console.log("mail send to " + doctormail)
            // return res.json('Email sent!!!');

        });



    } catch (error) {
        console.log(error)
        // return res.json({ success: false, response: "Internal Server Error" })

    }


}

module.exports = { SendAppointmentConfirmedMailToDoctor, SendAppointmentConfirmedMailToPatient, SendAppointmentConfirmMailToPatient, SendAppointmentRegisteredMailToDoctor, SendAppointmentRegisteredMailToPatient }