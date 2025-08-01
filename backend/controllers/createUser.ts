import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age,
      email,
      password,
      phoneNumber,
      gender,
      hostelRoomNumber,
      image,
      location,
      creditCardType,
      creditCards,
      selfie,
      giftCards,
      coupons,
      money,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      age,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      hostelRoomNumber,
      image,
      location,
      creditCardType,
      creditCards,
      selfie,
      giftCards,
      coupons,
      money,
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Duplicate field value entered." });
    }
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
