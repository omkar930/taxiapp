import express from "express";
import { addTravelTime,deleteTravelTime,getTravelTimes } from "../controllers/travelTIme.controller.js";



const router = express.Router();


router.post("/create",addTravelTime);
router.get("/get",getTravelTimes);
router.get("/delete",deleteTravelTime);

export default router;