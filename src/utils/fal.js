import { fal } from '@fal-ai/client';

// Configure the client with the API key from environment variables
// Note: In a production app, you should use a proxy to keep the key secret.
// For local development, this is acceptable.
fal.config({
    credentials: import.meta.env.VITE_FAL_KEY,
});

/**
 * Generates an image using Flux.1 Schnell on Fal.ai
 * @param {string} prompt - The image description
 * @returns {Promise<string>} - The URL of the generated image
 */
export const generateImage = async (prompt) => {
    try {
        const result = await fal.subscribe('fal-ai/flux/schnell', {
            input: {
                prompt: prompt,
                image_size: 'square_hd', // or 'square'
                enable_safety_checker: true,
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === 'IN_PROGRESS') {
                    console.log(update.logs.map((log) => log.message).join('\n'));
                }
            },
        });

        if (result.data && result.data.images && result.data.images.length > 0) {
            return result.data.images[0].url;
        }

        throw new Error('No image returned');
    } catch (error) {
        console.error('Fal.ai generation error:', error);
        throw error;
    }
};
