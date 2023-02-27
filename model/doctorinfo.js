const mongoose = require('mongoose');


const doctormodel = mongoose.Schema({
    // image: {
    //     type: String,
    //     required: true,
    // },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"

    },
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        unique: true,
        required: true,
    },
    emailid: {
        type: String,
        unique: true,
        required: true,
    },
   
    workingdays: {
        type: Object,
        required: true,
    },

    span: {
        type: Number,
        required: true

    },
    WorkingHourFrom: {
        type: String,
        required: true
    },
    WorkingHourTo: {
        type: String,
        required: true
    },

})



const doctor = mongoose.model('doctor', doctormodel);
module.exports = doctor



 // password: {
    //     type: String,
    //     required: true
    // },
    // degree: {
    //     type: String,
    //     required: true
    // },
    // experience: {
    //     type: Number,
    //     required: true,

    // },
    // specialization: {
    //     type: String,
    //     required: true,
    // },
    // rating: {
    //     type: Number,
    //     default: 0,
    // },


    
    // fee: {
    //     type: Number,
    //     required: true
    // },