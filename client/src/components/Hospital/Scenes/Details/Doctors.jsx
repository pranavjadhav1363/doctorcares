import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { mockDataTeam } from "../../../../data/Mockdata";

import { tokens } from "../../../../theme";
import { Header } from "../../global/Header";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import { useEffect } from "react";
import { DeleteForever } from "@mui/icons-material";

export const Doctors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [doctors, setdoctors] = useState("");
  const handledeletedoctor = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/hospitalfordoctor/deletedoctor/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const data = await response.json();
    if (data.success === true) {
      let filteredarray = doctors.filter((doctor) => {
        return doctor._id !== id;
      });
      setdoctors(filteredarray);
      return true;
    } else if (data.success === false) {
      return false;
    }
  };
  const FetchDoctors = async () => {
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
    FetchDoctors();
  }, []);
  const columns = [
    {
      field: "serialno",
      headerName: "Sr no",
      filterable: false,
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },

    {
      field: "name",
      headerName: "DOCTOR NAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "phoneno", headerName: "PHONE NO", flex: 1 },
    { field: "emailid", headerName: "EMAIL ID", flex: 1 },

    {
      field: "id",
      headerName: "DELETE DOCTOR",
      flex: 0.7,
      // description: "This column has a value getter and is not sortable.",
      renderCell: (params) => {
        return (
          <Tooltip title={"Delete Doctor"}>
            <IconButton onClick={() => handledeletedoctor(params.id)}>
              <DeleteForever />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Box display={"flex"} justifyContent="space-between">
        <Header
          title={"Doctors"}
          subtitle={"List Of Doctor in Hospital Name"}
        />
        <Button
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/hospital/adddoctor"
          style={{
            borderRadius: 12,
            backgroundColor: "rgb(120, 120, 211)",
            // padding: "18px 36px",
            fontSize: "18px",
            height: "34px",
          }}
          variant="contained"
          //   disabled={false}
        >
          Add Doctor
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
          rows={doctors}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          disableSelectionOnClick={false}
        />
      </Box>
    </Box>
  );
};
