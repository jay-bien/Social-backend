"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var linkSchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: true
    },
    metadata: {
        type: Object,
        required: true
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
});
linkSchema.statics.build = function (attrs) {
    return new Link(attrs);
};
var Link = mongoose_1.default.model('Link', linkSchema);
exports.Link = Link;
