import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import SearchResults from './components/SearchResults/SearchResults';

const App = () => {
    const [products, setProducts] = useState([]);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
		const token = localStorage.getItem('token');
		if (!token) {
                    throw new Error('Authorization token is missing');
		}
                const response = await fetch('/api/user/details', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setUserName(data.username);
                setUserRole(data.role);
		console.log(data);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchUserRole();
        fetchProducts();
    }, []);

    return (
        <Router>
            <CartProvider>
                <div className="app">
                    <Navbar />
                    <div className="main-content">
                        <Routes>
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/manage-products" element={<ProductManagement userRole={userRole} />} />
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/search" element={<SearchResults products={products} />} />
                            <Route path="/" element={<Home />} userName={userName}/>
                        </Routes>
                    </div>
                </div>
            </CartProvider>
        </Router>
    );
};

export default App;
