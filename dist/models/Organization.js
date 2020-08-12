"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orgSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    isPrivate: {
        type: Boolean,
        defualt: false
    }
}, { timestamps: true });
exports.default = mongoose_1.model('Organization', orgSchema);
