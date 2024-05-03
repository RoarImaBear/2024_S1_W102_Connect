import React from "react";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from "./pages/profile";
import Feed from "./pages/feed";
import Matches from "./pages/Matches";
import Location from "./pages/Location";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route 
        path = "/Location"
        element = {
          <PrivateRoute>
            <Location />
          </PrivateRoute>
        }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <PrivateRoute>
              <Matches />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
