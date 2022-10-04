import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import './css/App.css';
import Home from './components/Home'
import NotFound from './NotFound';
import Dashboard from './components/Dashboard';
import NoteView from './components/NoteView';
import Login from './components/Login';
import Signup from './components/SignUp';
import CurrentUserProvider from './contexts/CurrentUser';
import Profile from './components/Profile';
import FolderView from './components/FolderView';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'

  library.add(fab, faArrowLeft, faPlus)


function App() {

  let { folderId } = useParams()

  return (
    <CurrentUserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/:folderId" element={<FolderView />} />
          <Route exact path="/dashboard/folderID/noteID" element={<NoteView />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
