import React from "react";
import Home from "./pages/home";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/profile";
import Feed from "./pages/feed";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
        </Routes>
    </Router>
  );
}

export default App;
