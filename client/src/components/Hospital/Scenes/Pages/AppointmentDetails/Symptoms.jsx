import { useTheme } from "@emotion/react";
import { Chip, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { tokens } from "../../../../../theme";

const Symptoms = ({ extranote }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {extranote !== "" ? (
        <>
          <Typography
            style={{ marginTop: "10px" }}
            variant="h3"
            color={colors.grey[200]}
          >
            EXTRA NOTE
          </Typography>
          <Typography
            style={{ marginBottom: "8px" }}
            width={"100%"}
            color={colors.grey[100]}
            variant="h5"
          >
            {extranote !== "" ? (
              <span style={{ color: colors.greenAccent[400] }}>
                {extranote}
              </span>
            ) : null}
          </Typography>
        </>
      ) : null}{" "}
    </>
  );
};

export default Symptoms;
