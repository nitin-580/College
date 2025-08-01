import express, { Request, Response } from 'express';
import { getAllCards } from '../controllers/cardController';
const router = express.Router();

// Define a route to create a new resource
router.get('/cards',getAllCards);
export default router;