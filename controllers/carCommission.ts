// src/controllers/cardCommissionController.ts
import { Request, Response } from 'express';
import UserModel from '../models/userModel';

export const setCommission = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Set commission for each credit card if totalLimit is present
    user.creditCards.forEach((card: any) => {
      if (card.discount && card.discount > 0) {
        card.commission = {
          platform: +(card.discount * 0.05).toFixed(2),
          cardOwner: +(card.discount * 0.30).toFixed(2),
          cardUser: +(card.discount * 0.65).toFixed(2),
          gst: +(card.discount * 0.18).toFixed(2),
        };
      } else {
        card.commission = {
          platform: 0,
          cardOwner: 0,
          cardUser: 0,
        };
      }
    });

    await user.save();

    return res.status(200).json({
      message: 'Commission calculated for all cards',
      creditCards: user.creditCards.map((card: any) => ({
        cardId: card._id,
        type: card.type,
        totalLimit: card.totalLimit,
        commission: card.commission,
      })),
    });
  } catch (error) {
    console.error('Error setting commission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
