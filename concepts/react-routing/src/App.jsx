import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  return (
    <Router>
      <div>
        <nav>
          <ul style={{ display: "flex", gap: 50 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/profile/1">Profile 1</Link>
            </li>
            <li>
              <Link to="/profile/2">Profile 2</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
