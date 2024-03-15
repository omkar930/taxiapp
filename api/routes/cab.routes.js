import express from 'express';
import { addCab, getCabs } from '../controllers/cab.controller.js';

const router = express.Router();

router.post("/create",addCab);
router.get("/get",getCabs);

export default router;