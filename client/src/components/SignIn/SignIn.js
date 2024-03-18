import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';

const SignIn = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Handle sign-in logic here
        console.log('Signing in...');
    }

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <div className="field">
                <label className="label">Email or Username</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter your email or username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input
                        className="input"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button sign-btn" onClick={handleSignIn}>Sign In</button>
                </div>
            </div>
            <div className="signup-link">
                <p>Not registered yet? <Link to="/sign-up">Sign up here</Link></p>
            </div>
        </div>
    );
}

export default SignIn;
