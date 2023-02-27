import React, { useState } from "react";
import { Header } from "../../global/Header";
import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  Button,
  colors,
  Divider,
  IconButton,
} from "@mui/material";
import { tokens } from "../../../../theme";
import AddDoctorInfo from "./AddDoctorInfo";
import Modal from "@mui/material/Modal";

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

const AddDoctor = () => {
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
    <>
      <Box m="20px">
        <Header title={"Add Doctor"} subtitle={"Add New Doctor"} />

        {/* <Typography variant="h4" color={colors.grey[100]}>
          DOCTOR PROFILE PHOTO
        </Typography>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          flexDirection={"column"}
        >
          <img
            src="https://images.unsplash.com/photo-1554126807-6b10f6f6692a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
            width={"100px"}
            height={"100px"}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />

          <Button
            style={{
              borderRadius: 12,
              color: colors.greenAccent[200],

              fontSize: "18px",
              height: "34px",
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            Edit Profile Photo
          </Button>
        </Box>
        <Divider /> */}
        <AddDoctorInfo />
        {/* <Modal open={open} onClose={handleClose}>
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
        {/* </Box>
        </Modal> } */}
      </Box>
    </>
  );
};

export default AddDoctor;
