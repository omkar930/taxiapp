import { TravelTime } from "../models/travelTime.model.js";

export const addTravelTime = async (req,res,next) =>{
    try{
        const cab = await TravelTime.create(req.body);
         return res.status(201).json(cab);
     }catch(err){
         next(err);
    }
    
}

export const getTravelTimes = async (req,res,next) => {
    try{
        const travelTimes = await TravelTime.find({});
        return res.json(travelTimes);
    }catch(error){
        next(error);
    }
}