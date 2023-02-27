import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { tokens } from "../../../../theme";
import { mockDataTeam } from "../../../../data/Mockdata";
import { Header } from "../../global/Header";
import { useTheme } from "@emotion/react";
import PaidIcon from "@mui/icons-material/Paid";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { format } from "date-fns/esm";
import { Schedule } from "@mui/icons-material";

export const TodaysAppointment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialstate = [];
  const [Appointments, setAppointments] = useState(initialstate);
  const FetchAppointments = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/hospitalFordoctor/getappointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const data = await response.json();
    if (data.success === true) {
      let appointments = data.response;
      let todaysappointments = appointments.filter((appointment) => {
        return (
          format(new Date(appointment.appointmentdate), "do MMMM Y") ===
          format(new Date(), "do MMMM Y")
        );
      });
      setAppointments(todaysappointments);
      // setloading(false);
      console.log(data.response);
      return false;
    } else if (data.success === false) {
      // seterror(data.response);
      // setloading(false);
      return false;
    }
  };
  useEffect(() => {
    let call = FetchAppointments();
  }, []);
  const columns = [
    {
      field: "serialno",
      headerName: "Sr no",
      filterable: false,
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },
    {
      field: "_id",
      headerName: "Appointment ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 0.2,
      cellClassName: "name-column--cell",
    },
    { field: "phoneno", headerName: "PHONE NO", flex: 0.3 },
    { field: "doctorname", headerName: "DOCTOR", flex: 0.3 },
    { field: "timeslot", headerName: "TIME" },
    {
      field: "status",
      headerName: "STATUS",
      renderCell: ({ row: { status } }) => {
        return (
          <Tooltip title={status === "pending" ? "pending" : "paid"}>
            <IconButton>
              {status === "pending" && (
                <ErrorIcon style={{ color: colors.redAccent[600] }} />
              )}
              {status === "paid" && (
                <PaidIcon style={{ color: colors.greenAccent[600] }} />
              )}
            </IconButton>
          </Tooltip>
        );
      },
    },

    {
      field: "id",
      headerName: "VIEW DETAILS",
      // description: "This column has a value getter and is not sortable.",
      renderCell: (params) => {
        return (
          <Tooltip title={"View Details"}>
            <Link
              to={{
                pathname: "/hospital/appointmentdetails",
                search: `?appointment=${params.id}`,
                state: { fromDashboard: true },
                // console.log(first)
              }}
            >
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </Link>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Box display={"flex"} justifyContent="space-between">
        <Header
          title={"Today's Appointment"}
          subtitle={format(new Date(), "do MMMM Y")}
        />
        <Button
          startIcon={<Schedule />}
          style={{
            borderRadius: 12,
            backgroundColor: "rgb(120, 120, 211)",
            // padding: "18px 36px",
            fontSize: "18px",
            height: "34px",
          }}
          variant="contained"
          component={Link}
          to="/hospital/scheduleappointments"

          //   disabled={false}
        >
          Schedule Appointments
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={Appointments}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          disableSelectionOnClick={false}
        />
      </Box>
    </Box>
  );
};
