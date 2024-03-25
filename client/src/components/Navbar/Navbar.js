import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import './navbar.css';

const Navbar = ({ products }) => {
    const isAuthenticated = localStorage.getItem('token');
    const { cartItemCount } = useContext(CartContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        navigate(`/search?q=${searchQuery}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
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
                <div className="navbar-end">
                    {isAuthenticated ? (
                        <button className="navbar-item log-out" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/sign-in" className="navbar-item sign-in">Sign In</Link>
                    )}
                    <Link to="/cart" className="navbar-item">
                        Cart {cartItemCount > 0 ? <span className="cart-count">{cartItemCount}</span> : '0'}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
