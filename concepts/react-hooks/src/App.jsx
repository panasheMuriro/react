import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./hooks/UseStateHook";
import Timer from "./hooks/UseEffectHook";
import Button from "./hooks/UseCallbackHook";
import Calculation from "./hooks/UseMemoHook";
import { ThemeProvider } from "./hooks/UseContextHook/ThemeContext";
import ThemeToggle from "./hooks/UseContextHook/ThemeToggle";

function App() {

  return (
    <>
      <ThemeProvider>
        <div className="App">
          <Counter />
          <hr />
          <Timer />
          <hr />
          <Button />
          <hr />
          <Calculation />
          <hr />
          <ThemeToggle/>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
