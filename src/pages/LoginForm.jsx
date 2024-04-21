import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {auth} from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Login Successful")
        } catch(err) {
            console.log(err)
        }
    }    
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <form className="border p-4" onSubmit={handleSubmit}>
                <p className="mb-3" style={{ fontWeight: "bold", fontSize: "24px" }}>Login</p>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        onChange={(e) => setEmail(e.target.value)}
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
