import { Booking } from "../models/booking.model.js"


export const addBooking = async(req,res,next) =>{
    try{
        const booking = await Booking.create(req.body);
        return res.status(201).json(booking);
    }catch(err){
        next(err);
    }
}

export const getBookings = async(req,res,next) => {
    try{
        const bookings = await Booking.find({});
        return res.json(bookings);
    }catch(error){
        next(error)
    }
}