import React, { useState, useEffect } from 'react';
import './productform.css';

const ProductForm = ({ onSubmit, initialValues }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
	category: '',
	quantity: ''
    });

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            description: '',
            price: '',
            imageUrl: '',
	    category: '',
	    quantity: ''
        });
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" id="name" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text" id="description" name="description" className="form-input" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="price" className="form-label">Price:</label>
                <input type="number" id="price" name="price" className="form-input" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" className="form-input" value={formData.imageUrl} onChange={handleChange} required />
            </div>
	    <div className="form-group">
                <label htmlFor="category" className="form-label">Category:</label>
                <input type="text" id="category" name="category" className="form-input" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity:</label>
                <input type="number" id="quantity" name="quantity" className="form-input" value={formData.quantity} onChange={handleChange} required />
            </div>
            <button type="submit" className="form-button">{initialValues ? 'Update' : 'Add'} Product</button>
        </form>
    );
};

export default ProductForm;
