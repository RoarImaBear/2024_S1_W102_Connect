import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useAuth();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
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
                throw new Error('Email address is required.');
            }

            // Check if password is empty or less than 6 characters
            if (!password.trim() || password.trim().length < 6) {
                throw new Error('Password should be at least 6 characters.');
            }

            // Check if email is valid
            if (!isEmailValid(email)) {
                throw new Error('Invalid email format. Please enter a valid email address.');
            }

            // Login Account
            await login(email, password)
            setSuccessMessage('Login successful.');
            navigate('/feed');
        } catch(err) {
            if (err.code === 'auth/invalid-credential') {
                // Invalid credential
                setError('Invalid credential, please verify your inputs');
            } else if (err.code === 'auth/wrong-password') {
                // Incorrect password
                setError('Incorrect password. Please try again.');
            } else if (err.code === 'auth/user-not-found') {
                // Account doesn't exist yet
                setError('Email is not associated with any account. Please sign up instead.');
            } else if (err.code === 'auth/too-many-requests') {
                // Account doesn't exist yet
                setError('Too many unsuccessful sign-in attempts. Please try again later.');
            } else {
                setError(err.message);
            }
        }
    };  

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <form className="border p-4" onSubmit={handleSubmit}>
                <p className="mb-3" style={{ fontWeight: "bold", fontSize: "24px" }}>Login</p>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        disabled={loading}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        <button className="btn btn-outline-secondary" type="button" onClick={handleTogglePassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <p className="mb-3">Don't Have Account? <Link to="/signup">Register</Link></p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;
