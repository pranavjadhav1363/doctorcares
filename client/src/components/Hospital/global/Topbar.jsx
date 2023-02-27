import { React, useContext } from "react";
import { Box, IconButton, useTheme, Typography, Tooltip } from "@mui/material";
import { ColorModeContxext, tokens } from "../../../theme";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
} from "@mui/icons-material";
import AppContext from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const context = useContext(AppContext);
  const { hospital, FetchHospitalDetails } = context;
  const colorMode = useContext(ColorModeContxext);
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <Box display={"flex"} justifyContent="space-between" p={2}>
      {/* Hospital Name */}
      <Box display={"flex"}>
        <Typography variant="h1" color={colors.greenAccent[400]}>
          {hospital.hospitalname}
        </Typography>
      </Box>
      <Box display={"flex"}>
        <Tooltip title="Logout">
          <IconButton onClick={handlelogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
