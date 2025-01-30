import { useState, useContext } from "react";
import { register } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(name, email, password);
      localStorage.setItem("accessToken", data.accessToken.access_token);
      setUser(data.user);
      navigate("/"); // Redirect to the logged-in page
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSignup}>
        <h1>Signup</h1>

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
        <button type="submit">Signup</button>
      </form>

      <>Have an account already? <button onClick={()=> navigate("/login")}>Log in</button></>
    </>
  );
};

export default SignupPage;
