import "./App.css";

// roboto font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// digital7 font
import "./fonts/digital7/digital-7.ttf";
import "./fonts/digital7/digital-7 (italic).ttf";
import "./fonts/digital7/digital-7 (mono italic).ttf";
import "./fonts/digital7/digital-7 (mono).ttf";
import Clock from "./components/Clock";
import SettingsDrawer from "./components/SettingsDrawer";
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import DaysOf35HoursUtils from "./utils/days_of_36_hours_utils";
import TimePassed from "./components/TimePassed";
import { useMediaQuery } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const isMobile = useMediaQuery("@media (max-width: 500px)");

  const [startHour, setStartHour] = useState(
    DaysOf35HoursUtils.getStartHourFromLocalStorageOrDefault()
  );

  const [passedTime, setPassedTime] = useState(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <SettingsDrawer {...{ startHour, setStartHour }} />
        {!isMobile && <TimePassed passedTime={passedTime} />}
        <Clock {...{ startHour, setStartHour, setPassedTime }} />
      </div>
    </ThemeProvider>
  );
}

export default App;
