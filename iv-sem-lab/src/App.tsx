import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CoursePage from './components/CoursePage';
import ProgramDetails from './components/ProgramDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseName" element={<CoursePage />} />
        <Route path="/program/:courseName/:programName" element={<ProgramDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
