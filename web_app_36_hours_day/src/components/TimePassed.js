import React from "react";
import Alert from "@mui/material/Alert";

function TimePassed({ passedTime }) {
  if (!passedTime) return;

  return (
    <div className="time-passed">
      <Alert
        type="warning"
        severity="warning"
        sx={{
          fontFamily: "digital7-mono",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        {passedTime.lostHours}:{passedTime.lostMinutes}:{passedTime.lostSeconds}
        <br />
        passed of 36 hours
      </Alert>
    </div>
  );
}

export default TimePassed;
