import "./App.css";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home/>} />
          {/* <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/upload" element={<UploadRecipe />} />
        <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
