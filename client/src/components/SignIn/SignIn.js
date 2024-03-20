import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';

const SignIn = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usernameOrEmail,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/my-account');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('An error occurred while signing in. Please try again later.');
        } finally {
            setPassword('');
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            {error && <div className="error">{error}</div>}
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
