import express, { Request, Response } from 'express';
import { createUser } from '../controllers/createUser';
const router = express.Router();

// Define a route to create a new resource
router.post('/createUser',createUser);
export default router;