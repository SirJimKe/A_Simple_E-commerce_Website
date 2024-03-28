import express from 'express';
import { getUserDetails } from '../controllers/userController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/user/details', authenticateUser, getUserDetails);

export default router;
