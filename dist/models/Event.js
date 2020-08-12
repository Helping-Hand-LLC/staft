"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    title: String,
    location: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    isRepeatEvent: {
        type: Boolean,
        default: false
    },
    repeatOptions: {
        daysOfWeek: {
            type: [String],
            default: []
        },
        frequency: {
            value: Number,
            multiplier: {
                type: String,
                enum: ['weeks', 'months', 'years']
            }
        },
        ends: Date
    },
    participants: [
        {
            worker: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            },
            confirmedStatus: {
                type: String,
                default: 'unconfirmed',
                enum: ['unconfirmed', 'accepted', 'rejected']
            },
            checkedIn: {
                status: {
                    type: Boolean,
                    default: false
                },
                datetime: Date
            },
            checkedOut: {
                status: {
                    type: Boolean,
                    default: false
                },
                datetime: Date
            }
        }
    ],
    links: [String]
}, { timestamps: true });
exports.default = mongoose_1.model('Event', eventSchema);
