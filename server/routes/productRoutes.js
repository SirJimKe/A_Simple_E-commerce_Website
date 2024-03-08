import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
} from '../controllers/productController';


const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById)

export default router;
