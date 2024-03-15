import express from 'express';
import { addBooking, getBookings } from '../controllers/booking.controller.js';

const router = express.Router();

router.post("/create",addBooking);
router.get("/get",getBookings);

export default router