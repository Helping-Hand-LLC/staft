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
exports.checkEventParticipant = exports.checkEvent = exports.checkOrg = exports.checkProfile = exports.checkUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const Organization_1 = __importDefault(require("../models/Organization"));
const Event_1 = __importDefault(require("../models/Event"));
const error_1 = __importDefault(require("../utils/error"));
exports.checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    try {
        const user = yield User_1.default.findById(reqUser.id, '-password');
        if (!user)
            return res.status(404).json(error_1.default('User does not exist'));
        res.locals.user = user;
        return next();
    }
    catch (err) {
        next(err);
    }
});
exports.checkProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    try {
        const profile = yield Profile_1.default.findOne({ user: reqUser.id })
            .populate('user', ['type', 'email'])
            .populate('organization', 'uid');
        if (!profile)
            return res
                .status(404)
                .json(error_1.default('Profile could not be found for this user'));
        res.locals.profile = profile;
        return next();
    }
    catch (err) {
        next(err);
    }
});
exports.checkOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const org = yield Organization_1.default.findById(req.params.org_id);
        if (!org)
            return res.status(404).json(error_1.default('Organization does not exist'));
        res.locals.org = org;
        return next();
    }
    catch (err) {
        next(err);
    }
});
exports.checkEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findById(req.params.event_id)
            .populate('organization', 'uid')
            .populate('location', '-organization')
            .populate('createdBy', 'email')
            .populate({
            path: 'participants',
            populate: {
                path: 'worker',
                select: 'email'
            }
        });
        if (!event)
            return res.status(404).json(error_1.default('Event does not exist'));
        res.locals.event = event;
        return next();
    }
    catch (err) {
        next(err);
    }
});
exports.checkEventParticipant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { worker } = req.body;
    try {
        const existingWorker = yield User_1.default.findById(worker);
        if (!existingWorker)
            return res.status(404).json(error_1.default('Worker does not exist'));
        const workerProfile = yield Profile_1.default.findOne({ user: worker });
        if (!workerProfile)
            return res
                .status(400)
                .json(error_1.default('Worker must complete profile before being assigned/removed from an event'));
        const org = res.locals.org;
        if (String(workerProfile.organization) != String(org._id))
            return res
                .status(400)
                .json(error_1.default('Worker does not belong to this organization'));
        const event = res.locals.event;
        const participant = event.participants.find(el => el.worker == worker);
        res.locals.worker = existingWorker;
        res.locals.participant = participant;
        return next();
    }
    catch (err) {
        next(err);
    }
});
