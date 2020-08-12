"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = __importDefault(require("../utils/error"));
const checkObjectId = idToCheck => (req, res, next) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params[idToCheck]))
        return res.status(400).json(error_1.default('Invalid ObjectId'));
    return next();
};
exports.default = checkObjectId;
