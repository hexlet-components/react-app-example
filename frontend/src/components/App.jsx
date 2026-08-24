// @ts-check

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { AppShell, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import Navbar from "./Navbar.jsx";
import Registration from "./Registration.jsx";
import Login from "./Login.jsx";
import PrivatePage from "./PrivatePage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { AuthContext } from "../contexts/index.js";

import { useAuth } from "../hooks/index.js";
import routes from "../routes.js";

const headerHeight = 56;

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        getAuthHeader,
        user,
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
  <MantineProvider>
    {/* Правый верхний угол занят шапкой: уведомление там перекрывало бы кнопку
        выхода и мешало по ней кликнуть. */}
    <Notifications position="bottom-right" />
    <AuthProvider>
      <Router>
        <AppShell header={{ height: headerHeight }} padding="md">
          <AppShell.Header>
            <Navbar />
          </AppShell.Header>
          <AppShell.Main>
            <Routes>
              <Route path={routes.signupPagePath()} element={<Registration />} />
              <Route path={routes.loginPagePath()} element={<Login />} />
              <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
                <Route path="" element={<PrivatePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </Router>
    </AuthProvider>
  </MantineProvider>
);

export default App;
