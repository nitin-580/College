import express, { Request, Response } from 'express';
import { createTicket } from '../controllers/createticketController';
const router = express.Router();

// Define a route to create a new resource
router.post('/create-ticket',createTicket);
export default router;