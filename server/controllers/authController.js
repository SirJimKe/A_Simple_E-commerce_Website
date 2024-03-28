import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Signup controller
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

	res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Logout controller (not implemented yet)
export const logout = async (req, res) => {
    try {
	res.clearCookie('token');
	res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Internal server error' });
    }
};
