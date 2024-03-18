import React, { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './productspage.css';

const ProductsPage = () => {
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

    return (
        <div className="container products-page-container">
            <h1>All Products</h1>
            <ProductList products={products} />
        </div>
    );
};

export default ProductsPage;
