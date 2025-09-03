import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PcGame from './components/PcGame';
import SportVideo from './components/SportVdeo';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo"><img src="/pcgamesportvideo.png" alt="App Logo" width={"149px"} height={"149px"}  />PcgameSportVideo</div>
          <nav className="nav-buttons">
            <Link to="/">Home</Link>
            <Link to="/pcgame">PC Game</Link>
            <Link to="/sportvideo">Sport Video</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/pcgame" />} />
            <Route path="/pcgame" element={<PcGame />} />
            <Route path="/sportvideo" element={<SportVideo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}