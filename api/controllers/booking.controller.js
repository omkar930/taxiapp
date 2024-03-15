import { Booking } from "../models/booking.model.js"
import { errorHandler } from "../utils/errorHandler.js";


export const addBooking = async(req,res,next) =>{
    try{

        const { source_id, destination_id, cab_id, booked_time } = req.body;
        const overlappingBookings = await Booking.find({
            cab_id,
            booked_time: { $lte: new Date(booked_time) },
            $or: [
              { source_id, booked_time: { $gte: new Date(booked_time) } },
              { destination_id, booked_time: { $gte: new Date(booked_time) } }
            ]
          });
          console.log(overlappingBookings);
          if(overlappingBookings.length === 0){
            const booking = await Booking.create(req.body);
            return res.status(201).json(booking);
          }else{
            console.log("already booked");
            next(errorHandler(123,"already booked"))
          }

       
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