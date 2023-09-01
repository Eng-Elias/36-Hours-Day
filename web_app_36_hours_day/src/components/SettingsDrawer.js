import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { Container, FormLabel } from "@mui/material";
import CustomNumberInput from "./CustomNumberInput";

function SettingsDrawer() {
  const [open, setOpen] = useState(false);

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
            min={1}
            max={23}
            value={6}
            sx={{ mt: 2 }}
          />
        </Container>
      </Drawer>
    </React.Fragment>
  );
}

export default SettingsDrawer;
