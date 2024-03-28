import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './db';
import authRoutes from './routes/auth';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

async function startServer() {
    const app = express();

    app.use(express.json());
    try {
	const db = await connectToDatabase();

	app.use('/auth', authRoutes);
	app.use('/api', productRoutes);
	app.use('/api', reviewRoutes);
	app.use('/api', userRoutes);

	process.on('SIGINT', async () => {
	    console.log('Closing MongoDB connection');
	    await db.client.close();
	    process.exit();
	});

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
	    console.log(`Server running on port ${PORT}`);
	});

    } catch (error) {
	console.error('Error starting server:', error);
    }
}

startServer();
