"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleApiKey = exports.privateKey = exports.mongoUri = exports.port = exports.nodeEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
exports.nodeEnv = String(env.NODE_ENV);
exports.port = Number(env.PORT) || 5000;
exports.mongoUri = String(env.MONGO_URI);
exports.privateKey = String(env.PRIVATE_KEY);
exports.googleApiKey = String(env.GOOGLE_API_KEY);
