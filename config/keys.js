const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

module.exports = {
    mongoUri: env.MONGO_URI
};