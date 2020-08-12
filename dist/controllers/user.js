"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAndProfile = exports.createOrUpdateProfile = exports.getUserProfile = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
exports.getUser = (_req, res) => res.json({ user: res.locals.user });
exports.getUserProfile = (_req, res) => res.json({ populated: res.locals.profile });
exports.createOrUpdateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { organization } = req.body;
    const { name, address, phone, birthday, gender, ssn } = req.body;
    if (!organization)
        organization = null;
    try {
        const reqUser = req.user;
        const profile = yield Profile_1.default.findOneAndUpdate({ user: reqUser.id }, {
            $set: {
                user: reqUser.id,
                organization,
                name,
                address,
                phone,
                birthday,
                gender,
                ssn
            }
        }, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        });
        return res.json({ profile });
    }
    catch (err) {
        return next(err);
    }
});
exports.deleteUserAndProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    try {
        yield Profile_1.default.findOneAndDelete({ user: reqUser.id });
        yield User_1.default.findOneAndDelete({ _id: reqUser.id });
        return res.json({ success: true });
    }
    catch (err) {
        return next(err);
    }
});
