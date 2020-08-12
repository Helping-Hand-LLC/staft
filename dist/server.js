"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const keys_1 = require("./config/keys");
app_1.default.listen(keys_1.port, () => console.log(`express server listening on port ${keys_1.port}...`));
