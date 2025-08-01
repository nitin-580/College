// src/api/whatsapp.ts
import express from 'express';
import { sendWhatsApp } from '../controllers/sendWhatsappController';

const router = express.Router();

router.post('/send-whatsapp', sendWhatsApp);

export default router;
