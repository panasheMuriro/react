import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import HOCwithAuthCheck from "./components/HOCWithAuthCheck";


const ProtectedDashboard = HOCwithAuthCheck(Dashboard);
const ProtectedProfile = HOCwithAuthCheck(Profile);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div style={{display: "flex", placeItems: "center", flexDirection: "column", width: "100vw"}}>
      <h1>Welcome to the SPA</h1>

      {!isAuthenticated ? (
        <div>
          <h2>Please Log In</h2>
          <button onClick={handleLogin}>Log In</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsAuthenticated(false)}>Log Out</button>
          <div>
            <h3>Dashboard</h3>
            <ProtectedDashboard isAuthenticated={isAuthenticated} />
            <h3>Profile</h3>
            <ProtectedProfile isAuthenticated={isAuthenticated} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
