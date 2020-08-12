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
const location_1 = __importDefault(require("./location"));
const access_1 = require("../middleware/access");
const checkObjectId_1 = __importDefault(require("../middleware/checkObjectId"));
const validator_1 = require("../middleware/validator");
const checkModel_1 = require("../middleware/checkModel");
const EventController = __importStar(require("../controllers/event"));
const router = express_1.Router({ mergeParams: true });
router.get('/', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isManager, EventController.getAllOrgEvents);
router.get('/me', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isInOrg, EventController.getAllMyOrgEvents);
router.get('/:event_id', checkObjectId_1.default('org_id'), checkObjectId_1.default('event_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isManager, checkModel_1.checkEvent, EventController.getSingleOrgEvent);
router.get('/:event_id/me', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isInOrg, checkModel_1.checkEvent, access_1.isInEvent, EventController.getMySingleOrgEvent);
router.post('/', checkObjectId_1.default('org_id'), access_1.jwtAuth, checkModel_1.checkOrg, access_1.isManager, validator_1.createOrUpdateOrgEventRules(), validator_1.expValidate, EventController.createOrgEvent);
router.put('/:event_id', checkObjectId_1.default('org_id'), checkObjectId_1.default('event_id'), access_1.jwtAuth, checkModel_1.checkOrg, checkModel_1.checkEvent, access_1.isManager, access_1.managerIsEventCreator, validator_1.createOrUpdateOrgEventRules(), validator_1.expValidate, EventController.updateOrgEvent);
router.patch('/:event_id/add', checkObjectId_1.default('org_id'), checkObjectId_1.default('event_id'), access_1.jwtAuth, checkModel_1.checkOrg, checkModel_1.checkEvent, access_1.isManager, access_1.managerIsEventCreator, validator_1.addOrRemoveEventParticipantRules(), validator_1.expValidate, checkModel_1.checkEventParticipant, EventController.addEventParticipant);
router.delete('/:event_id/remove', checkObjectId_1.default('org_id'), checkObjectId_1.default('event_id'), access_1.jwtAuth, checkModel_1.checkOrg, checkModel_1.checkEvent, access_1.isManager, access_1.managerIsEventCreator, validator_1.addOrRemoveEventParticipantRules(), validator_1.expValidate, checkModel_1.checkEventParticipant, EventController.removeEventParticipant);
router.patch('/:event_id/me', checkObjectId_1.default('org_id'), checkObjectId_1.default('event_id'), access_1.jwtAuth, checkModel_1.checkProfile, checkModel_1.checkOrg, access_1.isInOrg, checkModel_1.checkEvent, access_1.isInEvent, validator_1.updateEventParticipantRules(), validator_1.expValidate, EventController.updateMyParticipantStatus);
router.delete('/:event_id', checkObjectId_1.default('org_id'), checkObjectId_1.default('event_id'), access_1.jwtAuth, checkModel_1.checkOrg, checkModel_1.checkEvent, access_1.isManager, access_1.managerIsEventCreator, EventController.deleteOrgEvent);
router.use('/locations', location_1.default);
exports.default = router;
