"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_1 = require("mongodb");
var commentSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    parentId: {
        type: String,
        required: false
    },
    rootId: {
        type: String,
        required: false,
    },
    link: {
        type: mongodb_1.ObjectID,
        required: false,
        ref: "Link"
    },
    likes: {
        type: Number,
        required: false,
    },
    dislikes: {
        type: Number,
        required: false
    },
    categories: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
    },
    type: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
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
commentSchema.statics.build = function (attrs) {
    return new Comment(attrs);
};
var Comment = mongoose_1.default.model('Comment', commentSchema);
exports.Comment = Comment;
