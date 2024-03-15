import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { Cab } from "./models/cab.model.js";
import { addCab } from "./controllers/cab.controller.js";
import cabRouter from "./routes/cab.routes.js";
import locationRouter from './routes/location.routes.js'
import bookingRouter from './routes/booking.routes.js'
import travelTimeRouter from './routes/travelTime.routes.js'
import graphRouter from './graph/graphapi.js'
import { TravelTime } from "./models/travelTime.model.js";
dotenv.config()

const app = express()
const port = 3000;

mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log('connected to MONGODB')
    }
).catch((err)=>{
    console.log(err);
})

app.use(express.json());

app.use('/api/cab',cabRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/location',locationRouter);
app.use('/api/travelt',travelTimeRouter);
app.use('/api/graph',graphRouter);

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
  