import { Location } from "../models/location.model.js";

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
        console.log("deleteoi");
        const location = await Location.deleteOne({location_id: req.query.id});
        return res.status(200).json(location);
    }catch(error){
        next(error);
    }
}