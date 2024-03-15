import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    location_id:{
        type: String,
        unique: true,
        required: true,
    },
    name:{
        type: String,
        required: true
    }
})

export const Location = mongoose.model("Location",locationSchema);