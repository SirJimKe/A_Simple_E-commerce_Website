import React, { useState } from 'react';
import './productdetails.css'; // Import CSS file

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleAddToCart = () => {
        // You can implement add to cart functionality here
        console.log(`Added ${quantity} ${product.title} to cart.`);
    };

    const calculateAverageRating = () => {
        const totalRatings = product.rating ? product.rating.count : 0;
        const ratingSum = product.rating ? product.rating.rate * totalRatings : 0;
        return totalRatings === 0 ? 0 : ratingSum / totalRatings;
    };

    const generateStars = (rating) => {
        const roundedRating = Math.round(rating);
        const stars = [];
        for (let i = 0; i < roundedRating; i++) {
            stars.push(<span key={i}>&#9733;</span>);
        }
        return stars;
    };

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
                <p className="average-rating">
                    Average Rating: {generateStars(calculateAverageRating())}
                    {product.rating && product.rating.count === 0 && "This product has no ratings yet."}
                </p>
            </div>
            <div className="customer-feedback">
                <h3>Customer Feedback</h3>
                {product.rating && product.rating.count > 0 ? (
                    <ul>
                        {product.comments && product.comments.map((comment, index) => (
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
