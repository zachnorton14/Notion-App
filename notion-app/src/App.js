import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Error404 from './Error404';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
