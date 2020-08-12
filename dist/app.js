"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const db_1 = __importDefault(require("./config/db"));
const path_1 = __importDefault(require("path"));
const keys_1 = require("./config/keys");
const access_1 = require("./middleware/access");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const organization_1 = __importDefault(require("./routes/organization"));
const app = express_1.default();
db_1.default();
require("./middleware/passport");
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use('/auth', auth_1.default);
app.use('/user', access_1.jwtAuth, user_1.default);
app.use('/org', organization_1.default);
if (keys_1.nodeEnv === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', (_req, res) => res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html')));
}
exports.default = app;
