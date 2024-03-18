import React from 'react';
import { useNavigate } from 'react-router-dom';
import './productlist.css';

const ProductList = ({ products, onSelectProduct }) => {
    const navigate = useNavigate();

    const handleProductClick = (product) => {
	if (onSelectProduct) {
	    onSelectProduct(product);
	}
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                    <div className="product-image-wrapper">
                        <img src={product.image} alt={product.title} className="product-image" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-title">{product.title}</h3>
                        <p className="product-price">${product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
