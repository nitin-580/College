import mongoose, { Schema, model, Document } from 'mongoose';

interface GiftCard {
  id: string;
  amount: number;
}

interface Coupon {
  code: string;
  discount: number;
}
interface ICreditCard {
    _id: mongoose.Types.ObjectId;
    type: string;
    limit: number;
    commissionRate: number;
    totalLimit?: number;
    commission?: {
      platform: number;
      cardOwner: number;
      cardUser: number;
    };
  }
  
const creditCardSchema = new mongoose.Schema({
    type: { type: String, required: true },
    limit: { type: Number, required: true },
    commissionRate: { type: Number, required: true }, // in percent
  });

export interface IUser extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  hostelRoomNumber: string;
  image: string;
  location: string;
  creditCardType: 'Visa' | 'MasterCard' | 'American Express' | 'Discover';
  creditCards: ICreditCard[];
  selfie: string;
  giftCards: GiftCard[];
  coupons: Coupon[];
  money: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email:{type:String ,required:true,unique:true},
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  hostelRoomNumber: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  creditCardType: {
    type: String,
    enum: ['Visa', 'MasterCard', 'American Express', 'Discover'],
    required: true,
  },
  creditCards:[
    {
        type: creditCardSchema,
        _id: false, // Disable automatic _id generation for subdocuments
        required: true,
        limit: { type: Number, required: true },
        commissionRate: { type: Number, required: true }, // in percent
        totalLimit: { type: Number, default: 0 },
        commission: {
          platform: { type: Number, default: 0 },
          cardOwner: { type: Number, default: 0 },
          cardUser: { type: Number, default: 0 },
        },
    }
  ],
  selfie: { type: String, required: true },
  giftCards: [
    {
      id: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  coupons: [
    {
      code: { type: String, required: true },
      discount: { type: Number, required: true },
    },
  ],
  money: { type: Number, required: true },
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
