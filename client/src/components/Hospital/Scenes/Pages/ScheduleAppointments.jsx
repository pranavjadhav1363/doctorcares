import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import statedistrict from "../../../../data/statedistrict.json";

import { Header } from "../../global/Header";
import * as EmailValidator from "email-validator";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { MenuItem } from "react-pro-sidebar";
import {
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect } from "react";
const ScheduleAppointments = () => {
  const [value, setValue] = useState(dayjs().format("MM/dd/YYYY"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const states = statedistrict.states;
  const [open, setopen] = useState(false);
  const [severity, setseverity] = useState("success");
  const [message, setmessage] = useState("");
  const colors = tokens(theme.palette.mode);
  const [updating, setupdating] = useState(false);
  const [name, setname] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [age, setage] = useState("");
  const [emailid, setemailid] = useState("");
  const [doctor, setdoctor] = useState("");
  const [isdoctorerror, setisdoctorerror] = useState(false);
  const [gender, setgender] = useState("");
  const [extranote, setextranote] = useState("");
  const [symptoms, setsymptoms] = useState([]);
  const [appointmentdate, setappointmentdate] = useState("");
  const [timeslot, settimeslot] = useState("");
  const [isnameError, setisnameError] = useState(false);
  const [isphonenoError, setisphonenoError] = useState(false);
  const [isageError, setisageError] = useState(false);
  const [isemailidError, setisemailidError] = useState(false);
  const [isgenderError, setisgenderError] = useState(false);
  const [isextranoteError, setisextranoteError] = useState("");
  const [issymptomsError, setissymptomsError] = useState([]);
  const [isappointmentdateError, setisappointmentdateError] = useState(false);
  const [istimeslotError, setistimeslotError] = useState(false);
  const [appointmentenquiryon, setappointmentenquiryon] = useState(new Date());
  const [selectDate, setselectDate] = useState(false);
  const [doctors, setdoctors] = useState("");
  const [timeSlots, settimeSlots] = useState([]);
  const [selectTimeslot, setselectTimeslot] = useState(false);

  const handleClose = () => {
    setopen(false);
  };
  const CheckName = (e) => {
    const { value } = e.target;
    setname(value);
    if (value.length < 1) {
      setisnameError(true);
      return false;
    }
    setisnameError(false);
    return true;
  };
  const CheckEmailid = (e) => {
    const { value } = e.target;
    setemailid(value);
    if (EmailValidator.validate(value) === false) {
      setisemailidError(true);
      return false;
    }
    setisemailidError(false);
    return true;
  };
  const CheckContactNumber = (e) => {
    const { value } = e.target;
    setphoneno(value);
    if (value.length !== 10) {
      setisphonenoError(true);
      return false;
    }
    setisphonenoError(false);
    return true;
  };
  const CheckGender = (e) => {
    const { value } = e.target;
    setgender(value);
    if (value.length !== 10) {
      setisgenderError(true);
      return false;
    }
    setisgenderError(false);
    return true;
  };
  const CheckTime = (e) => {
    const { value } = e.target;
    settimeslot(value);
    if (value.length !== 10) {
      setistimeslotError(true);
      return false;
    }
    setistimeslotError(false);
    return true;
  };
  const checkextranote = (e) => {
    const { value } = e.target;
    setextranote(value);
  };
  const Checkage = (e) => {
    const { value } = e.target;
    setage(value);
    if (value.length < 1) {
      setisageError(true);
      return false;
    }
    setisageError(false);
    return true;
  };
  const CheckDate = (Value) => {
    setselectTimeslot(false);

    // const { value } = e.target;
    setappointmentdate(Value);
    if (Value.length < 1) {
      setisappointmentdateError(true);
      return false;
    }
    setisappointmentdateError(false);
    return true;
  };
  const getdoctors = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/hospitalFordoctor/getdoctorsofhospital`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const data = await response.json();
    if (data.success === true) {
      setdoctors(data.response);
      console.log(data.response);
    } else if (data.success === false) {
      // seterror(data.response);
      // setloading(false);
      return false;
    }
  };
  useEffect(() => {
    let getdoctor = getdoctors();
    console.log(doctors);
  }, []);
  const BookAppointment = async () => {
    console.log(timeSlots);
    console.log(symptoms);
    if (name.length < 1) {
      setisnameError(true);
      return false;
    } else if (phoneno.length < 1) {
      setisphonenoError(true);
      return false;
    } else if (emailid.length < 1) {
      setisemailidError(true);
      return false;
    } else if (age.length < 1) {
      setisageError(true);
      return false;
    } else if (doctor.length < 1) {
      setisdoctorerror(true);
      return false;
    } else if (appointmentdate.length < 1) {
      setisappointmentdateError(true);
      return false;
    }
    console.log(doctor.name);
    const token = localStorage.getItem("token");
    const response = await fetch(`/appointment/createappointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        name,
        emailid,
        phoneno,
        age,
        doctorname: doctor.name,
        gender,
        extranote: extranote,
        appointmentdate,
        timeslot,
        doctor: doctor._id,
      }),
    });

    const data = await response.json();
    if (data.success === true) {
      console.log(data);
      setmessage(data.response);
      setseverity("success");
      setopen(true);
      setname("");
      setphoneno("");
      setemailid("");
      setage("");
      setgender("");
      setselectDate(false);
      setselectTimeslot(false);
      setextranote("");
      return true;
    } else if (data.success === false) {
      setmessage(data.response);
      setseverity("error");
      setopen(true);
      return false;
    }
  };
  const hadleselectdate = () => {
    if (doctor) {
      setselectDate(true);
      console.log("added");
    } else {
      setisdoctorerror(true);
    }
  };
  const handleselecttimeslot = async () => {
    console.log(appointmentdate);
    if (appointmentdate) {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/appointment/fetchappointmentstime/${doctor._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ appointmentdate }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        // setdoctors(data.response);
        settimeSlots(data.response);
      } else if (data.success === false) {
        setmessage(data.response);
        setseverity("error");
        setopen(true);

        return false;
      }

      setselectTimeslot(true);
      console.log("first");
    } else {
      setisappointmentdateError(true);
      console.log("second");
    }
  };
  return (
    <Box m={"20px"}>
      <Header
        title={"Schedule Appointments"}
        subtitle={"Schedule Appointments Manually"}
      />
      <Box mt={"15px"}>
        <TextField
          value={name}
          disabled={updating}
          error={isnameError}
          required
          label="PATIENT NAME"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isnameError ? "Enter Proper Name" : null}
          variant="filled"
          onChange={CheckName}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <TextField
          value={phoneno}
          error={isphonenoError}
          disabled={updating}
          required
          label="PATIENT CONTACT NUMBER"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          type={"number"}
          helperText={isphonenoError ? "Enter Valid Contact Number" : null}
          variant="filled"
          onChange={CheckContactNumber}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <TextField
          value={emailid}
          disabled={updating}
          error={isemailidError}
          required
          label="PATIENT EMAILID"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isemailidError ? "Enter Valid Email Id" : null}
          variant="filled"
          onChange={CheckEmailid}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
      </Box>
      <Box mt={"15px"} display="flex">
        <TextField
          value={age}
          disabled={updating}
          error={isageError}
          required
          label="PATIENT AGE"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isageError ? "Enter Proper Age" : null}
          variant="filled"
          type={"number"}
          onChange={Checkage}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <Autocomplete
          onChange={(e, v) => {
            setisdoctorerror(false);
            console.log(v);
            setdoctor(v);
            doctors.map((doctor) => {
              if (doctor._id === v._id) {
                setselectDate(true);
                setselectTimeslot(false);
              } else {
                setselectDate(false);
                setselectTimeslot(false);
              }
            });
            console.log(doctor);
          }}
          // disabled={!isEditable}
          sx={{ width: "30%", marginRight: "3.3%" }}
          options={doctors}
          getOptionLabel={(option) => option.name}
          id="disable-clearable"
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              id=""
              error={isdoctorerror}
              required
              label="SELECT DOCTOR"
              // disabled={!isEditable}
              InputLabelProps={{
                style: { color: "whitesmoke" },
              }}
              helperText={isdoctorerror ? "Select Doctor" : null}
              variant="filled"
              //   value={IFSCcode}
              //   onChange={(e) => BankIFSCcodeCheck(e)}
              style={{
                // width: "30%",
                backgroundColor: "black",
                marginRight: "3.3%",
              }}
            />
          )}
        />
      </Box>
      <FormControl sx={{ mt: "8px" }}>
        <Typography variant="h6" color={colors.grey[200]}>
          GENDER
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          row
          value={gender}
          onChange={CheckGender}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="female"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: colors.greenAccent[200],
                  },
                }}
              />
            }
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: colors.greenAccent[200],
                  },
                }}
              />
            }
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: colors.greenAccent[200],
                  },
                }}
              />
            }
            label="Other"
          />
        </RadioGroup>
      </FormControl>

      <Box mt={"25px"}>
        <TextField
          value={extranote}
          onChange={checkextranote}
          fullWidth
          multiline
          rows={4}
          // error={isAddressError}

          label="EXTRA NOTE/OTHER SYMPTOMS"
          // disabled={!isEditable}
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          // helperText={isAddressError ? "Enter Proper Address" : null}
          variant="filled"
          style={{
            backgroundColor: "black",
          }}
        />
      </Box>
      <Box mt={2}>
        <Button
          style={{
            marginTop: "2px",
            borderRadius: 12,
            color: colors.greenAccent[200],

            fontSize: "18px",
            height: "34px",
          }}
          variant="filled"
          onClick={hadleselectdate}
        >
          Select Date And Time
        </Button>
      </Box>
      {selectDate ? (
        <Box mt={"15px"}>
          <Box display={"flex"} justifyContent={"space-between"} align>
            <Typography variant="h6" color={colors.grey[200]}>
              Appointment Date And Time
            </Typography>
          </Box>
          <Box mt={"15px"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                minDate={new Date()}
                label="Appointment Date"
                inputFormat="MM/DD/YYYY"
                value={appointmentdate}
                onChange={CheckDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={isappointmentdateError}
                    helperText={
                      isappointmentdateError ? "Enter Proper Date" : null
                    }
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              style={{
                marginTop: "2px",
                borderRadius: 12,
                color: colors.greenAccent[200],

                fontSize: "18px",
                height: "34px",
              }}
              variant="filled"
              onClick={handleselecttimeslot}
            >
              Check Time Slots
            </Button>
          </Box>
        </Box>
      ) : null}
      {selectTimeslot ? (
        <FormControl sx={{ mt: "8px" }}>
          <Typography variant="h6" color={colors.grey[200]}>
            TIME SLOTS
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            row
            value={timeslot}
            onChange={CheckTime}
            name="radio-buttons-group"
          >
            {timeSlots.map((timeslot) => {
              return (
                <FormControlLabel
                  value={timeslot}
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: colors.greenAccent[200],
                        },
                      }}
                    />
                  }
                  label={timeslot}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      ) : null}

      {timeslot < 1 ? null : (
        <Box display={"flex"} justifyContent="center" mt={"4px"}>
          <Button
            //   startIcon={<Edit />}
            style={{
              borderRadius: 12,
              backgroundColor: "green",
              // padding: "18px 36px",
              marginRight: "10px",
              fontSize: "18px",
              height: "34px",
            }}
            variant="contained"
            //   disabled={false}
            onClick={BookAppointment}
          >
            SCHEDULE APPOINTMENT
          </Button>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        key={"top" + "center"}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ScheduleAppointments;
