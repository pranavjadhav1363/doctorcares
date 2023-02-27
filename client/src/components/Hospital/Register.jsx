// import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
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
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const Registration = () => {
  const [hospitallogo, sethospitallogo] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [severity, setseverity] = useState("success");
  const [message, setmessage] = useState("");
  const [hospitalname, sethospitalname] = useState("");
  const [hospitalemailid, sethospitalemailid] = useState("");
  const [hospitalphoneno, sethospitalphoneno] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [Gender, setGender] = useState("female");
  const [isNameErorr, setisNameErorr] = useState(false);
  const [isEmailErorr, setisEmailErorr] = useState(false);
  const [isPhonenoErorr, setisPhonenoErorr] = useState(false);
  const [isPasswordErorr, setisPasswordErorr] = useState(false);
  const [isConfirmPasswordErorr, setisConfirmPasswordErorr] = useState(false);
  const [isGenderErorr, setisGenderErorr] = useState(false);
  const HandleNameChange = (e) => {
    const { value } = e.target;
    sethospitalname(value);
    if (value.length < 1) {
      setisNameErorr(true);
      return false;
    }
    setisNameErorr(false);
    return true;
  };
  const HandleEmailChange = (e) => {
    const { value } = e.target;
    sethospitalemailid(value);
    if (EmailValidator.validate(value) === false) {
      setisEmailErorr(true);
      return false;
    }
    setisEmailErorr(false);
    return true;
  };
  const HandlePhonenoChange = (e) => {
    const { value } = e.target;
    sethospitalphoneno(value);
    console.log(validator.isMobilePhone(value, "en-IN"));
    if (validator.isMobilePhone(value, "en-IN") === false) {
      setisPhonenoErorr(true);
      return false;
    }
    setisPhonenoErorr(false);
    return true;
  };
  const HandleGenderChange = (e) => {
    const { value } = e.target;
    setGender(value);
    return true;
  };
  const handleClose = () => {
    setopen(false);
  };
  const HandlePasswordChange = (e) => {
    const { value } = e.target;
    setisConfirmPasswordErorr(false);
    setpassword(value);
    if (value.length < 8) {
      setisPasswordErorr(true);
      return false;
    }
    setisPasswordErorr(false);
    return true;
  };
  const HandleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setisConfirmPasswordErorr(false);
    setConfirmPassword(value);
  };
  const HandleSignin = async () => {
    setloading(true);
    if (hospitalname.length < 1) {
      setisNameErorr(true);
      setloading(false);
      return false;
    }

    if (EmailValidator.validate(hospitalemailid) === false) {
      setisEmailErorr(true);
      setloading(false);

      return false;
    }
    if (validator.isMobilePhone(hospitalphoneno, "en-IN") === false) {
      setisPhonenoErorr(true);
      setloading(false);

      return false;
    }
    if (password.length < 8) {
      setisPasswordErorr(true);
      setloading(false);

      return false;
    }
    if (Gender.length < 1) {
      setisGenderErorr(true);
      setloading(false);

      return false;
    }
    if (password !== ConfirmPassword) {
      setisConfirmPasswordErorr(true);
      setloading(false);

      return false;
    }
    if (hospitallogo.length < 1) {
      setmessage("Please Upload A logo");
      setseverity("error");
      setopen(true);
      setloading(false);
      return false;
    }
    const response = await fetch("/hospital/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospitallogo,
        hospitalname,
        hospitalphoneno,
        hospitalemailid,
        password,
      }),
    });
    const data = await response.json();
    if (data.success === true) {
      setmessage("Account Created Successfully");
      setseverity("success");
      setopen(true);
      sethospitalname("");
      sethospitalemailid("");
      sethospitalphoneno("");
      setpassword("");
      setConfirmPassword("");
      setloading(false);

      localStorage.setItem("token", data.token);
      navigate("/hospital/todaysappointment", { replace: true });
      return true;
    }
    if (data.success === false) {
      setmessage(data.response);
      setseverity("error");
      setopen(true);
      setloading(false);

      return false;
    }
  };
  const postDetails = (image) => {
    setloading(true);
    if (image === undefined || image === null) {
      sethospitallogo("none");
      return;
    }
    console.log(image);
    if (
      image.type === "image/jpeg" ||
      image.type === "image/jpg" ||
      image.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "rfqcargo");
      data.append("cloud_name", "dtr5mvanb");
      fetch("https://api.cloudinary.com/v1_1/dtr5mvanb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          sethospitallogo(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      // setloading(false);
      return;
    }
  };
  return (
    <Box mt={4} mb={4}>
      <Paper
        sx={{
          backgroundColor: colors.grey[500],
          maxWidth: 350,
          margin: "0px auto",
          padding: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              flexDirection={"column"}
            >
              <img
                // style={{ borderRadius: 50 }}
                width={200}
                height={50}
                src="https://res.cloudinary.com/dtr5mvanb/image/upload/v1677441099/kdt6l5sjtwz5d7xmgcyu.png"
                alt=""
              />
            </Box>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              flexDirection={"column"}
            >
              {hospitallogo ? (
                <img
                  style={{ borderRadius: 50 }}
                  width={50}
                  height={50}
                  src={hospitallogo}
                />
              ) : null}
            </Box>
          </Grid>

          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <Button variant="contained" component="label">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
                hidden
              />
            </Button>
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              error={isNameErorr}
              value={hospitalname}
              onChange={HandleNameChange}
              label="Enter Your Name"
              fullWidth
              helperText={isNameErorr ? "Please Enter Your Name" : null}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              error={isEmailErorr}
              value={hospitalemailid}
              onChange={HandleEmailChange}
              label="Enter Your Email"
              fullWidth
              helperText={isEmailErorr ? "Please Enter A Valid Email" : null}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              error={isPhonenoErorr}
              value={hospitalphoneno}
              onChange={HandlePhonenoChange}
              label="Enter Your Phone Number"
              fullWidth
              helperText={isPhonenoErorr ? "Please Enter A Phone Number" : null}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              value={password}
              type={showPassword ? "text" : "password"}
              error={isPasswordErorr}
              onChange={HandlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label=""
                      onClick={() => setshowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Enter Your Password"
              fullWidth
              helperText={
                isPasswordErorr
                  ? "Please Enter A Password Of Length Atleast 8 Characters"
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              error={isConfirmPasswordErorr}
              value={ConfirmPassword}
              onChange={HandleConfirmPasswordChange}
              label="Confirm Password"
              fullWidth
              helperText={
                isConfirmPasswordErorr ? "Password Do Not Match" : null
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label=""
                      onClick={() =>
                        setshowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Button
            disabled={loading}
            variant="contained"
            color="success"
            onClick={HandleSignin}
          >
            {loading ? "...SIgning in" : "Register"}
          </Button>
          <Typography variant="h6" mt={2} color="initial">
            Have an account? <Link to={"/"}>Log In</Link>
          </Typography>
        </Box>
      </Paper>
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

export default Registration;
