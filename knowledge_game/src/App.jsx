import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayPage from './pages/PlayPage';
import GradingPage from './pages/GradingPage';
import PlayerSetupPage from './pages/PlayerSetupPage';

function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<PlayerSetupPage />} />
           <Route path="/play" element={<PlayPage />} />
            <Route path="/grading" element={<GradingPage />} />
          {/* <Route path="/home" element={<Home/>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
