import bcrypt from 'bcrypt';
import User from '../models/User';
import connectToDatabase from '../db';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const db = await connectToDatabase();

        await db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
