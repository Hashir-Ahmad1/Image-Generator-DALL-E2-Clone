// postsRoutes.js
import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongoDB/models/post.js';

dotenv.config();

// Create a new Express router instance
const router = express.Router();

// Configure Cloudinary using the provided environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY,
});

// Route to get all posts
router.route('/').get(async (req, res) => {
    try {
        // Fetch all posts from the database
        const Posts = await Post.find({});
        res.status(200).json({ success: true, data: Posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// Route to create a new post
router.route('/').post(async (req, res) => {
    try {
        // Extract data from the request body
        const { name, prompt, img } = req.body;

        // Upload the image to Cloudinary and get the image URL
        const imgURL = await cloudinary.uploader.upload(img);

        // Create a new post in the database
        const newPost = await Post.create({
            name,
            prompt,
            img: imgURL.url,
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// Export the router to be used in other parts of the application
export default router;
