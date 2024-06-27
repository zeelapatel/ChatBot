import dotenv from 'dotenv';

dotenv.config();
// Export the OpenAI API key from the environment variables
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;