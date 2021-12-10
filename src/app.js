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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
require('express-async-errors');
var cookie_session_1 = __importDefault(require("cookie-session"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var routes_1 = require("./api/routes");
var constants_1 = require("./api/constants");
var error_handler_1 = require("./api/middlewares/error-handler");
var _404_1 = require("./api/errors/404");
var whitelist = ['http://localhost:3000', 'https://dap-next-jay-bien.vercel.app/'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    signed: false,
    domain: '.localhost.org:3001'
}));
app.use(constants_1.PATHS.signin, routes_1.Signin);
app.use(constants_1.PATHS.signout, routes_1.Signout);
app.use(constants_1.PATHS.signup, routes_1.Signup);
app.use(constants_1.PATHS.currentUser, routes_1.CurrentUser);
app.use(constants_1.PATHS.posts, routes_1.Posts);
app.use(constants_1.PATHS.link, routes_1.LinkPost);
app.use(constants_1.PATHS.votes, routes_1.Votes);
app.use(constants_1.PATHS.history, routes_1.History);
app.get('/history/', function () {
    console.log("history");
    return express_1.response.status(200).send({});
});
app.all('*', function () {
    console.log("404 route");
    throw new _404_1.NotFoundError();
});
app.use(error_handler_1.errorHandler);
exports.default = app;
