import mongoose from "mongoose"

export const pathSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
        unique: true,
    },
    paths: {
        type: Map,
        of: Number,
        required:true,
    }
},{timestamps: true})

export const Path = mongoose.model("Path",pathSchema)