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

export const deleteTravelTime = async(req,res,next)=>{
    try{
        console.log(req.query.id);
        const travelTime = await TravelTime.deleteOne({_id: req.query.id });
        return res.status(200).json(travelTime);
    }catch(error){
        next(error);
    }
}