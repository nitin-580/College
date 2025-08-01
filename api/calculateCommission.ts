import { Response,Request} from "express";

export const calculateCommission = (cardType: string, amount: number, commissionRate: number): number => {
  if (amount <= 0 || commissionRate < 0) {
    throw new Error("Amount must be greater than 0 and commission rate cannot be negative.");
  }
  
  // Calculate the commission based on the card type and amount
  const commission = (amount * commissionRate) / 100;
  
  return commission;
}