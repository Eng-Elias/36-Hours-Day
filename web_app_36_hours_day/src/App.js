import logo from "./logo.svg";
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ fontFamily: "digital7" }}>
          Edit <code>src/App.js</code> and save to reload. 12:00:00
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
