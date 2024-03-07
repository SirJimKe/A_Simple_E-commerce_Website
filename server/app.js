import connectToDatabase from './db';


async function startServer() {
    try {
	const db = await connectToDatabase();




	process.on('SIGINT', async () => {
	    console.log('Closing MongoDB connection');
	    await db.client.close();
	    process.exit();
	});

    } catch (error) {
	console.error('Error starting server:', error);
    }
}

startServer();
