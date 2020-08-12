"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    formatted_address: {
        type: String,
        required: true
    },
    geometry: {
        location: {
            lat: Number,
            lng: Number
        }
    },
    icon: String,
    name: {
        type: String,
        required: true
    },
    place_id: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('Location', locationSchema);
