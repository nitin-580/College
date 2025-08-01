import mongoose, { Schema, mongo } from "mongoose";

const ticketSchema = new Schema({
    pnr:{type:String, require:true, },
    boarding:({type:String, require:true}),
    destination:({type:String, require:true}),
    time:{type:String, require:true},
    date:{type:String, require:true},
    trainName:{type:String, require:true},
    trainNumber:{type:String, require:true},
    passengerNo:{type:Number, require:true},
    price:{type:Number, require:true},
    discount:{type:Number, require:true},
})
const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;