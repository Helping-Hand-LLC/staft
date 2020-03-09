const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

module.exports = {
    mongoUri: env.MONGO_URI,
    privateKey: env.PRIVATE_KEY,
    sessionSecret: env.SESSION_SECRET
};