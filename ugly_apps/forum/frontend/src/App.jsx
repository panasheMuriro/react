import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
// import LoggedInPage from './pages/LoggedInPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/Signup';
import CreatePost from './pages/CreatePost';

// const ProtectedRoute = ({ children }) => {
//   const { user } = React.useContext(AuthContext);

//   if (!user) {
//     // Redirect to homepage if the user is not logged in
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          
          {/* <Route
            path="/logged-in"
            element={
              <ProtectedRoute>
                <LoggedInPage />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
