import { useTheme } from "@emotion/react";
import { Box, Typography, Button, colors, Divider, Modal } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";
import { tokens } from "../../../../../theme";
import { Header } from "../../../global/Header";
import HospitalDetails from "./HospitalDetails";

const HospitalInfo = () => {
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const context = useContext(AppContext);
  const { hospital, FetchHospitalDetails } = context;
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    setFile(hospital.hospitallogo);
  }, []);

  console.log(file);
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
        title={"Hospital Information"}
        subtitle={"This Information Will Be Shown to Patient On Our Website"}
      />

      <Typography variant="h4" color={colors.grey[100]}>
        HOSPITAL LOGO
      </Typography>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        flexDirection={"column"}
      >
        <img
          src={hospital.hospitallogo}
          alt=""
          width={"100px"}
          height={"100px"}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />

        <Button
          // startIcon={<PersonAddIcon />}
          style={{
            borderRadius: 12,
            color: colors.greenAccent[200],
            // backgroundColor: "rgb(120, 120, 211)",
            // backgroundColor: "rgb(120, 120, 211)",
            // padding: "18px 36px",
            fontSize: "18px",
            height: "34px",
          }}
          variant="outlined"
          onClick={handleOpen}
          //   disabled={false}
        >
          Edit Hospital Logo
        </Button>
      </Box>
      <Divider />
      <HospitalDetails />
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

export default HospitalInfo;
