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
exports.leaveOrg = exports.joinPublicOrg = exports.getAllOrgWorkers = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Profile_1 = __importDefault(require("../models/Profile"));
const error_1 = __importDefault(require("../utils/error"));
exports.getAllOrgWorkers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orgUsers = yield Profile_1.default.find({
            organization: res.locals.org.id
        });
        if (lodash_1.default.isEmpty(orgUsers))
            res.status(404).json(error_1.default('No users found for this organization'));
        return res.json({ orgUsers });
    }
    catch (err) {
        return next(err);
    }
});
exports.joinPublicOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.org.isPrivate)
        return res
            .status(400)
            .json(error_1.default('Organization is private. Request an invite from an administrator to join.'));
    try {
        const reqUser = req.user;
        const userProfile = yield Profile_1.default.findOne({
            user: reqUser.id
        });
        if (!userProfile)
            return res
                .status(400)
                .json(error_1.default('User must complete profile before joining an organization'));
        if (userProfile.organization)
            return res
                .status(400)
                .json(error_1.default('User already assigned to another organization. Leave organization before joining another.'));
        userProfile.isAdmin = false;
        userProfile.isManager = false;
        userProfile.organization = res.locals.org.id;
        yield userProfile.save();
        return res.json({ org: userProfile.organization });
    }
    catch (err) {
        return next(err);
    }
});
exports.leaveOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUser = req.user;
        let anotherAdminExists = false;
        if (res.locals.profile.isAdmin) {
            const orgUsers = yield Profile_1.default.find({
                organization: res.locals.org.id,
                user: { $ne: reqUser.id }
            });
            if (lodash_1.default.isEmpty(orgUsers))
                return res
                    .status(404)
                    .json(error_1.default('No other users found for this organization. Delete this organization to leave.'));
            for (let i = 0; i < orgUsers.length; i++) {
                if (orgUsers[i].isAdmin)
                    anotherAdminExists = true;
            }
            if (!anotherAdminExists)
                return res
                    .status(400)
                    .json(error_1.default('You are the sole admin of this organization. Assign another admin before leaving or delete this organization.'));
        }
        res.locals.profile.organization = null;
        res.locals.profile.isAdmin = false;
        res.locals.profile.isManager = false;
        yield res.locals.profile.save();
        return res.json({ success: true });
    }
    catch (err) {
        return next(err);
    }
});
