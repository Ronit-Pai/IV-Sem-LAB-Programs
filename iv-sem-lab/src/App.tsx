import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CoursePage from './components/CoursePage';
import ProgramDetails from './components/ProgramDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseName" element={<CoursePage />} />
          <Route path="/program/:courseName/:programName" element={<ProgramDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
