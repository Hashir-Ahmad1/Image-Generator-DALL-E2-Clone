// dalleRoutes.js
import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

// Create a new Express router instance
const router = express.Router();

// Configure the OpenAI API client with the provided API key from environment variables
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Initialize the OpenAI API client using the configured settings
var openai = new OpenAIApi(configuration);

// Define a POST route to generate an image using DALL-E
router.route('/').post(async (req, res) => {
    try {
        // Extract the prompt from the request body
        const { prompt } = req.body;

        // Request DALL-E to generate an image based on the provided prompt
        const aiResponse = await openai.createImage({
            prompt,
            n: 1, // Generate a single image
            size: '1024x1024', // Image size
            response_format: 'b64_json', // Response format is base64-encoded JSON
        });

        // Extract the generated image data from the API response
        const image = aiResponse.data.data[0].b64_json;

        // Respond with the generated image data
        res.status(200).json({ photo: image });
    } catch (error) {
        // Handle errors by sending an appropriate error response
        res.status(500).send(error?.response.data.error.message);
    }
});

// Export the router to be used in other parts of the application
export default router;
