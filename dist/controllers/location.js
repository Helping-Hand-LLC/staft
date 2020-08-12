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
exports.createLocation = exports.queryGoogleLocations = exports.getAllStoredLocations = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Location_1 = __importDefault(require("../models/Location"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const keys_1 = require("../config/keys");
const error_1 = __importDefault(require("../utils/error"));
const client = new google_maps_services_js_1.Client({});
exports.getAllStoredLocations = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield Location_1.default.find({
            organization: res.locals.org.id
        });
        if (lodash_1.default.isEmpty(locations))
            return res.status(404).json(error_1.default('No locations found'));
        res.json({ locations });
    }
    catch (err) {
        return next(err);
    }
});
exports.queryGoogleLocations = (req, res, next) => {
    const { query } = req.body;
    client
        .textSearch({
        params: {
            key: keys_1.googleApiKey,
            query
        }
    })
        .then(r => {
        if (r.data.status === google_maps_services_js_1.Status.OK) {
            const response = [];
            for (let i = 0; i < r.data.results.length; i++) {
                const { formatted_address, geometry, icon, name, place_id } = r.data.results[i];
                response.push({
                    formatted_address,
                    location: geometry === null || geometry === void 0 ? void 0 : geometry.location,
                    icon,
                    name,
                    place_id
                });
            }
            return res.json({ response });
        }
        return res
            .status(500)
            .json(error_1.default(`Something went wrong searching for: ${query}`));
    })
        .catch(err => next(err));
};
exports.createLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { formatted_address, location, icon, name, place_id } = req.body;
    try {
        let existingLocation = yield Location_1.default.findOne({ place_id });
        if (existingLocation)
            return res.status(400).json(error_1.default('Location already exists'));
        existingLocation = new Location_1.default({
            organization: res.locals.org.id,
            formatted_address,
            geometry: location,
            icon,
            name,
            place_id
        });
        yield existingLocation.save();
        return res.json({ location: existingLocation });
    }
    catch (err) {
        return next(err);
    }
});
