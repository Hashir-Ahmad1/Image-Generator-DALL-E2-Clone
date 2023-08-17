// connect.js
import mongoose from "mongoose";

/**
 * Connect to the MongoDB database.
 * @param {string} url - The MongoDB connection URL.
 */
const connectDB = (url) => {
    // Set strict query mode
    mongoose.set('strictQuery', true);

    // Connect to the MongoDB database
    mongoose.connect(url)
        .then(() => console.log("DB is connected"))
        .catch((error) => console.log(error));
};

export default connectDB;

