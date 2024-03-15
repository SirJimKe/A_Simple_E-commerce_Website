import React, { useState, useEffect } from 'react';
import './productlist.css';
import ProductDetails from '../ProductDetails/ProductDetails';

const ProductList = ({ onSelectProduct, selectedProduct }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
	fetch('https://fakestoreapi.com/products')
	    .then(response => response.json())
	    .then(data => setProducts(data))
	    .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleProductClick = (product) => {
	onSelectProduct(product); // Call onSelectProduct function with the selected product
    };

    return (
	<div className={`product-list ${selectedProduct ? 'hidden' : 'visible'}`}>
	    {selectedProduct ? (
		<ProductDetails product={selectedProduct} />
	    ) : (
		products.map(product => (
		    <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
			<img src={product.image} alt={product.title} className="product-image" />
			<h3>{product.title}</h3>
			<p>${product.price}</p>
		    </div>
		))
	    )}
	</div>
    );
};

export default ProductList;
