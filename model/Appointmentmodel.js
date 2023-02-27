const mongoose = require('mongoose');


const AppointmentModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },

    extranote: {
        type: String,
        default: ''

    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor"
    },

    timeslot: {
        type: String,

    },
    appointmentdate: {
        type: Date,
        required: true,

    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },

    doctorname: {
        type: String,
        required: true
    }
})


const appointment = mongoose.model('appointment', AppointmentModel);
module.exports = appointment