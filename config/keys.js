const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

module.exports = {
  port: env.PORT || 5000,
  mongoUri: env.MONGO_URI,
  privateKey: env.PRIVATE_KEY,
  googleApiKey: env.GOOGLE_API_KEY
};
