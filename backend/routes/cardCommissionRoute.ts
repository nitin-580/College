// src/api/cardCommission.ts
import express from 'express';
import { setCommission } from '../controllers/carCommission';

const router = express.Router();

// POST /api/card/commission
router.post('/commission', setCommission);

export default router;
