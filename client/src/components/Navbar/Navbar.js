import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
    return (
	<nav className="navbar">
	    <div className="navbar-brand">
		<Link to="/" className="navbar-item">E-Kiosk</Link>
	    </div>
	    <div className="navbar-menu">
		<div className="navbar-start">
		    <div className="navbar-item">
			{/* Search component */}
			<input type="text" placeholder="Search..." />
			<button className="button is-primary">Search</button>
		    </div>
		</div>
		<div className="navbar-end">
		    <Link to="/my-account" className="navbar-item">My Account</Link>
		    <Link to="/cart" className="navbar-item">Cart</Link>
		</div>
	    </div>
	</nav>
    );
}

export default Navbar;
