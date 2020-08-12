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
const worker_1 = __importDefault(require("./worker"));
const event_1 = __importDefault(require("./event"));
const access_1 = require("../middleware/access");
const checkObjectId_1 = __importDefault(require("../middleware/checkObjectId"));
const validator_1 = require("../middleware/validator");
const checkModel_1 = require("../middleware/checkModel");
const OrgController = __importStar(require("../controllers/organization"));
const router = express_1.Router();
router.get('/', access_1.jwtAuth, OrgController.getAllPublicOrgs);
router.get('/:org_id/me', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isInOrg, OrgController.getSingleOrg);
router.post('/', validator_1.createOrgRules(), validator_1.expValidate, OrgController.createOrg);
router.put('/:org_id', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isAdmin, validator_1.updateOrgRules(), validator_1.expValidate, OrgController.updateOrg);
router.patch('/:org_id/addWorker', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isAdmin, validator_1.addWorkerToOrgRules(), validator_1.expValidate, OrgController.addWorkerToOrg);
router.delete('/:org_id', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isAdmin, OrgController.deleteOrg);
router.use('/:org_id/workers', access_1.jwtAuth, worker_1.default);
router.use('/:org_id/events', event_1.default);
exports.default = router;
