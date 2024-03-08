import Review from '../models/Review';
import Product from '../models/Product';

// Controller to create a new review
export const createReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newReview = await Review.create({
            product: productId,
            user: userId,
            rating,
            comment
        });

        // Update product's comments and ratings
        product.comments.push({ user: userId, comment });
        product.ratings.push({ user: userId, rating });

        // Calculate new average rating for the product
        const totalRatings = product.ratings.length;
        const totalRatingSum = product.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        const newAverageRating = totalRatingSum / totalRatings;
        product.averageRating = newAverageRating;

        await product.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to get all reviews for a product
export const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ product: productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get a single review by ID
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update a review by ID
export const updateReviewById = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a review by ID
export const deleteReviewById = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
