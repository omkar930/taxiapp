import mongoose from "mongoose";

const travelTimeSchema = new mongoose.Schema({
    origin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    destination_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    travel_time: {
        type: Number,
        required: true,
    }
})

export const TravelTime = mongoose.model("TravelTime",travelTimeSchema)