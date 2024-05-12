import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/pre-auth-style.css";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Check if email is empty
      if (!email.trim()) {
        throw new Error("Email address is required.");
      }

      // Check if password is empty or less than 6 characters
      if (!password.trim() || password.trim().length < 6) {
        throw new Error("Password should be at least 6 characters.");
      }

      // Check if email is valid
      if (!isEmailValid(email)) {
        throw new Error(
          "Invalid email format. Please enter a valid email address."
        );
      }

      // Create Account
      await signup(email, password);
      setSuccessMessage("Account created successfully.");
      // Take user to another page
      navigate("/profile");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        // If account already exists
        setError(
          "An account with this email already exists, try Login instead!"
        );
      } else if (err.code === "auth/invalid-email") {
        // If email is invalid
        setError("Invalid email. Please try again!");
      } else if (err.code === "auth/network-request-failed") {
        // If network request failed
        setError("Network error. Please try again later.");
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div id="login-form-container">
      <form className="border p-4" onSubmit={handleSubmit}>
        <h4>Sign up</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={loading}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleTogglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <p className="mb-3">
          Already registered? <Link to="/login">Login</Link>
        </p>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
