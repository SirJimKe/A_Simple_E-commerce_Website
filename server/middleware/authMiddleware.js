import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const { userId, role } = decoded;
        req.user = { id: userId, role };
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};

export const authorizeAdmin = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only admin users are allowed' });
        }

        next();
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
