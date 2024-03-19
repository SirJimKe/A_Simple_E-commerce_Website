import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?q=${searchQuery}`);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">E-Kiosk</Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <input
                            type="text"
                            placeholder="I am looking for..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="button is-primary" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                {/* Render links based on user authentication status */}
                <div className="navbar-end">
                    <Link to="/sign-in" className="navbar-item sign-in">Sign In</Link>
                    <Link to="/cart" className="navbar-item">Cart</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
