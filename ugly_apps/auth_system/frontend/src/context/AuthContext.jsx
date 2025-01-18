import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const loadUserFromToken = () => {
  //   const token = localStorage.getItem('accessToken');
  //   console.log(token)

  //   if (token) {
  //     const userData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  //     setUser(userData);
  //   }
  // };

  const loadUserFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const base64Payload = token.split('.')[1]; // JWT payload is in the second part
        const decodedPayload = JSON.parse(atob(base64Payload)); // Decode base64 payload
        setUser(decodedPayload);
      } catch (error) {
        console.error('Invalid token:', error);
        // Clear invalid token from localStorage
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
