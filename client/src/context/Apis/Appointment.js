import { useContext } from "react";
import AppContext from "../AppContext";

const context = useContext(AppContext);
const { seterror, setloading } = context

const BookAppointment = async (name,
    phoneno,
    age,
    emailid,
    gender,
    symptoms,
    extranote,
    doctor,
    department, appointmentenquiryon) => {
    setloading(true)
    const response = await fetch('/appointment/createappointment', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            phoneno,
            age,
            emailid,
            gender,
            symptoms,
            extranote,
            doctor,
            department,
            appointmentenquiryon
        })
    })
    const data = await response.json();
    if (data.success) {
        setloading(false)
        return true;
    } else if (!data.success) {
        setloading(false)
        seterror(data.response)
        return false;
    }
}


module.exports = { BookAppointment }