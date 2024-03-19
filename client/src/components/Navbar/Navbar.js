import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import './navbar.css';

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('token');
    const { cartItemCount } = useContext(CartContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">E-Kiosk</Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        {/* Search component to be implemented for better structure */}
                        <input type="text" placeholder="I am looking for..." />
                        <button className="button is-primary">Search</button>
                    </div>
                </div>
                <div className="navbar-end">
                    {/* Render links based on user authentication status */}
                    {isAuthenticated ? (
                        <Link to="/my-account" className="navbar-item">My Account</Link>
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
