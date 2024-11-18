import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    const userIsAuthenticated = true;

    if (userIsAuthenticated) {
      setIsAuthenticated(true);
      navigate("/dashboard");
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
