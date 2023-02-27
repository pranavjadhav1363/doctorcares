import { useTheme } from "@emotion/react";
import * as EmailValidator from "email-validator";

import { Edit } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import {
  Box,
  Button,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  RadioGroup,
  Radio,
} from "@mui/material";
import { margin } from "@mui/system";
import React, { useState } from "react";
import { tokens } from "../../../../../theme";
import { number } from "yup";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppContext from "../../../../../context/AppContext";
import { useContext } from "react";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const DoctorDetails = () => {
  let query = useQuery();

  console.log();

  const context = useContext(AppContext);
  const { doctor, GetDoctorDetails } = context;
  const [isEditable, setisEditable] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setname] = useState(doctor.name);
  const [isnameerror, setisnameerror] = useState(false);
  const [phoneno, setphoneno] = useState(doctor.phoneno);
  const [isphonenoerror, setisphonenoerror] = useState(false);
  const [emailid, setemailid] = useState(doctor.emailid);
  const [isemailiderror, setisemailiderror] = useState(false);
  const [degree, setdegree] = useState("");
  const [isdegreeerror, setisdegreeerror] = useState(false);
  const [experience, setexperience] = useState("");
  const [isexperienceerror, setisexperienceerror] = useState(false);
  const [specialization, setspecialization] = useState("");
  const [isspecializationerror, setisspecializationerror] = useState(false);
  const [workingdays, setworkingdays] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });
  const [fee, setfee] = useState("");
  const [isfeeerror, setisfeeerror] = useState(false);
  const [span, setspan] = useState(doctor.span);
  const [isspanerror, setisspanerror] = useState(false);
  const [WorkingHourFrom, setWorkingHourFrom] = useState("");
  const [isWorkingHourFromerror, setisWorkingHtourFromerror] = useState(false);
  const [WorkingHourTo, setWorkingHourTo] = useState("");
  const [isWorkingHourToerror, setisWorkingHourToerror] = useState(false);
  const Checkname = (e) => {
    const { value } = e.target;
    setname(value);
    if (value.length < 1) {
      setisnameerror(true);
      return false;
    }
    setisnameerror(false);
    return true;
  };
  const CheckFee = (e) => {
    const { value } = e.target;
    setfee(value);
    if (value.length < 1) {
      setisfeeerror(true);
      return false;
    }
    setisfeeerror(false);
    return true;
  };
  const CheckSpan = (e) => {
    const { value } = e.target;
    setspan(value);
    if (value.length < 1) {
      setisspanerror(true);
      return false;
    }
    setisspanerror(false);
    return true;
  };
  const CheckWorkingHourFrom = (e) => {
    setWorkingHourFrom(e);
  };
  const CheckWorkingHourTo = (e) => {
    setWorkingHourTo(e);
  };
  const CheckPhoneno = (e) => {
    const { value } = e.target;
    setphoneno(value);
    if (value.length < 10) {
      setisphonenoerror(true);
      return false;
    }
    setisphonenoerror(false);
    return true;
  };
  const Checkemailid = (e) => {
    const { value } = e.target;
    setemailid(value);
    if (EmailValidator.validate(value) === false) {
      setisemailiderror(true);
      return false;
    }
    setisemailiderror(false);
    return true;
  };
  const CheckDegree = (e) => {
    const { value } = e.target;
    setdegree(value);
    if (value.length < 1) {
      setisdegreeerror(true);
      return false;
    }
    setisdegreeerror(false);
    return true;
  };
  const CheckExperience = (e) => {
    const { value } = e.target;
    setexperience(value);
    if (value.length < 1) {
      setisexperienceerror(true);
      return false;
    }
    setisexperienceerror(false);
    return true;
  };
  const CheckSpecialization = (e) => {
    setspecialization(e.target.value);
  };
  const SaveUpdatedDetails = () => {
    // if (!isIFSCcodeError && !isBankAccountNumberError) {
    // update
    setisEditable(false);
    // }
  };
  const CancelButtonClick = () => {
    setisEditable(false);
  };

  useEffect(() => {
    let getdetails = GetDoctorDetails(query.get("doctorid"));
    if (getdetails === true) {
      let newdata = doctor[workingdays];
      setworkingdays({ ...workingdays, ...newdata });
    }
  }, []);
  return (
    <Box mt={"20px"}>
      <Box display={"flex"} justifyContent={"space-between"} align>
        <Typography variant="h4" color={colors.grey[200]}>
          DOCTOR DETAILS
        </Typography>
        <Button
          startIcon={<Edit />}
          style={{
            borderRadius: 12,
            backgroundColor: "rgb(120, 120, 211)",
            // padding: "18px 36px",
            fontSize: "18px",
            height: "34px",
          }}
          variant="contained"
          onClick={() => {
            setisEditable(true);
          }}
          disabled={isEditable}
        >
          EDIT
        </Button>
      </Box>
      <Box mt={"15px"}>
        <TextField
          value={name}
          error={isnameerror}
          disabled={!isEditable}
          required
          label="DOCTOR NAME"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isnameerror ? "Enter Proper Name" : null}
          variant="filled"
          onChange={Checkname}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <TextField
          value={phoneno}
          error={isphonenoerror}
          disabled={!isEditable}
          required
          label="DOCTOR CONTACT NUMBER"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          type={"number"}
          helperText={isphonenoerror ? "Enter Valid Contact Number" : null}
          variant="filled"
          onChange={CheckPhoneno}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <TextField
          value={emailid}
          error={isemailiderror}
          required
          label="DOCTOR EMAILID"
          disabled={!isEditable}
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isemailiderror ? "Enter Valid Email Id" : null}
          variant="filled"
          onChange={Checkemailid}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
      </Box>

      <Box mt={"15px"}>
        <Box display={"flex"} justifyContent={"space-between"} align>
          <Typography variant="h6" color={colors.grey[200]}>
            Working Details
          </Typography>
        </Box>
        <FormGroup>
          <Box display={"flex"} justifyContent="space-around">
            <FormControlLabel
              control={
                <Checkbox
                  checked={workingdays[1]}
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (workingdays[1] === true) {
                      setworkingdays({
                        ...workingdays,
                        1: false,
                      });
                    } else {
                      setworkingdays({
                        ...workingdays,
                        1: true,
                      });
                    }
                  }}
                  disabled={!isEditable}
                />
              }
              label="MONDAY"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={workingdays[2]}
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (workingdays[2] === true) {
                      setworkingdays({
                        ...workingdays,
                        2: false,
                      });
                    } else {
                      setworkingdays({
                        ...workingdays,
                        2: true,
                      });
                    }
                  }}
                  disabled={!isEditable}
                />
              }
              label="TUESDAY"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={workingdays[3]}
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (workingdays[3] === true) {
                      setworkingdays({
                        ...workingdays,
                        3: false,
                      });
                    } else {
                      setworkingdays({
                        ...workingdays,
                        3: true,
                      });
                    }
                  }}
                  disabled={!isEditable}
                />
              }
              label="WEDNESDAY"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={workingdays[4]}
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (workingdays[4] === true) {
                      setworkingdays({
                        ...workingdays,
                        4: false,
                      });
                    } else {
                      setworkingdays({
                        ...workingdays,
                        4: true,
                      });
                    }
                  }}
                  disabled={!isEditable}
                />
              }
              label="THRUSDAY"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={workingdays[5]}
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (workingdays[5] === true) {
                      setworkingdays({
                        ...workingdays,
                        5: false,
                      });
                    } else {
                      setworkingdays({
                        ...workingdays,
                        5: true,
                      });
                    }
                  }}
                  disabled={!isEditable}
                />
              }
              label="FRIDAY"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={workingdays[6]}
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (workingdays[6] === true) {
                      setworkingdays({
                        ...workingdays,
                        6: false,
                      });
                    } else {
                      setworkingdays({
                        ...workingdays,
                        6: true,
                      });
                    }
                  }}
                  disabled={!isEditable}
                />
              }
              label="SATURDAY"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={workingdays[0]}
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (workingdays[0] === true) {
                      setworkingdays({
                        ...workingdays,
                        0: false,
                      });
                    } else {
                      setworkingdays({
                        ...workingdays,
                        0: true,
                      });
                    }
                  }}
                  disabled={!isEditable}
                />
              }
              label="SUNDAY"
            />
          </Box>
        </FormGroup>
      </Box>
      <Box mt={"15px"} display={"flex"} justifyContent="space-around">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            disabled={!isEditable}
            label="WORKING FROM"
            value={"06:00:00 AM"}
            onChange={CheckWorkingHourFrom}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          value={span}
          error={isspanerror}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Minutes</InputAdornment>
            ),
          }}
          required
          label="TIME SPAN BETWEEN TWO PATIENTS"
          disabled={!isEditable}
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          type="number"
          helperText={isspanerror ? "Enter valid time span" : null}
          variant="filled"
          onChange={CheckSpan}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={WorkingHourTo}
            label="WORKING TILL"
            disabled={!isEditable}
            onChange={CheckWorkingHourTo}
            renderInput={(params) => <TextField disabled="true" {...params} />}
          />
        </LocalizationProvider>
      </Box>
      {isEditable ? (
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
            onClick={SaveUpdatedDetails}
          >
            SAVE
          </Button>
          <Button
            //   startIcon={<Edit />}
            style={{
              borderRadius: 12,
              backgroundColor: "grey",
              // padding: "18px 36px",
              fontSize: "18px",
              height: "34px",
            }}
            variant="contained"
            //   disabled={false}
            onClick={CancelButtonClick}
          >
            CANCEL
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default DoctorDetails;
