import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import './home.css';

const Home = ({ userName }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const extractCategories = () => {
        const categories = new Set(products.map(product => product.category));
        return [''].concat(Array.from(categories));
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    return (
	<>
	    {userName && <div className="greeting">Welcome, {userName}!</div>}
            <div className="home">
		<aside className="sidebar">
                    <h2>Categories</h2>
                    <ul className="category-list">
			{/* List of categories */}
			{extractCategories().map((category, index) => (
                            <li key={index} className={`category-item ${selectedCategory === category ? 'active' : ''}`} onClick={() => handleCategoryClick(category)}>{category || 'All'}</li>
			))}
                    </ul>
		</aside>
		<main className="content">
                    <section className="top-sellers">
			<h2>Top Selling Items</h2>
			<Link to="/products" className="view-all">View All Products</Link>
			{/* Pass filtered products to ProductList */}
			<ProductList products={filteredProducts} onSelectProduct={handleProductSelect} />
                    </section>
                    {/* Render ProductDetails only if selectedProduct is not null */}
                    {selectedProduct && (
			<ProductDetails product={selectedProduct} />
                    )}
		</main>
            </div>
	</>
    );
};

export default Home;
