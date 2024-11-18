import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login logic
    const userIsAuthenticated = true;

    if (userIsAuthenticated) {
      setIsAuthenticated(true); // Update global authentication state
      navigate("/dashboard"); // Redirect to Dashboard
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
