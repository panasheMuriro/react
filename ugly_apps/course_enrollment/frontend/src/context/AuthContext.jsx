import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const user = jwtDecode(token);
        setUser(user);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('accessToken');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
