import express from "express";
import { addTravelTime,getTravelTimes } from "../controllers/travelTIme.controller.js";



const router = express.Router();


router.post("/create",addTravelTime);
router.get("/get",getTravelTimes);

export default router;