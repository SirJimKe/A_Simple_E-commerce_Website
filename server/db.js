import { MongoClient } from 'mongodb';


const uri = 'mongodb://localhost:27017';
const dbName = 'ecommerce-web';

async function connectToDatabase() {
    try {
	const client = new MongoClient(uri);
	await client.connect();
	console.log('Connected to MongoDB');
	return client.db(dbName);
    } catch (error) {
	console.error('Error connecting to MongoDB:', error);
	throw error;
    }
}

export default connectToDatabase;
