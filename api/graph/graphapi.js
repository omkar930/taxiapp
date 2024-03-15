import { TravelTime } from "../models/travelTime.model.js";
import express from "express";
import Graph from "./graph.js";
import { Location } from "../models/location.model.js";
import { Path } from "../models/paths.model.js";


const generateShortestPath = async (req,res,next) => {
    const graph = new Graph();
    try{
        const locations = await Location.find({});
        const travelTimedata = await TravelTime.find({});

        locations.forEach((obj)=>{
            graph.addVertex(obj._id);
        })
        travelTimedata.forEach((obj)=>{
            graph.addEdge(obj.origin_id,obj.destination_id,obj.travel_time);
        })
        await Path.deleteMany({});
        locations.forEach((obj)=>{
            const paths = graph.dijkstra(obj._id);
            Path.create({
                "location": obj._id,
                "paths": paths,
            })
        })
        res.status(200).send("everyting went well")
        
    }catch(error){
        next(error);
    }
   
}

const getDistance = async (req,res,next)=>{
    try{
        const source = req.query.source;
        const dest= req.query.dest;
        const distances = await Path.find({location: {$eq: source}});
        const finalDistance= distances[0].paths.get(dest);
        return res.status(200).json(finalDistance);
    }catch(error){
        next(error);
    }
   

}




const router = express.Router();

router.get("/update",generateShortestPath);
router.get("/distance",getDistance);

export default router;