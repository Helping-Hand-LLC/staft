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
const validator_1 = require("../middleware/validator");
const checkModel_1 = require("../middleware/checkModel");
const LocationController = __importStar(require("../controllers/location"));
const router = express_1.Router({ mergeParams: true });
router.get('/stored', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isManager, LocationController.getAllStoredLocations);
router.post('/query', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isManager, validator_1.queryOrgEventLocationRules(), validator_1.expValidate, LocationController.queryGoogleLocations);
router.post('/', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isManager, validator_1.createOrgEventLocationRules(), validator_1.expValidate, LocationController.createLocation);
exports.default = router;
