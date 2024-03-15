import mongoose from "mongoose";

const cabSchema = new mongoose.Schema({
    cab_number:{
        type: String,
        required: true,
        unique: true,
    },
    type:{
        type: String
    },
    price_per_minute:{
        type: Number,
        required: true,
    }
})

export const Cab = mongoose.model("Cab",cabSchema);