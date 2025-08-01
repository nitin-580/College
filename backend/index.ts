import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import createRoutes from './routes/createRoute';
import loginRoutes from './routes/loginRoute';
import cardRoutes from './routes/cardRoute';
import cardCommission from './routes/cardCommissionRoute'
import whatsapp from './routes/whatsapp';
import  ticketRoute  from './routes/ticketRoute';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send('Welcome to the API');
});
app.use("/api", createRoutes);
app.use("/api", loginRoutes);
app.use("/api", cardRoutes);
app.use("/api", cardCommission);
app.use("/api", whatsapp);
app.use("/api", ticketRoute);

connectDB().then(() => {
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });
});