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
exports.deleteOrg = exports.addWorkerToOrg = exports.updateOrg = exports.createOrg = exports.getSingleOrg = exports.getAllPublicOrgs = void 0;
const lodash_1 = __importDefault(require("lodash"));
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const Organization_1 = __importDefault(require("../models/Organization"));
const Event_1 = __importDefault(require("../models/Event"));
const error_1 = __importDefault(require("../utils/error"));
exports.getAllPublicOrgs = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicOrgs = yield Organization_1.default.find({ isPrivate: false }, 'uid');
        if (lodash_1.default.isEmpty(publicOrgs))
            return res.status(404).json(error_1.default('No public organizations found'));
        return res.json({ publicOrgs });
    }
    catch (err) {
        return next(err);
    }
});
exports.getSingleOrg = (_req, res) => res.json({ org: res.locals.org });
exports.createOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, isPrivate, adminEmail } = req.body;
    try {
        let org = yield Organization_1.default.findOne({ uid });
        if (org)
            return res
                .status(400)
                .json(error_1.default('Choose a different unique identifier for your new organization'));
        const admin = yield User_1.default.findOne({ email: adminEmail });
        if (!admin)
            return res.status(404).json(error_1.default('Worker does not exist'));
        const adminProfile = yield Profile_1.default.findOne({
            user: admin.id
        });
        if (!adminProfile)
            return res
                .status(400)
                .json(error_1.default('Worker must complete profile before being added to an organization'));
        if (adminProfile.organization)
            return res
                .status(400)
                .json(error_1.default('Worker is already assigned to a different organization'));
        org = new Organization_1.default({ uid, isPrivate });
        yield org.save();
        adminProfile.isAdmin = true;
        adminProfile.isManager = true;
        adminProfile.organization = org._id;
        yield adminProfile.save();
        return res.json({
            org,
            admin: {
                email: adminEmail,
                isAdmin: adminProfile.isAdmin,
                isManager: adminProfile.isManager,
                organization: adminProfile.organization
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.updateOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, isPrivate } = req.body;
    try {
        res.locals.org.uid = uid;
        res.locals.org.isPrivate = isPrivate;
        yield res.locals.org.save();
        return res.json({ org: res.locals.org });
    }
    catch (err) {
        return next(err);
    }
});
exports.addWorkerToOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { workerEmail, access } = req.body;
    try {
        const worker = yield User_1.default.findOne({ email: workerEmail });
        if (!worker)
            return res
                .status(404)
                .json(error_1.default(`${workerEmail} is not a Staft user`));
        const workerProfile = yield Profile_1.default.findOne({
            user: worker.id
        });
        if (!workerProfile)
            return res
                .status(400)
                .json(error_1.default(`${workerEmail} must complete profile before being added to an organization`));
        if (workerProfile.organization)
            return res
                .status(400)
                .json(error_1.default(`${workerEmail} is already assigned to a different organization`));
        if (res.locals.org.isPrivate && access === 'worker')
            return res
                .status(400)
                .json(error_1.default(`Workers can join public organizations themselves. Assigning workers is reserved for private organizations only.`));
        switch (access) {
            case 'admin':
                workerProfile.isAdmin = true;
                workerProfile.isManager = true;
                break;
            case 'manager':
                workerProfile.isAdmin = false;
                workerProfile.isManager = true;
                break;
            default:
                workerProfile.isAdmin = false;
                workerProfile.isManager = false;
                break;
        }
        workerProfile.organization = res.locals.org.id;
        yield workerProfile.save();
        res.json({
            worker: {
                email: workerEmail,
                isAdmin: workerProfile.isAdmin,
                isManager: workerProfile.isManager,
                organization: workerProfile.organization
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.deleteOrg = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orgUsers = yield Profile_1.default.find({
            organization: res.locals.org.id
        });
        if (!lodash_1.default.isEmpty(orgUsers)) {
            for (let i = 0; i < orgUsers.length; i++) {
                orgUsers[i].isAdmin = false;
                orgUsers[i].isManager = false;
                orgUsers[i].organization = null;
                yield orgUsers[i].save();
            }
        }
        yield Event_1.default.deleteMany({ organization: res.locals.org.id }).catch(err => next(err));
        yield Organization_1.default.findOneAndDelete({ _id: res.locals.org.id }).catch(err => next(err));
        res.json({ success: true });
    }
    catch (err) {
        return next(err);
    }
});
