import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { Container, FormHelperText } from "@mui/material";
import DaysOf35HoursUtils from "../utils/days_of_36_hours_utils";
import { IonInput } from "@ionic/react";

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
          <IonInput
            label="Start Hour:"
            type="number"
            min={0}
            max={23}
            value={startHour}
            onIonInput={(e) => {
              setStartHour(e.target.value);
              DaysOf35HoursUtils.storeStartHourInLocalStorage(e.target.value);
            }}
            onIonChange={(e) => {
              setStartHour(e.target.value);
              DaysOf35HoursUtils.storeStartHourInLocalStorage(e.target.value);
            }}
            placeholder="6"
            helperText="Enter hour between 0 and 23. 6 means 6:00AM"
          ></IonInput>
          <FormHelperText>
            Enter hour between 0 and 23. <br /> 6 means 6:00AM
          </FormHelperText>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}

export default SettingsDrawer;
