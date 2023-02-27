import { useTheme } from "@emotion/react";
import { Box, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { tokens } from "../../../../../theme";
import Symptoms from "./Symptoms";

const PatientDetails = (props) => {
  const { details } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const date = details.appointmentdate;
  // console.log(date.length);

  return (
    <>
      <Box
        mt={"15px"}
        display={"flex"}
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography
          width={"30%"}
          style={{ marginBottom: "8px" }}
          color={colors.grey[100]}
          variant="h5"
        >
          PATIENT NAME -{" "}
          <span style={{ color: colors.greenAccent[400] }}>
            {" "}
            {details.name}
          </span>
        </Typography>
        <Typography
          width={"30%"}
          style={{ marginBottom: "8px" }}
          color={colors.grey[100]}
          variant="h5"
        >
          Dcotor -{" "}
          <span style={{ color: colors.greenAccent[400] }}>
            {details.doctorname}
          </span>
        </Typography>
        <Typography
          width={"30%"}
          style={{ marginBottom: "8px" }}
          color={colors.grey[100]}
          variant="h5"
        >
          APPOINTMENT DATE -
          {details.appointmentdate !== undefined ? (
            <span style={{ color: colors.greenAccent[400] }}>
              {" "}
              {format(new Date(details.appointmentdate), "MM/dd/yyyy")}
            </span>
          ) : (
            <span style={{ color: colors.greenAccent[400] }}>
              {" "}
              {format(new Date(), "MM/dd/yyyy")}
            </span>
          )}{" "}
        </Typography>

        <Typography
          style={{ marginBottom: "8px" }}
          width={"30%"}
          color={colors.grey[100]}
          variant="h5"
        >
          TIME -{" "}
          <span style={{ color: colors.greenAccent[400] }}>
            {" "}
            {details.timeslot}
          </span>
        </Typography>
        <Typography
          style={{ marginBottom: "8px" }}
          width={"30%"}
          color={colors.grey[100]}
          variant="h5"
        >
          AGE:
          <span style={{ color: colors.greenAccent[400] }}> {details.age}</span>
        </Typography>
        <Typography
          style={{ marginBottom: "8px" }}
          width={"30%"}
          color={colors.grey[100]}
          variant="h5"
        >
          GENDER:
          <span style={{ color: colors.greenAccent[400] }}>
            {" "}
            {details.gender}
          </span>
        </Typography>
        <Typography
          style={{ marginBottom: "8px" }}
          width={"30%"}
          color={colors.grey[100]}
          variant="h5"
        >
          EMAIL -{" "}
          <span style={{ color: colors.greenAccent[400] }}>
            {" "}
            {details.emailid}
          </span>
        </Typography>
        <Typography
          style={{ marginBottom: "8px" }}
          width={"65%"}
          variant="h5"
          color={colors.grey[100]}
        >
          PHONENUMBER -
          <span style={{ color: colors.greenAccent[400] }}>
            {" "}
            {details.phoneno}
          </span>
        </Typography>
      </Box>
      <Divider />

      <Symptoms extranote={details.extranote} />
    </>
  );
};

export default PatientDetails;
