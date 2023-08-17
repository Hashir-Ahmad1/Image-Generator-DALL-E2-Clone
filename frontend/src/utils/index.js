// utils.js
import fileSaver from 'file-saver';
import { surpriseMePrompts } from "../constants";

/**
 * Get a random prompt from the surpriseMePrompts array, excluding the provided prompt.
 * @param {string} prompt - The current prompt.
 * @returns {string} - A random prompt.
 */
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
    if (prompt === randomPrompt) {
        return getRandomPrompt(prompt); // Recurse to avoid duplicate prompts.
    }
    return randomPrompt;
}

/**
 * Download an image using the FileSaver library.
 * @param {string} _id - The unique identifier of the image.
 * @param {string} img - The image data URL.
 */
export async function downloadImage(_id, img) {
    try {
        // Save the image using FileSaver.
        fileSaver.saveAs(img, `download-${_id}.jpg`);
    } catch (error) {
        console.error("Error while downloading image:", error);
    }
}
