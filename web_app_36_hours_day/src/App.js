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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <SettingsDrawer />
        <Clock />
      </div>
    </ThemeProvider>
  );
}

export default App;
