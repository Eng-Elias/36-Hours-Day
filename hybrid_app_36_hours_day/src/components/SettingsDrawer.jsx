import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { Container, FormHelperText, FormLabel } from "@mui/material";
import CustomNumberInput from "./CustomNumberInput";
import DaysOf35HoursUtils from "../utils/days_of_36_hours_utils";

function SettingsDrawer(props) {
  const [open, setOpen] = useState(false);

  const { startHour, setStartHour } = props;

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        sx={{
          float: "right",
        }}
      >
        <ManageHistoryIcon fontSize="large" />
      </Button>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          backgroundColor: "dark",
        }}
      >
        <Container sx={{ mt: 5 }}>
          <FormLabel>Start Hour:</FormLabel>
          <CustomNumberInput
            aria-label="Quantity Input"
            min={0}
            max={23}
            value={startHour}
            sx={{ mt: 2 }}
            onChange={(e) => {
              setStartHour(e.target.value);
              DaysOf35HoursUtils.storeStartHourInLocalStorage(e.target.value);
            }}
          />
          <FormHelperText>
            Enter hour between 0 and 23. <br /> 6 means 6:00AM
          </FormHelperText>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}

export default SettingsDrawer;
