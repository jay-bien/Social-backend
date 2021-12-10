"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var app_1 = __importDefault(require("./app"));
var PORT = process.env.PORT || 8083;
var mongo_1 = require("./api/db/mongo");
var errors_1 = require("./api/errors");
if (!process.env.JWT_KEY)
    throw new errors_1.DatabaseConnectionError('Error starting app.');
(0, mongo_1.start)();
app_1.default.listen(PORT, function () {
    console.log(" app listening on " + PORT + ".");
    return;
});
