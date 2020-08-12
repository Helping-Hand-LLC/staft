"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expValidate = exports.createOrgEventLocationRules = exports.queryOrgEventLocationRules = exports.updateEventParticipantRules = exports.addOrRemoveEventParticipantRules = exports.createOrUpdateOrgEventRules = exports.addWorkerToOrgRules = exports.updateOrgRules = exports.createOrgRules = exports.createOrUpdateProfileRules = exports.registerRules = exports.loginRules = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const express_validator_1 = require("express-validator");
exports.loginRules = () => {
    return [
        express_validator_1.check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
        express_validator_1.check('password', 'Password is required').notEmpty().escape()
    ];
};
exports.registerRules = () => {
    return [
        express_validator_1.check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
        express_validator_1.check('password', 'Password must be at least 6 characters')
            .escape()
            .isLength({ min: 6 }),
        express_validator_1.check('passwordConfirm', 'Password confirmation is required')
            .notEmpty()
            .escape()
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    ];
};
exports.createOrUpdateProfileRules = () => {
    return [
        express_validator_1.check('name', 'Name is required').escape().notEmpty(),
        express_validator_1.check('address.street', 'Street address is required').notEmpty().escape(),
        express_validator_1.check('address.city', 'City is required').notEmpty().escape(),
        express_validator_1.check('address.state', 'State is required').notEmpty().escape(),
        express_validator_1.check('address.zip', 'Zip code is required').notEmpty().escape(),
        express_validator_1.check('phone', 'Please enter a valid phone number')
            .notEmpty()
            .isMobilePhone('any'),
        express_validator_1.check('birthday', 'Birthday is required').notEmpty().toDate(),
        express_validator_1.check('gender', 'Gender is required').notEmpty().isIn([0, 1]),
        express_validator_1.check('ssn', 'Social Security Number is required')
            .escape()
            .isLength({ min: 9, max: 9 })
            .isNumeric()
    ];
};
exports.createOrgRules = () => {
    return [
        express_validator_1.check('uid', 'uid is required and must have at least 4 characters')
            .escape()
            .isLength({ min: 4 })
            .custom(value => {
            if (value.indexOf(' ') >= 0) {
                throw new Error('uid cannot contain whitespace (must be all one word)');
            }
            return true;
        }),
        express_validator_1.check('isPrivate').toBoolean(),
        express_validator_1.check('adminEmail', 'Please enter a valid administrator email')
            .isEmail()
            .normalizeEmail()
    ];
};
exports.updateOrgRules = () => {
    return [
        express_validator_1.check('uid', 'uid must have at least 4 characters')
            .escape()
            .isLength({ min: 4 })
            .custom(value => {
            if (value.indexOf(' ') >= 0) {
                throw new Error('uid cannot contain whitespace (must be all one word)');
            }
            return true;
        }),
        express_validator_1.check('isPrivate').toBoolean()
    ];
};
exports.addWorkerToOrgRules = () => {
    return [
        express_validator_1.check('workerEmail', 'Please enter a valid email for this worker')
            .isEmail()
            .normalizeEmail(),
        express_validator_1.check('access', 'Please enter a valid access level for this worker')
            .escape()
            .isIn(['admin', 'manager', 'worker'])
    ];
};
exports.createOrUpdateOrgEventRules = () => {
    return [
        express_validator_1.check('isPublished').toBoolean(),
        express_validator_1.check('title').escape(),
        express_validator_1.check('location', 'Location is required').notEmpty(),
        express_validator_1.check('startDateTime')
            .toDate()
            .custom((value, { req }) => {
            if (value && moment_1.default(value).isSameOrAfter(req.body.endDateTime)) {
                throw new Error('Start date cannot be equal or after end date');
            }
            return true;
        }),
        express_validator_1.check('endDateTime')
            .toDate()
            .custom((value, { req }) => {
            if (value && moment_1.default(value).isSameOrBefore(req.body.startDateTime)) {
                throw new Error('End date cannot be equal or before start date');
            }
            return true;
        }),
        express_validator_1.check('isRepeatEvent').toBoolean(),
        express_validator_1.check('repeatOptions.daysOfWeek.*')
            .escape()
            .isIn(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
        express_validator_1.check('repeatOptions.frequency.value').optional().isInt(),
        express_validator_1.check('repeatOptions.frequency.multiplier')
            .escape()
            .optional()
            .isIn(['weeks', 'months', 'years']),
        express_validator_1.check('repeatOptions.ends')
            .toDate()
            .custom((value, { req }) => {
            if (value && moment_1.default(value).isSameOrBefore(req.body.startDateTime)) {
                throw new Error('Repeat end date cannot be equal or before start date');
            }
            return true;
        }),
        express_validator_1.check('links').isArray().optional(),
        express_validator_1.check('links.*', 'Ensure all links are valid URLs').escape().isURL()
    ];
};
exports.addOrRemoveEventParticipantRules = () => {
    return [
        express_validator_1.check('worker', 'Worker is required')
            .notEmpty()
            .escape()
            .custom(value => {
            if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid ObjectId');
            }
            return true;
        })
    ];
};
exports.updateEventParticipantRules = () => {
    return [
        express_validator_1.check('confirmedStatus')
            .escape()
            .isIn(['unconfirmed', 'accepted', 'rejected']),
        express_validator_1.check('checkedIn.status').toBoolean(),
        express_validator_1.check('checkedIn.datetime').optional().toDate(),
        express_validator_1.check('checkedOut.status').toBoolean(),
        express_validator_1.check('checkedOut.datetime').optional().toDate()
    ];
};
exports.queryOrgEventLocationRules = () => {
    return [
        express_validator_1.check('query', 'location search term is required').notEmpty().escape()
    ];
};
exports.createOrgEventLocationRules = () => {
    return [
        express_validator_1.check('formatted_address', 'Formatted address is required')
            .notEmpty()
            .escape(),
        express_validator_1.check('location.*').isDecimal(),
        express_validator_1.check('icon').escape(),
        express_validator_1.check('name', 'Event location name is required').notEmpty().escape(),
        express_validator_1.check('place_id', 'Place ID is required').notEmpty().escape()
    ];
};
exports.expValidate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
};
