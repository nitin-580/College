import express, { Request, Response } from 'express';
import { authController } from '../controllers/authController';
const router = express.Router();

// Define a route to create a new resource
router.post('/loginUser',authController);
export default router;