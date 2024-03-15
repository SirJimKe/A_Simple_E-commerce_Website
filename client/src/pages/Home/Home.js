import React, { useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import './home.css';

const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductSelect = (product) => {
        setSelectedProduct(product); // Set the selected product
    };

    return (
        <div className="home-page">
            {selectedProduct ? (
                <ProductDetails product={selectedProduct} />
            ) : (
                <>
                    <div className="categories-section">
                        {/* Product categories will go here */}
                        <h2>Product Categories</h2>
                        <ul>
                            <li>Electronics</li>
                            <li>Mobile Phones & Tablets</li>
                            <li>Vehicles</li>
                            <li>Laptops and PC</li>
                            <li>Services</li>
                            <li>Pets</li>
                            <li>Properties</li>
                            <li>Software</li>
                            <li>Fashion</li>
                            <li>Agriculture & Food</li>
                        </ul>
                    </div>
                    <div className="product-list-section">
                        <h2>Top selling items</h2>
                        <ProductList onSelectProduct={handleProductSelect} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
