require('dotenv').config()
// require('./db/db')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const hospital = require('./routes/Hospital/hospital')
const hospitalFordoctor = require('./routes/Hospital/hospitalFordoctor')
const appointment = require('./routes/Appointment/Appointment')
const doctor = require('./routes/doctor/doctor')


app.use(express.json())
const uri = process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(uri, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
})

app.use('/hospital', hospital)
app.use('/hospitalfordoctor', hospitalFordoctor)
app.use('/appointment', appointment)
app.use('/doctor', doctor)
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});

app.listen(PORT, () => console.log(`Example app listening on 5000`))