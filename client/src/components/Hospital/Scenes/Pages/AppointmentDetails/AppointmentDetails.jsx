import { Box } from "@mui/system";
import React from "react";
import { Header } from "../../../global/Header";
import Typography from "@mui/material/Typography";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../../theme";
import PaidIcon from "@mui/icons-material/Paid";
import ErrorIcon from "@mui/icons-material/Error";
import PatientDetails from "../AppointmentDetails/PatientDetails";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const AppointmentDetails = () => {
  let query = useQuery();
  console.log();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [appointment, setappointment] = useState({});
  // const [icon, seticon] = useState(initialState);
  console.log(appointment);
  const GetAppointmentDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `/appointment/getappointment/${query.get("appointment")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    const data = await response.json();
    if (data.success === true) {
      setappointment(data.response);
    }
  };
  useEffect(() => {
    GetAppointmentDetails();
    console.log(appointment);
  }, []);

  const HandlePaymentStatus = async () => {
    let status = "paid";
    if (appointment.status === "paid") {
      setappointment({ ...appointment, status: "pending" });
      status = "pending";
    } else {
      setappointment({ ...appointment, status: "paid" });
      status = "paid";
    }
    const token = localStorage.getItem("token");

    const response = await fetch(
      `/appointment/updatepaymentstatus/${query.get("appointment")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ status }),
      }
    );
    const data = await response.json();
    if (data.success === true) {
      console.log(data);
    }
  };

  return (
    <Box m={"20px"}>
      <Header
        title={"Appointment Details"}
        subtitle={"Details Of A Particular Appointment"}
      />
      <Box
        mt={"12px"}
        display="flex"
        justifyContent={"space-between"}
        alignContent="center"
      >
        <Typography variant="h3" color={colors.greenAccent[400]}>
          <span color={colors.grey[200]}>APPOINTMENT-ID -</span>{" "}
          {appointment._id}
        </Typography>

        <IconButton onClick={HandlePaymentStatus}>
          {/* {status === "pending" && ( */}
          {/* <ErrorIcon style={{ color: colors.redAccent[600] }} /> */}
          {/* // )} */}
          {/* {status === "paid" && ( */}

          {/* // )} */}
          {appointment.status === "pending" ? (
            <Tooltip title={"PAYMENT PENDING"}>
              <ErrorIcon
                fontSize="large"
                style={{ color: colors.redAccent[600] }}
              />
            </Tooltip>
          ) : (
            <Tooltip title={"PAYMENT DONE"}>
              <PaidIcon
                fontSize="large"
                style={{ color: colors.greenAccent[600] }}
              />
            </Tooltip>
          )}
        </IconButton>
      </Box>
      <Divider style={{ marginTop: "10px" }} />
      <Typography
        style={{ marginTop: "10px" }}
        variant="h3"
        color={colors.grey[200]}
      >
        PATIENT DETAILS
      </Typography>
      <PatientDetails details={appointment} />
    </Box>
  );
};

export default AppointmentDetails;
