import express from 'express';
import { addCab, deleteCab, getCabs } from '../controllers/cab.controller.js';

const router = express.Router();

router.post("/create",addCab);
router.get("/get",getCabs);
router.get("/delete",deleteCab);

export default router;