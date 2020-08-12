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
exports.logout = exports.register = exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const error_1 = __importDefault(require("../utils/error"));
exports.login = (req, res, next) => {
    passport_1.default.authenticate('login', { session: false }, (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(400).json(error_1.default(info.message));
        req.login(user, { session: false }, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                next(err);
            try {
                const token = yield user.generateAuthToken();
                res.json({ token });
            }
            catch (err) {
                next(err);
            }
        }));
    })(req, res, next);
};
exports.register = (req, res, next) => {
    passport_1.default.authenticate('register', { session: false }, (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(400).json(error_1.default(info.message));
        req.login(user, { session: false }, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                next(err);
            try {
                const token = yield user.generateAuthToken();
                res.json({ token });
            }
            catch (err) {
                next(err);
            }
        }));
    })(req, res, next);
};
exports.logout = (req, res) => {
    req.logout();
    res.json({ success: true });
};
