"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const access_1 = require("../middleware/access");
const checkObjectId_1 = __importDefault(require("../middleware/checkObjectId"));
const checkModel_1 = require("../middleware/checkModel");
const WorkerController = __importStar(require("../controllers/worker"));
const router = express_1.Router({ mergeParams: true });
router.get('/', checkObjectId_1.default('org_id'), checkModel_1.checkOrg, access_1.isInOrg, WorkerController.getAllOrgWorkers);
router.get('/join/me', checkObjectId_1.default('org_id'), checkModel_1.checkOrg, WorkerController.joinPublicOrg);
router.patch('/leave/me', checkObjectId_1.default('org_id'), checkModel_1.checkProfile, checkModel_1.checkOrg, access_1.isInOrg, WorkerController.leaveOrg);
exports.default = router;
