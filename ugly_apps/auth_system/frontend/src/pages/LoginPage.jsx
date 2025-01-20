import { useState, useContext, useEffect } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // if user is logged in,

  useEffect(() => {
    if (user) {
      navigate("/logged-in");
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(email, password);
      localStorage.setItem("accessToken", data.accessToken.access_token);

      console.log(data, data.accessToken, data.accessToken.access_token);
      setUser(data.user);
      navigate("/logged-in"); // Redirect to the logged-in page
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
