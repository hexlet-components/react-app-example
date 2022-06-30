// @ts-check

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';

import Navbar from './Navbar.jsx';
import Registration from './Registration.jsx';
import Login from './Login.jsx';
import PrivatePage from './PrivatePage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { AuthContext } from '../contexts/index.js';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider value={{
      logIn, logOut, getAuthHeader, user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path={routes.signupPagePath()} element={<Registration />} />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
            <Route path="" element={<PrivatePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  </AuthProvider>
);

export default App;
