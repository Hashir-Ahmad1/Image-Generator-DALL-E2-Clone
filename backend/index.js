// index.js
import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// Load environment variables from a .env file
dotenv.config();

// Create an Express app instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Enable JSON parsing and set limit for incoming requests
app.use(express.json({ limit: '50mb' }));

// Connect frontend routes to backend API routes
app.use('/api/v1/post', postRoutes); // API for posts
app.use('/api/v1/dalle', dalleRoutes); // API for generating images with DALL-E

// Default route to welcome message
app.get('/', async (req, res) => {
    res.send('Welcome to Dalle');
});

// Start the server
const startServer = async () => {
    try {
        // Connect to the MongoDB database using the provided URL
        connectDB(process.env.MONGODB_URL);
        
        // Start the Express server on port 8080
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }
};

// Call the startServer function to initiate the server
startServer();
