import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyle, lightTheme } from "./styles/themes";
import ThemeToggle from "./components/ThemeToggle";
import Card from "./components/Card";
;

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div style={{ padding: "20px" }}>
        <ThemeToggle toggleTheme={toggleTheme} />
        <Card />
      </div>
    </ThemeProvider>
  );
}

export default App;
