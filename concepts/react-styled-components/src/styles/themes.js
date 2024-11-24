import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  text: "#333",
  cardBg: "#f9f9f9",
  buttonBg: "#6200ea",
};

export const darkTheme = {
  body: "#333",
  text: "#fff",
  cardBg: "#444",
  buttonBg: "#bb86fc",
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: Arial, sans-serif;
    transition: all 0.3s ease;
  }
`;
