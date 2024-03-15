import React, { useState } from 'react';

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleAddToCart = () => {
        // You can implement add to cart functionality here
        console.log(`Added ${quantity} ${product.title} to cart.`);
    };

    // Calculate average rating
    const calculateAverageRating = () => {
        const totalRatings = product.rating ? product.rating.count : 0;
        const ratingSum = product.rating ? product.rating.rate * totalRatings : 0;
        return totalRatings === 0 ? 0 : ratingSum / totalRatings;
    };

    // Generate stars based on average rating
    const generateStars = (rating) => {
        const roundedRating = Math.round(rating);
        const stars = [];
        for (let i = 0; i < roundedRating; i++) {
            stars.push(<span key={i}>&#9733;</span>);
        }
        return stars;
    };

    return (
        <div className="product-details">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" />
                <button onClick={handleAddToCart}>Add to Cart</button>
                <p>
                    Average Rating: {generateStars(calculateAverageRating())}
                    {product.rating && product.rating.count === 0 && "This product has no ratings yet."}
                </p>
                {product.rating && product.rating.count > 0 && (
                    <div>
                        <p>Customer Comments:</p>
                        <ul>
                            {product.comments && product.comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
