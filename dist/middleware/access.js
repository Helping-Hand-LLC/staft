"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInEvent = exports.isInOrg = exports.managerIsEventCreator = exports.isManager = exports.isAdmin = exports.jwtAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const error_1 = __importDefault(require("../utils/error"));
exports.jwtAuth = passport_1.default.authenticate('jwt', { session: false });
exports.isAdmin = (req, res, next) => {
    const user = req.user;
    const org = res.locals.org;
    if (!user.isAdmin || user.organization != org._id)
        return res.status(403).json(error_1.default('Access denied'));
    return next();
};
exports.isManager = (req, res, next) => {
    const user = req.user;
    const org = res.locals.org;
    if (!user.isManager || user.organization != org._id)
        return res.status(403).json(error_1.default('Access denied'));
    return next();
};
exports.managerIsEventCreator = (req, res, next) => {
    const user = req.user;
    const event = res.locals.event;
    if (!req.header('Override-createdBy') && event.createdBy._id != user.id)
        return res
            .status(403)
            .json(error_1.default('Access Denied: You are not the creator of this event'));
    return next();
};
exports.isInOrg = (req, res, next) => {
    const user = req.user;
    const org = res.locals.org;
    if (user.organization != org._id)
        return res.status(403).json(error_1.default('Access denied'));
    return next();
};
exports.isInEvent = (req, res, next) => {
    const user = req.user;
    const event = res.locals.event;
    const participant = event.participants.find(el => el.worker == user.id);
    if (!participant)
        return res.status(400).json(error_1.default('Access denied'));
    res.locals.participant = participant;
    return next();
};
