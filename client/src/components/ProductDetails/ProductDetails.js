import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import './productdetails.css';

const ProductDetails = ({ cartItems }) => {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const isAuthenticated = localStorage.getItem('token');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product details');
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && parseInt(value) >= 0) {
            setQuantity(parseInt(value));
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        const productToAdd = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        };
        addToCart(productToAdd);
        setFeedbackMessage(`Added ${quantity} ${product.title} to cart`);
        setQuantity(1);
    };

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError('Please sign in to review this product.');
            return;
        }
        // Here you can add logic to submit the review to the backend
        // For demonstration purpose, let's just console log the review data
        console.log('Rating:', rating);
        console.log('Comment:', comment);
        // Clear the form fields
        setRating(0);
        setComment('');
        setFeedbackMessage('Review submitted successfully.');
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details-container">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <h2>{product.title}</h2>
                <p className="description">{product.description}</p>
                <p className="price">Price: ${product.price}</p>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" />
                <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
                {isAuthenticated && (
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        <h3>Leave a Review</h3>
                        <label htmlFor="rating">Rating:</label>
                        <input type="number" id="rating" value={rating} onChange={handleRatingChange} min="1" max="5" />
                        <label htmlFor="comment">Comment:</label>
                        <textarea id="comment" value={comment} onChange={handleCommentChange}></textarea>
                        <button type="submit">Submit Review</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                )}
                {!isAuthenticated && <p>Please <Link to="/sign-in">sign in</Link> to review this product.</p>}
            </div>
            <Link to="/products" className="back-to-products">View Other Products</Link>
            <div className="customer-feedback">
                <h3>Customer Feedback</h3>
                {product.comments && product.comments.length > 0 ? (
                    <ul>
                        {product.comments.map((comment, index) => (
                            <li key={index}>
                                <div>
                                    <p>{comment.text}</p>
                                    <p>Rating: {comment.rating}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>This product has no customer feedback yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
