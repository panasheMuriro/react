import { useState, useContext, useEffect } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUser(jwtDecode(localStorage.getItem("accessToken")));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(name, email, password);
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      setUser(jwtDecode(data.accessToken));
      // jwtDecode(token)
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <br></br>
      </form>
      <>
        No Account? <button onClick={() => navigate("/signup")}>Sign Up</button>
      </>
    </>
  );
};

export default LoginPage;
