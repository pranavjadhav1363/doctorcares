import { useTheme } from "@emotion/react";
import { Edit, Margin } from "@mui/icons-material";
import { Box, Typography, Button, TextField, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../../../theme";
import { Header } from "../../global/Header";
import ifscFinder from "ifsc-finder";

const BankDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isEditable, setisEditable] = useState(false);
  const [Bank, setBank] = useState("");
  const [isBankAccountNumberError, setisBankAccountNumberError] =
    useState(false);
  const [isIFSCcodeError, setisIFSCcodeError] = useState(false);
  const [BankAccountNumber, setBankAccountNumber] = useState("");
  const [IFSCcode, setIFSCcode] = useState("");
  const SaveBankDetails = () => {
    if (!isIFSCcodeError && !isBankAccountNumberError) {
      // update
      setisEditable(false);
    }
  };
  const CancelButtonClick = () => {
    setisEditable(false);
  };
  function BankAccounNumberCheck(e) {
    const { value } = e.target;
    console.log(value);
    setBankAccountNumber(value);
    console.log("Length1", value.length);
    console.log(BankAccountNumber);
    console.log("bankLength2", BankAccountNumber.length);
    if (value.length < 9 || value.length > 18) {
      setisBankAccountNumberError(true);
      console.log("Length", value.length);
      console.log("bankLength", BankAccountNumber.length);

      // return false;
    } else {
      setisBankAccountNumberError(false);
      // return true;
    }
  }
  const BankIFSCcodeCheck = async (e) => {
    const { value } = e.target;

    setIFSCcode(value);
    const getbranchname = await ifscFinder.getBranchName(value);
    const getbankname = await ifscFinder.getBankName(value);
    console.log(getbankname);
    if (value.length === 11) {
      setisIFSCcodeError(false);
      setBank(`${getbankname},${getbranchname}`);
    } else {
      setisIFSCcodeError(true);
      setBank(getbankname);

      return false;
    }
    return true;
  };
  return (
    <Box m={"20px"}>
      <Header
        title={"Bank Details"}
        subtitle={"Bank Details To Which Hospital Is Linked"}
      />
      <Box>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h4" color={colors.grey[100]}>
            <span style={{ color: colors.greenAccent[400] }}> Note:</span> Your
            Hospital will Only be listed on the website after valid bank details
          </Typography>
          <Button
            startIcon={<Edit />}
            style={{
              borderRadius: 12,
              backgroundColor: "rgb(120, 120, 211)",
              // padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            onClick={() => {
              setisEditable(true);
            }}
            disabled={isEditable}
          >
            Edit
          </Button>
        </Box>
        <Box
          mt={"18px"}
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          justifyContent="center"
          // sx={{ backgroundColor: "white" }}
        >
          <TextField
            id=""
            error={isBankAccountNumberError}
            helperText={
              isBankAccountNumberError
                ? "Enter Valid Bank Account Number"
                : null
            }
            disabled={!isEditable}
            required
            label="ENTER BANK ACCOUNT NUMBER"
            InputLabelProps={{
              style: { color: "whitesmoke" },
            }}
            variant="filled"
            type="number"
            value={BankAccountNumber}
            onChange={BankAccounNumberCheck}
            style={{ width: "50%", backgroundColor: "black" }}
          />
          <Box m={"12px"}></Box>
          <TextField
            id=""
            // label=""
            error={isIFSCcodeError}
            required
            label="ENTER IFSC CODE"
            disabled={!isEditable}
            InputLabelProps={{
              style: { color: "whitesmoke" },
            }}
            helperText={isIFSCcodeError ? "Enter Valid IFSC Code" : null}
            variant="filled"
            value={IFSCcode}
            onChange={(e) => BankIFSCcodeCheck(e)}
            style={{ width: "50%", backgroundColor: "black" }}
          />
        </Box>
        <Box display={"flex"} justifyContent="space-between" mt={"23px"}>
          {Bank !== "Not Found!" ? (
            <Typography variant="h6" color={colors.greenAccent[400]}>
              {Bank}
            </Typography>
          ) : (
            <Typography variant="h6" color={colors.greenAccent[400]}>
              NO BANK FOUND
            </Typography>
          )}
          {isEditable ? (
            <ButtonGroup
              variant="contained"
              style={{
                borderRadius: 12,
                backgroundColor: colors.greenAccent[800],
                // padding: "18px 36px",
                fontSize: "18px",
              }}
            >
              <Button
                onClick={SaveBankDetails}
                style={{
                  // padding: "14px 0px",
                  backgroundColor: colors.greenAccent[800],
                  color: "whitesmoke",
                  fontSize: "15px",
                }}
              >
                SAVE
              </Button>
              <Button
                onClick={CancelButtonClick}
                color="primary"
                style={{
                  // padding: "14px 0px",
                  fontSize: "15px",
                  backgroundColor: "grey",
                  color: "whitesmoke",
                  // marginLeft: "2px",
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default BankDetails;
