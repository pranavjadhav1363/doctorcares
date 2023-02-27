import { useTheme } from "@emotion/react";
import { Edit } from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Drawer,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../../../../theme";
import statedistrict from "../../../../../data/statedistrict.json";
import { useEffect } from "react";
import { useContext } from "react";
import AppContext from "../../../../../context/AppContext";

const HospitalDetails = () => {
  const context = useContext(AppContext);
  const { hospital, FetchHospitalDetails, updateHospitaldetails } = context;
  const states = statedistrict.states;
  const [isEditable, setisEditable] = useState(false);
  const [isHospitalNameError, setisHospitalNameError] = useState(false);
  const [isHospitalContactNumberError, setisHospitalContactNumberErrror] =
    useState(false);
  const [isEmailidError, setisEmailidError] = useState(false);
  const [isStateError, setisStateError] = useState(false);
  const [isDistrictError, setisDistrictError] = useState(false);
  const [isPinCodeError, setisPinCodeError] = useState(false);
  const [isAddressError, setisAddressError] = useState(false);
  const [hospitalname, sethospitalname] = useState(hospital.hospitalname);
  const [hospitalphoneno, sethospitalphoneno] = useState(
    hospital.hospitalphoneno
  );
  const [hospitalemailid, sethospitalemailid] = useState(
    hospital.hospitalemailid
  );
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [district, setdistrict] = useState(hospital.district);
  const [state, setstate] = useState(hospital.state);
  const [departments, setdepartments] = useState({
    Cardiology: true,
    Orthopedic: true,
    Dental: true,
    Neurology: false,
    Gynaecology: true,
  });

  const CheckHospitalName = (e) => {
    const { value } = e.target;
    sethospitalname(value);
    if (value.length < 1) {
      setisHospitalNameError(true);
      return false;
    }
    setisHospitalNameError(false);
    return true;
  };
  const CheckHospitalContactNumber = (e) => {
    const { value } = e.target;
    sethospitalphoneno(value);
    if (value.length !== 10) {
      setisHospitalContactNumberErrror(true);
      return false;
    }
    setisHospitalContactNumberErrror(false);
    return true;
  };
  const CheckHospitalEmail = (e) => {
    const { value } = e.target;
    sethospitalemailid(value);
    console.log(EmailValidator.validate(value));
    if (EmailValidator.validate(value) === false) {
      setisEmailidError(true);
      return false;
    }
    setisEmailidError(false);
    return true;
  };
  const CheckPincode = (e) => {
    const { value } = e.target;
    setpincode(value);
    if (value.length !== 6) {
      setisPinCodeError(true);
      return false;
    }
    setisPinCodeError(false);
    return true;
  };
  const CheckHospitalAddress = (e) => {
    const { value } = e.target;
    setaddress(value);
    if (value.length < 1) {
      setisAddressError(true);
      return false;
    }
    setisAddressError(false);
    return true;
  };
  const CheckStateAndDistrict = () => {
    const selectedstate = states.find((x) => x.state === state);
    if (selectedstate.districts.includes(district) === false) {
      setisDistrictError(true);
      return false;
    } else {
      setisDistrictError(false);
      return true;
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const SaveUpdatedDetails = async () => {
    // let statedistrictcheck = CheckStateAndDistrict();
    // console.log(statedistrictcheck);
    if (
      !isDistrictError &&
      !isAddressError &&
      !isEmailidError &&
      !isHospitalContactNumberError &&
      !isHospitalNameError &&
      !isPinCodeError
      // statedistrictcheck
    ) {
      let updatedetails = updateHospitaldetails(
        hospitalname,
        hospitalemailid,
        hospitalphoneno
      );
      console.log(updatedetails);
      if (updatedetails) {
        setisEditable(false);
      }
    }
  };
  const CancelButtonClick = () => {
    setisEditable(false);
  };
  return (
    <Box mt={"20px"}>
      <Box display={"flex"} justifyContent={"space-between"} align>
        <Typography variant="h4" color={colors.grey[200]}>
          HOSPITAL DETAILS
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
          value={hospitalname}
          onChange={CheckHospitalName}
          error={isHospitalNameError}
          disabled={!isEditable}
          required
          label="HOSPITAL NAME"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={
            isHospitalNameError ? "Enter A Proper Hospital Name" : null
          }
          variant="filled"
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <TextField
          value={hospitalphoneno}
          onChange={CheckHospitalContactNumber}
          error={isHospitalContactNumberError}
          disabled={!isEditable}
          required
          label="HOSPITAL CONTACT NUMBER"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={
            isHospitalContactNumberError ? "Enter Valid Contact Number" : null
          }
          variant="filled"
          type={"number"}
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
        <TextField
          value={hospitalemailid}
          onChange={CheckHospitalEmail}
          error={isEmailidError}
          required
          label="HOSPITAL EMAILID"
          disabled={!isEditable}
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isEmailidError ? "Enter Valid EmailId" : null}
          variant="filled"
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
      </Box>
      {/* <Box mt={"15px"} display="flex">
        <Autocomplete
          onChange={(e, v) => {
            setstate(v);
          }}
          value={state}
          disabled={!isEditable}
          sx={{ width: "30%", marginRight: "3.3%" }}
          options={states.map((state) => state.state)}
          id="disable-clearable"
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              id=""
              //   error={isIFSCcodeError}
              required
              label="SELECT STATE"
              disabled={!isEditable}
              InputLabelProps={{
                style: { color: "whitesmoke" },
              }}
              //   helperText={isIFSCcodeError ? "Enter Valid IFSC Code" : null}
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
        <Autocomplete
          onChange={(e, v) => {
            setdistrict(v);
            setisDistrictError(false);
          }}
          value={district}
          disabled={!isEditable}
          sx={{ width: "30%", marginRight: "3.3%" }}
          options={states.find((x) => x.state === state).districts}
          id="disable-clearable"
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              id=""
              // label=""
              error={isDistrictError}
              x
              required
              label="SELECT DISTRICT"
              disabled={!isEditable}
              InputLabelProps={{
                style: { color: "whitesmoke" },
              }}
              helperText={isDistrictError ? "Select valid district" : null}
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
        <TextField
          value={pincode}
          onChange={CheckPincode}
          error={isPinCodeError}
          required
          label="PINCODE"
          disabled={!isEditable}
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isPinCodeError ? "Enter A Valid PINCODE" : null}
          variant="filled"
          style={{
            width: "30%",
            backgroundColor: "black",
            marginRight: "3.3%",
          }}
        />
      </Box> */}
      {/* <Box mt={"15px"}>
        <TextField
          value={address}
          onChange={CheckHospitalAddress}
          fullWidth
          multiline
          rows={4}
          error={isAddressError}
          required
          label="HOSPITAL ADDRESS"
          disabled={!isEditable}
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          helperText={isAddressError ? "Enter Proper Address" : null}
          variant="filled"
          style={{
            backgroundColor: "black",
          }}
        />
      </Box>
      <Box mt={"15px"}>
        <Box display={"flex"} justifyContent={"space-between"} align>
          <Typography variant="h6" color={colors.grey[200]}>
            DEPARTMENTS IN HOSPITAL
          </Typography>
        </Box>
        <FormGroup>
          <Box display={"flex"} justifyContent="space-around">
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color: "#00e676",
                  }}
                  checked={departments.Cardiology}
                  disabled={!isEditable}
                  onChange={() => {
                    if (departments.Cardiology === true) {
                      setdepartments({
                        ...departments,
                        Cardiology: false,
                      });
                    } else {
                      setdepartments({
                        ...departments,
                        Cardiology: true,
                      });
                    }
                  }}
                />
              }
              label="Cardiology"
            />
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color: "#00e676",
                  }}
                  onChange={() => {
                    if (departments.Orthopedic === true) {
                      setdepartments({
                        ...departments,
                        Orthopedic: false,
                      });
                    } else {
                      setdepartments({
                        ...departments,
                        Orthopedic: true,
                      });
                    }
                  }}
                  checked={departments.Orthopedic}
                  disabled={!isEditable}
                />
              }
              label="Orthopedic"
            />
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color: "#00e676",
                  }}
                  checked={departments.Dental}
                  disabled={!isEditable}
                  onChange={() => {
                    if (departments.Dental === true) {
                      setdepartments({
                        ...departments,
                        Dental: false,
                      });
                    } else {
                      setdepartments({
                        ...departments,
                        Dental: true,
                      });
                    }
                  }}
                />
              }
              label="Dental"
            />
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color: "#00e676",
                  }}
                  checked={departments.Neurology}
                  disabled={!isEditable}
                  onChange={() => {
                    if (departments.Neurology === true) {
                      setdepartments({
                        ...departments,
                        Neurology: false,
                      });
                    } else {
                      setdepartments({
                        ...departments,
                        Neurology: true,
                      });
                    }
                  }}
                />
              }
              label="Neurology"
            />
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color: "#00e676",
                  }}
                  checked={departments.Gynaecology}
                  disabled={!isEditable}
                  onChange={() => {
                    if (departments.Gynaecology === true) {
                      setdepartments({
                        ...departments,
                        Gynaecology: false,
                      });
                    } else {
                      setdepartments({
                        ...departments,
                        Gynaecology: true,
                      });
                    }
                  }}
                />
              }
              label="Gynaecology"
            />
          </Box>
        </FormGroup>
      </Box> */}
      {isEditable ? (
        <Box display={"flex"} justifyContent="center" mt={"14px"}>
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

export default HospitalDetails;
