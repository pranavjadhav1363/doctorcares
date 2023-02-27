import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  Button,
  colors,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { tokens } from "../../../../../theme";
import { Header } from "../../../global/Header";
import DoctorDetails from "./DoctorDetails";
// import HospitalDetails from "./HospitalDetails";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "grey",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const DoctorInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState(
    "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png"
  );
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m={"20px"}>
      <Header
        title={"Doctor"}
        subtitle={
          "This Information About A Particular Doctor is Shown on website"
        }
      />

      <DoctorDetails />
      <Modal open={open} onClose={handleClose}>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          flexDirection={"column"}
          sx={{ ...style, width: 200 }}
        >
          <img
            src={file}
            alt=""
            width={"100px"}
            height={"100px"}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
          <Button
            style={{
              marginTop: "3px",
              // borderRadius: 12,
              border: "none",
              color: colors.greenAccent[200],
              // backgroundColor: "white",
              fontSize: "12px",
              height: "34px",
            }}
            variant="outlined"
            component="label"
          >
            Browse Photo
            <input type="file" onChange={handleChange} hidden />
          </Button>
          <Box display={"flex"} justifyContent="space-around">
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
              // onClick={SaveUpdatedDetails}
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
              onClick={handleClose}
            >
              CANCEL
            </Button>
          </Box>
          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </Box>
  );
};

export default DoctorInfo;
