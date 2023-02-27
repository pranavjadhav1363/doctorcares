import React, { useState } from 'react'
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";





const AppState = (props) => {

    const navigate = useNavigate();

    const initialHospital = []
    const initialState = []
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState('');
    const [hospital, sethospital] = useState(initialHospital);
    const [doctor, setdoctor] = useState(initialState);
    const FetchHospitalDetails = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`/hospital/fetchdetails`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        const data = await response.json()
        if (data.success === true) {
            sethospital(data.response)
            setloading(false)
            console.log(data.response)
            return false
        } else if (data.success === false) {
            seterror(data.response)
            setloading(false)
            return false
        }
    }



    //APPOINTMENTS APIS  FROM LINE 18 TO LINE 58

    const updateHospitaldetails = async (
        hospitalname,
        hospitalemailid,
        hospitalphoneno
    ) => {
        const token = await localStorage.getItem("token");
        const response = await fetch(`/hospital/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify({
                hospitalname,
                hospitalemailid,
                hospitalphoneno
            }),
        });
        if (response.success == true) {
            sethospital(...hospital, {
                hospitalname,
                hospitalemailid,
                hospitalphoneno
            })
            return true
        }




    };
    const GetDoctorDetails = async (id) => {
        // console.log(query.get("doctorid"));
        const token = localStorage.getItem('token')
        const response = await fetch(
            `/appointment/getdoctorsofaparticularhospital/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":
                        token,
                },
            }
        );
        const data = await response.json();
        if (data.success === true) {
            // sethospital(data.response);
            setdoctor(data.response);
            let newdta = data.response;
            // setworkingdays({ ...workingdays });
            console.log("first");
            return true;
        } else if (data.success === false) {
            // seterror(data.response);
            return false;
        }
    };

    return (<AppContext.Provider value={{ hospital, FetchHospitalDetails, updateHospitaldetails, doctor, GetDoctorDetails }}>
        {props.children}
    </AppContext.Provider>)
}

export default AppState
