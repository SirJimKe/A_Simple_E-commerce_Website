import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import './home.css';

const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="home">
            <aside className="sidebar">
                <h2>Categories</h2>
                <ul className="category-list">
                    {/* List of categories */}
                    {['Electronics', 'Mobile Phones & Tablets', 'Vehicles', 'Laptops and PCs', 'Services', 'Pets', 'Properties', 'Software', 'Fashion', 'Agriculture & Food'].map((category, index) => (
                        <li key={index} className="category-item">{category}</li>
                    ))}
                </ul>
            </aside>
            <main className="content">
                <section className="top-sellers">
                    <h2>Top Selling Items</h2>
                    <Link to="/products" className="view-all">View All Products</Link>
                    {/* Ensure ProductList can handle onSelectProduct prop */}
                    <ProductList products={products} onSelectProduct={handleProductSelect} />
                </section>
                {/* Render ProductDetails only if selectedProduct is not null */}
                {selectedProduct && (
                    <ProductDetails product={selectedProduct} />
                )}
            </main>
        </div>
    );
};

export default Home;
