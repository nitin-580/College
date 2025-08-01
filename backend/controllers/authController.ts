import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User does not exist." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Respond with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
