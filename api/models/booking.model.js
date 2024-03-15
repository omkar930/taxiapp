import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    booking_id: {
        type: String,
        required: true,
        unique: true,
    },
    user_email: {
        type: String,
        required: true
    },
    source_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    destination_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    cab_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cab",
        required: true,
    },
    booked_time: {
        type: Date,
        required: true,
    },
    estimated_time: {
        type: Number,
        required: true
    },
    estimated_cost: {
        type: Number,
        required: true,
    }
})

export const Booking = mongoose.model("Booking",bookingSchema);