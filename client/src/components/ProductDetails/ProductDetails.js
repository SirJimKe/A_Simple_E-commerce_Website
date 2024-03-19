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
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
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

    const calculateAverageRating = () => {
        if (!product || !product.rating) return 0;
        const { rate, count } = product.rating;
        return count === 0 ? 0 : (rate * count) / count;
    };

    const generateStars = (rating) => {
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
                <p className="average-rating">
                    Average Rating: {generateStars(calculateAverageRating())}
                    {product.rating && product.rating.count === 0 && "This product has no ratings yet."}
                </p>
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
                                    <p>Rating: {generateStars(comment.rating)}</p>
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
