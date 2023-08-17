// post.js
import mongoose from "mongoose";

// Define the schema for a post
const Post = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    img: { type: String, required: true },
});

// Create a model using the defined schema
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;
