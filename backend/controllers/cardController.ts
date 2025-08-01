import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const getAllCards = async (req: Request, res: Response) => {
  try {
    // Await the result of the query
    const users = await UserModel.find({}, "creditCards");

    // Flatten all credit cards into one array
    const allCards = users.flatMap(user => user.creditCards);

    res.status(200).json({ success: true, cards: allCards });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
