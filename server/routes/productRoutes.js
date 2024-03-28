import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
} from '../controllers/productController';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/products', authenticateUser, authorizeAdmin, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', authenticateUser, authorizeAdmin, updateProductById);
router.delete('/products/:id', authenticateUser, authorizeAdmin, deleteProductById);

export default router;
