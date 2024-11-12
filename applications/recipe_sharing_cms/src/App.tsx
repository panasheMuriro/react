import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRecipePage from "./pages/AddRecipePage";
import Admin from "./pages/Admin";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} />
          <Route path="/add_recipe" element={<AddRecipePage/>} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} /> {/* RecipePage route */}
          <Route path="/admin" element={<Admin/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
