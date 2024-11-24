import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

function ThemeToggle({ toggleTheme }) {
  return <Button onClick={toggleTheme}>Toggle Theme</Button>;
}

export default ThemeToggle;
