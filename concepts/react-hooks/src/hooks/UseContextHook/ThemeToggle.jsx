import React from "react";
import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h3>useContext Example - Theme</h3>
      <p>Current theme: {theme}</p>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme == "dark" ? "black" : "",
          color: theme == "light" ? "black" : "white",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeToggle;
