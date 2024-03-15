import { Cab } from "../models/cab.model.js";

export const addCab = async (req,res,next)=>{
    try{
       const cab = await Cab.create(req.body);
        return res.status(201).json(cab);
    }catch(err){
        next(err);
    }
}
export const getCabs = async (req,res,next)=>{
    try{
        const cabs = await Cab.find({});
        return res.status(200).json(cabs)
    }catch(error){
        next(error);
    }
}
export const deleteCab = async (req,res,next)=>{
    try{
        console.log(req.query.id);
        const cab = await Cab.deleteOne({_id: req.query.id});
        return res.status(200).json(cab);
    }catch(error){
        next(error);
    }

}