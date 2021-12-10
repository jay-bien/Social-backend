"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_1 = require("mongodb");
var voteSchema = new mongoose_1.default.Schema({
    direction: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
        ref: "User"
    },
    comment: {
        type: mongodb_1.ObjectID,
        ref: "Post",
        required: true,
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            1;
        },
    }
});
voteSchema.statics.build = function (attrs) {
    return new Vote(attrs);
};
var Vote = mongoose_1.default.model('Vote', voteSchema);
exports.Vote = Vote;
