const mongoose = require('mongoose');


const HospitalModel = mongoose.Schema({

    hospitallogo: {
        type: String,
        required: true,
    },
    hospitalname: {
        type: String,
        required: true,
        unique: true
    },
    hospitalemailid: {
        type: String,
        required: true,
        unique: true
    },
    hospitalphoneno: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // state: {
    //     type: String,
    //     required: true
    // },
    // district: {
    //     type: String,
    //     required: true
    // },
    // pincode: {
    //     type: Number,
    //     required: true
    // },
    // address: {
    //     type: String,
    //     required: true
    // },
    // registeredon: {
    //     type: String,
    //     required: true
    // },
    // latestpaymenton: {
    //     type: String,
    //     required: true
    // },
    // rating: {
    //     type: Number,
    //     default: 0
    // },
    // departments: {
    //     type: mongoose.Schema.Types.Mixed,
    //     required: true,
    // }
    //hospitalLiscnce
})




const hospital = mongoose.model('hospital', HospitalModel);
module.exports = hospital