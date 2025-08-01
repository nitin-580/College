// src/controllers/sendWhatsapp.ts
import { Request, Response } from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export const sendWhatsApp = async (req: Request, res: Response) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Recipient number and message are required.' });
  }

  try {
    const response = await client.messages.create({
      from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
      to: 'whatsapp:' + to,
      body: message,
    });

    res.status(200).json({
      message: 'WhatsApp message sent successfully!',
      sid: response.sid,
    });
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    res.status(500).json({ error: 'Failed to send WhatsApp message' });
  }
};
