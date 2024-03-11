import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';

const App = () => {
    return (
	<Router>
	    <div className="app">
		<Navbar />
		<Home />
		<div className="main-content">
		    <Routes>

		    </Routes>
		</div>
	    </div>
	</Router>
    );
};

export default App;
