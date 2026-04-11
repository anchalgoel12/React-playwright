import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from '../components/signIn';
import Datafile from '../components/Datafile';
import PostDashboard from '../components/PostDashboard';
import { useState } from 'react';

export default function AppRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<SignIn setAuth={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route element={<Datafile isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<PostDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}