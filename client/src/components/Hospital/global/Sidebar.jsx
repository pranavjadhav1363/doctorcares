import { Box, useTheme, Typography, IconButton } from "@mui/material";
import { React, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import DashboardCustomizeSharpIcon from "@mui/icons-material/DashboardCustomizeSharp";
import TodaySharpIcon from "@mui/icons-material/TodaySharp";
import FolderIcon from "@mui/icons-material/Folder";
import UpdateIcon from "@mui/icons-material/Update";

import { ChargingStationRounded, LocalHospital } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppContext from "../../../context/AppContext";
import { useContext } from "react";

const Item = ({ title, to, icon, selected, setselected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setselected(title)}
      icon={icon}
    >
      <Typography variant="h6">{title}</Typography>
      <Link to={to}></Link>
    </MenuItem>
  );
};

export const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const context = useContext(AppContext);
  const { hospital, FetchHospitalDetails } = context;
  useEffect(() => {
    FetchHospitalDetails();
  }, []);
  const [isCollapsed, setisCollapsed] = useState(false);
  const [selected, setselected] = useState("Dashboard");
  return (
    <Box
      // height={""}
      sx={{
        "& .pro-sidebar": {
          // position: "absolute",
          height: "150%",
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setisCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                // position={"sticky"}
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Doctor Cares
                </Typography>
                <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`${hospital.hospitallogo}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {hospital.hospitalname}
                </Typography>
                <Typography variant="subtitle2" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box pl={isCollapsed ? undefined : "10%"}>
            {/* <Item
              title={"Dashboard"}
              to="/"
              icon={<DashboardCustomizeSharpIcon />}
              selected={selected}
              setselected={setselected}
            /> */}
            {/* //Appointments */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Appointments
            </Typography>
            <Item
              title={"Today"}
              to="/hospital/todaysappointment"
              icon={<TodaySharpIcon />}
              selected={selected}
              setselected={setselected}
            />
            <Item
              title={"Upcoming"}
              to="/hospital/upcomingappointments"
              icon={<UpdateIcon />}
              selected={selected}
              setselected={setselected}
            />
            <Item
              title={"Past"}
              to="/hospital/pastappointments"
              icon={<FolderIcon />}
              selected={selected}
              setselected={setselected}
            />

            {/* Details */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Details
            </Typography>
            <Item
              title={"Hospital Info"}
              to="/hospital/hospitalinfo"
              icon={<LocalHospital />}
              selected={selected}
              setselected={setselected}
            />
            {/* <Item
              title={"Bank"}
              to="/bankdetails"
              icon={<AccountBalanceIcon />}
              selected={selected}
              setselected={setselected}
            /> */}
            <Item
              title={"Doctors"}
              to="/hospital/alldoctors"
              icon={<PeopleAltIcon />}
              selected={selected}
              setselected={setselected}
            />
            {/* <Item
              title={"Recharge"}
              to="/recharge"
              icon={<ChargingStationRounded />}
              selected={selected}
              setselected={setselected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
