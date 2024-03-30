import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import './productdetails.css';

const ProductDetails = ({ userId, cartItems }) => {
    const { addToCart } = useContext(CartContext);
    const { _id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isAuthenticated = localStorage.getItem('token');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${_id}`);
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
    }, [_id]);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && parseInt(value) >= 0) {
            setQuantity(parseInt(value));
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        const productToAdd = {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        };
        addToCart(productToAdd);
        setFeedbackMessage(`Added ${quantity} ${product.name} to cart`);
        setQuantity(1);
    };

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError('Please sign in to review this product.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    productId: _id,
		    userId: userId,
                    rating,
                    comment,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            setFeedbackMessage('Review submitted successfully.');
            setRating(0);
            setComment('');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (rating) => {
	const roundedRating = Math.round(rating);
        return Array.from({ length: roundedRating }, (_, i) => (
            <span key={i}>&#9733;</span>
        ));
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
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p className="description">{product.description}</p>
                <p className="price">Price: ${product.price}</p>
                <p className="average-rating">Average Rating: {renderStars(product.averageRating)}</p>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" />
                <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
                {isAuthenticated && (
                    <form onSubmit={handleSubmitReview} className="review-form">
                        <h3>Leave a Review</h3>
                        <label htmlFor="rating">Rating:</label>
                        <input type="number" id="rating" value={rating} onChange={handleRatingChange} min="1" max="5" />
                        <label htmlFor="comment">Comment:</label>
                        <textarea id="comment" value={comment} onChange={handleCommentChange}></textarea>
                        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Review'}</button>
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
                                    <p>{comment.comment}</p>
                                    <p>Rating: {renderStars(product.ratings[index].rating)}</p>
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
