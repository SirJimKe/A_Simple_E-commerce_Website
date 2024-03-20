import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            if (password !== confirmPassword) {
                setPasswordMatch(false);
                return;
            }

            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            if (response.ok) {
                navigate('/sign-in');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred while signing up. Please try again later.');
        } finally {
            setPassword('');
            setConfirmPassword('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        setPasswordMatch(confirmPasswordValue === password);
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <div className="error">{error}</div>}
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input
                        className="input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <label className="label">Confirm Password</label>
                <div className="control">
                    <input
                        className={`input ${passwordMatch ? '' : 'is-danger'}`}
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
            </div>
            {!passwordMatch && (
                <p className="help is-danger">Passwords do not match</p>
            )}
            <div className="field">
                <div className="control">
                    <button className="button sign-btn" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
            <div className="signin-link">
                <p>Already have an account? <Link to="/sign-in">Sign in here</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
