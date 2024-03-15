import { Location } from "../models/location.model.js";
import { TravelTime } from "../models/travelTime.model.js";

export const addLocation = async (req,res,next) =>{
    try{
        const location = await Location.create(req.body);
         return res.status(201).json(location);
     }catch(err){
         next(err);
    }
    
}

export const getLocations = async (req,res,next) => {
    try{
        const locations = await Location.find({});
        return res.status(200).json(locations);
    }catch(error){
        next(error);
    }
}

export const deleteLocation = async(req,res,next)=>{
    try{
        const location = await Location.deleteOne({_id: req.query.id});
        await TravelTime.deleteOne({origin_id: req.query.id });
        await TravelTime.deleteOne({destination_id: req.query.id });
        return res.status(200).json(location);
    }catch(error){
        next(error);
    }
}