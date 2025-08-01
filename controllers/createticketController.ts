import { Request,Response } from "express";
import dotenv from "dotenv";
import ticketModel from "../models/ticketModel";
dotenv.config();

export const createTicket = async(req: Request, res: Response)=>{
    try{
        const {pnr, boarding, destination, date, time, price, trainName, trainNumber} = req.body;
        if(!pnr || !boarding || !destination || !date || !time || !price || !trainName || !trainNumber){
            return res.status(400).json({error: "All fields are required."});
        }
        const existingTicket = await ticketModel.findOne({pnr});
        if(existingTicket){
            return res.status(409).json({error: "Ticket with this PNR already exists."});
        }
        const newTicket = await ticketModel.create({
            pnr, boarding, destination, date, time, price, trainName, trainNumber
        });
        res.status(201).json({
            message: "User Created Successfully",
            ticket:{
               id: newTicket._id,
               pnr: newTicket.pnr,
               boarding: newTicket.boarding,
               destination: newTicket.destination,
            }
        })
    }catch(error){
        console.error("Error creating ticket:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}