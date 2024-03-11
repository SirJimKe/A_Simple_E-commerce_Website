import React from 'react';

const Home = () => {
    console.log("Home component rendered"); // Debugging statement
    return (
        <div className="home-page">
            <h1>Welcome to E-Kiosk</h1>
            <p>Discover the latest products and deals</p>
        </div>
    );
};

export default Home;
