// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Track from './Track.js';
import Admin from './Admin.js'; // create this component

const App = () => {
  return (
    <Router>
      <div className="container py-4">
        <nav className="mb-4">
          <Link to="/" className="btn btn-primary me-2">Track Shipment</Link>
          <Link to="/admin" className="btn btn-secondary">Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Track />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
