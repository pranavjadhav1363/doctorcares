import { useTheme } from "@emotion/react";
import { ChargingStationRounded } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { tokens } from "../../../../theme";
import { Header } from "../../global/Header";

const Recharge = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m={"20px"}>
      <Header
        title={"Recharge"}
        subtitle={"Recharge Your Account To Access Doctor Care Services"}
      />

      <Box display={"flex"} justifyContent="space-between">
        <Typography variant="h4" color={colors.grey[100]}>
          <span style={{ color: colors.greenAccent[400] }}> Note:</span>{" "}
          {`The Amount Shown is Calculated on the basis of Service used from ${format(
            new Date(),
            "MM/dd/yyyy"
          )} to ${format(new Date(), "MM/dd/yyyy")}`}
        </Typography>
      </Box>
      <Box
        mt={"23px"}
        display={"flex"}
        flexDirection="row"
        alignItems={"center"}
        justifyContent="center"
      >
        <TextField
          disabled={true}
          required
          label="Recharge"
          InputLabelProps={{
            style: { color: "whitesmoke" },
          }}
          variant="filled"
          type="number"
          value={0}
          style={{ width: "30%", backgroundColor: "black" }}
        />
        <Button
          startIcon={<ChargingStationRounded />}
          style={{
            borderRadius: 12,
            backgroundColor: "rgb(120, 120, 211)",
            // padding: "18px 36px",
            fontSize: "18px",
          }}
          variant="contained"
          disabled={false}
        >
          Recharge
        </Button>
      </Box>
    </Box>
  );
};

export default Recharge;
