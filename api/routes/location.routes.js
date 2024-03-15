import express from "express";
import { addLocation, deleteLocation, getLocations } from "../controllers/location.controller.js";


const router = express.Router();


router.post("/create",addLocation);
router.get("/get",getLocations)
router.get("/delete",deleteLocation);

export default router;