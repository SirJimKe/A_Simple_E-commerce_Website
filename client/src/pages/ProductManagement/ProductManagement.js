import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import './productmanagement.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async (formData) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                await fetchProducts();
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (formData) => {
        try {
            const response = await fetch(`/api/products/${editingProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                await fetchProducts();
                setEditingProductId(null);
            } else {
                console.error('Failed to edit product');
            }
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                await fetchProducts();
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditClick = (productId) => {
        setEditingProductId(productId);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
    };

    return (
        <div className="product-management">
            <h2 className="product-management-title">Add/Edit Products</h2>
            <ProductForm onSubmit={editingProductId ? handleEditProduct : handleAddProduct} initialValues={products.find(product => product._id === editingProductId)} />
            {editingProductId && <button className="cancel-edit-button" onClick={handleCancelEdit}>Cancel Edit</button>}
            <h2 className="product-management-title">Products</h2>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product._id} className="product-item">
                        {product.name} - {product.description} - ${product.price}
                        <button className="edit-button" onClick={() => handleEditClick(product._id)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
