import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";


// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
// const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));

function App() {
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

        {/* Suspense provides a fallback UI while components are loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
