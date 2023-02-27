const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/doctorappointment', () => {
    console.log("database connected successfully")
})