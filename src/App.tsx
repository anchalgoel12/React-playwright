import { useState } from 'react';
import './App.css'
import Datafile from './components/Datafile';
import PostDashboard from './components/PostDashboard';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn';

function AuthedApp() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <div>
        <button type="button" onClick={() => navigate('/datafile')}>
          Datafile
        </button>
        <button type="button" onClick={() => navigate('/postDashboard')}>
          Post Dashboard
        </button>
      </div>
      <Routes>
        <Route path="/datafile" element={<Datafile />} />
        <Route path="/postDashboard" element={<PostDashboard />} />
      </Routes>
    </div>
  );
}


function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <BrowserRouter>
      {!token ? <SignIn setToken={setToken} /> : <AuthedApp />}
    </BrowserRouter>
  );
}

export default App;
