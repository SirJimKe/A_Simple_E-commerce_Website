import Product from '../models/Product';
import Review from '../models/Review';

// Create new product controller
export const createProduct = async (req, res) => {
    try {
	const newProduct = await Product.create(req.body);
	res.status(201).json(newProduct);
    } catch (error) {
	res.status(400).json({ message: error.message });
    }
};

// Get all products controller
export const getProducts = async (req, res) => {
    try {
	const products = await Product.find();
	res.status(200).json(products);
    } catch (error) {
	res.status(500).json({ message: error.message });
    }
};

// Get single product by id controller
export const getProductById = async (req, res) => {
    try {
	const product = await Product.findById(req.params.id);
	if (!product) {
	    return res.status(404).json({
		message: 'Product not found'
	    });
	}
	res.status(200).json(product);
    } catch (error) {
	res.status(500).json({
	    message: error.message
	});
    }
};

// Controller to update a product by ID
export const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a product by ID
export const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

	await Review.deleteMany({ product: deletedProduct._id });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
