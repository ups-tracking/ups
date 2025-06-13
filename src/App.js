// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Track from './Track.js';
import Admin from './Admin.js'; // create this component
import Footer from './Footer.js';

const App = () => {
  return (
    <Router>
      <div>
       

        <Routes>
          <Route path="/" element={<Track />} />
          <Route path="/portal" element={<Admin />} />
        </Routes>
        <Footer/>
      </div>
    </Router>

  );
};

export default App;
