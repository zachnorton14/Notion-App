import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Error404 from './Error404';
import Dashboard from './components/Dashboard';
import NoteView from './components/NoteView';
import Login from './components/Login';
import Signup from './components/SignUp';

import './css/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/noteID" element={<NoteView />} />
        <Route exact path="/profile" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
