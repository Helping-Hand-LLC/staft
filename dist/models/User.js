"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Profile_1 = __importDefault(require("./Profile"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
const userSchema = new mongoose_1.Schema({
    type: {
        type: Number,
        required: true,
        default: 0,
        enum: [0, 1]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
var UserType;
(function (UserType) {
    UserType[UserType["Worker"] = 0] = "Worker";
    UserType[UserType["Client"] = 1] = "Client";
})(UserType || (UserType = {}));
const generateAuthToken = function () {
    return new Promise((resolve, reject) => {
        Profile_1.default.findOne({ user: this.id })
            .then(profile => {
            let isAdmin = false, isManager = false, organization = null;
            if (profile) {
                isAdmin = profile.isAdmin;
                isManager = profile.isManager;
                organization = profile.organization;
            }
            const userJwtPayload = {
                id: this.id,
                isAdmin,
                isManager,
                organization,
                expiresIn: '2 days'
            };
            const cb = (err, token) => {
                if (err)
                    reject(err);
                resolve(token);
            };
            jsonwebtoken_1.default.sign({ user: userJwtPayload }, keys_1.privateKey, cb);
        })
            .catch(err => reject(err));
    });
};
userSchema.methods.generateAuthToken = generateAuthToken;
exports.default = mongoose_1.model('User', userSchema);
