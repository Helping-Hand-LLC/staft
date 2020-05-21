import dotenv from 'dotenv';
dotenv.config();

const env: NodeJS.ProcessEnv = process.env;

export const port = Number(env.PORT) || 5000;
export const mongoUri = String(env.MONGO_URI);
export const privateKey = String(env.PRIVATE_KEY);
export const googleApiKey = String(env.GOOGLE_API_KEY);
