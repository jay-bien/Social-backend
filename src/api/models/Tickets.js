"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_1 = require("mongodb");
var ticketSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        isRequired: true
    },
    price: {
        type: String,
        isRequired: true
    },
    created_by: {
        type: mongodb_1.ObjectID,
        isRequired: true
    },
    owned_by: {
        type: Number,
        isRequired: false
    },
    event_id: {
        type: Number,
        isRequired: false
    },
    date_purchased: {
        type: Date,
    },
    resolved: {
        type: Number
    },
    deadline: {
        type: Date
    },
    recurring: {
        type: Boolean,
    },
    recur_interval: {
        type: String,
    },
    status_id: {
        type: Number,
    }
});
ticketSchema.statics.build = function (attrs) {
    return new Ticket(attrs);
};
var Ticket = mongoose_1.default.model('Ticket', ticketSchema);
exports.Ticket = Ticket;
