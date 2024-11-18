import { Route, Routes, Link, useResolvedPath } from 'react-router-dom';

function Overview() {
  return <h2>Dashboard Overview</h2>;
}

function Settings() {
  return <h2>Dashboard Settings</h2>;
}

function Dashboard() {
  const resolvedPath = useResolvedPath(""); // Resolve the base path for nested routes

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to={`${resolvedPath.pathname}/overview`}>Overview</Link></li>
          <li><Link to={`${resolvedPath.pathname}/settings`}>Settings</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
