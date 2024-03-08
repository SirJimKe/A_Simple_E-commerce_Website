import express from 'express';
import {
    createReview,
    getProductReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById
} from '../controllers/reviewController';


const router = express.Router();

router.post('/reviews', createReview);
router.get('/products/:productId/reviews', getProductReviews);
router.get('/reviews/:id', getReviewById);
router.put('/reviews/:id', updateReviewById);
router.delete('/reviews/:id', deleteReviewById);

export default router;
