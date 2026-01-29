import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // file name
    createdAt: { type: Date, default: Date.now }
});

export const Postmodel = mongoose.model("Post", PostSchema);
