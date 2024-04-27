import React from 'react';
import Home from "./pages/home";
import SignUpForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import Profile from "./pages/profile";
import Feed from "./pages/feed";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
