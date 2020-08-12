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
exports.deleteOrgEvent = exports.updateMyParticipantStatus = exports.removeEventParticipant = exports.addEventParticipant = exports.updateOrgEvent = exports.createOrgEvent = exports.getMySingleOrgEvent = exports.getAllMyOrgEvents = exports.getSingleOrgEvent = exports.getAllOrgEvents = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const Event_1 = __importDefault(require("../models/Event"));
const error_1 = __importDefault(require("../utils/error"));
exports.getAllOrgEvents = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orgEvents = yield Event_1.default.find({
            organization: res.locals.org.id
        })
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
        res.json({ orgEvents });
    }
    catch (err) {
        return next(err);
    }
});
exports.getSingleOrgEvent = (_req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json({ event: res.locals.event }); });
exports.getAllMyOrgEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUser = req.user;
        const orgEvents = yield Event_1.default.find({
            organization: res.locals.org._id
        })
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
        if (lodash_1.default.isEmpty(orgEvents))
            return res
                .status(404)
                .json(error_1.default('No events found for this organization'));
        const myOrgEvents = [];
        for (let i = 0; i < orgEvents.length; i++) {
            const event = orgEvents[i];
            const participant = event.participants.find(el => el.worker._id == reqUser.id);
            if (participant)
                myOrgEvents.push(event);
        }
        res.json({ myOrgEvents });
    }
    catch (err) {
        return next(err);
    }
});
exports.getMySingleOrgEvent = (_req, res) => res.json({ event: res.locals.event });
exports.createOrgEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUser = req.user;
        const { isPublished, title, location, startDateTime, endDateTime, isRepeatEvent, repeatOptions, links } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(location))
            return res.status(400).json(error_1.default('Invalid ObjectId'));
        const event = new Event_1.default({
            organization: res.locals.org.id,
            isPublished,
            title,
            location,
            createdBy: reqUser.id,
            startDateTime,
            endDateTime,
            isRepeatEvent,
            repeatOptions,
            links
        });
        yield event.save();
        const resEvent = yield Event_1.default.findById(event._id)
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
        res.json({ event: resEvent });
    }
    catch (err) {
        return next(err);
    }
});
exports.updateOrgEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { isPublished, title, location, startDateTime, endDateTime, isRepeatEvent, repeatOptions, links } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(location))
        return res.status(400).json(error_1.default('Invalid ObjectId'));
    if (moment_1.default().isSameOrAfter(startDateTime))
        return res
            .status(400)
            .json(error_1.default('You cannot modify an event that is in progress or has already ended'));
    if (!req.header('Override-isPublished') && res.locals.event.isPublished)
        return res
            .status(400)
            .json(error_1.default('Warning: You are modifying a published event'));
    try {
        res.locals.event.isPublished = isPublished;
        res.locals.event.title = title;
        res.locals.event.location = location;
        res.locals.event.startDateTime = startDateTime;
        res.locals.event.endDateTime = endDateTime;
        res.locals.event.isRepeatEvent = isRepeatEvent;
        res.locals.event.repeatOptions = repeatOptions;
        res.locals.event.links = links;
        yield res.locals.event.save();
        res.json({
            event: res.locals.event
                .populate('organization', 'uid')
                .populate('location', '-organization')
                .populate('createdBy', 'email')
                .populate({
                path: 'participants',
                populate: {
                    path: 'worker',
                    select: 'email'
                }
            })
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.addEventParticipant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { worker } = req.body;
    if (res.locals.participant)
        return res
            .status(400)
            .json(error_1.default('Worker already assigned to this event'));
    try {
        res.locals.event.participants.push({ worker });
        yield res.locals.event.save();
        res.json({ participants: res.locals.event.participants });
    }
    catch (err) {
        return next(err);
    }
});
exports.removeEventParticipant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.participant)
        return res
            .status(400)
            .json(error_1.default('Worker is not assigned to this event'));
    let violaton = false;
    if (res.locals.participant.confirmedStatus === 'accepted')
        violaton = true;
    if (!req.header('Override-Confirmed-Participants') && violaton)
        return res
            .status(400)
            .json(error_1.default('Warning: Are you sure you wish to remove a participant who is confirmed for this event?'));
    try {
        res.locals.event.participants.id(res.locals.participant._id).remove();
        yield res.locals.event.save();
        res.json({ success: true });
    }
    catch (err) {
        return next(err);
    }
});
exports.updateMyParticipantStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmedStatus, checkedIn, checkedOut } = req.body;
    try {
        res.locals.participant.confirmedStatus = confirmedStatus;
        res.locals.participant.checkedIn = checkedIn;
        res.locals.participant.checkedOut = checkedOut;
        yield res.locals.event.save();
        res.json({ participant: res.locals.participant });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteOrgEvent = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Event_1.default.findOneAndDelete({ _id: res.locals.event.id });
        res.json({ success: true });
    }
    catch (err) {
        return next(err);
    }
});
