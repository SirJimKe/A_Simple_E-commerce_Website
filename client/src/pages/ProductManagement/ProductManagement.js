import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import './productmanagement.css';

const ProductManagement = ({ userRole }) => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [deleteConfirmationProductId, setDeleteConfirmationProductId] = useState(null); // Track delete confirmation for specific product
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authorization token is missing');
    }

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
            setErrorMessage('Failed to fetch products');
        }
    };

    const handleAddProduct = async (formData) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                await fetchProducts();
            } else {
                console.error('Failed to add product');
                setErrorMessage('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Error adding product');
        }
    };

    const handleEditProduct = async (formData) => {
        try {
            const response = await fetch(`/api/products/${editingProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                await fetchProducts();
                setEditingProductId(null);
            } else {
                console.error('Failed to edit product');
                setErrorMessage('Failed to edit product');
            }
        } catch (error) {
            console.error('Error editing product:', error);
            setErrorMessage('Error editing product');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                await fetchProducts();
            } else {
                console.error('Failed to delete product');
                setErrorMessage('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            setErrorMessage('Error deleting product');
        }
    };

    const handleEditClick = (productId) => {
        setEditingProductId(productId);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
    };

    const handleShowDeleteConfirmation = (productId) => {
        setDeleteConfirmationProductId(productId);
    };

    const handleConfirmDelete = (productId) => {
        handleDeleteProduct(productId);
        setDeleteConfirmationProductId(null);
    };

    const handleCancelDelete = () => {
        setDeleteConfirmationProductId(null);
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
                        <button className="delete-button" onClick={() => handleShowDeleteConfirmation(product._id)}>Delete</button>
                        {deleteConfirmationProductId === product._id && (
                            <div className="delete-confirmation">
                                <p>Are you sure you want to delete this product?</p>
                                <button onClick={() => handleConfirmDelete(product._id)}>Yes</button>
                                <button onClick={handleCancelDelete}>No</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
