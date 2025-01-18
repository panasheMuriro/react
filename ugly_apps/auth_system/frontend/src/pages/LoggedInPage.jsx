import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoggedInPage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>You are logged in!</h1>
      <p>Welcome, {user.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LoggedInPage;
