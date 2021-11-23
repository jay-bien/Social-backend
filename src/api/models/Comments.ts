import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface CommentAttrs {
    title: string,
    author: string,
    content: string,
    parentId: string,
    rootId: string,
    link: string,
    likes: number,
    dislikes: number,
}


interface CommentDoc extends mongoose.Document{
    title: string,
    author: string,
    content: string,
    parentId: string,
    rootId: string,
    createdAt: Date,
    link: string,
    likes: number,
    dislikes: number,
}

interface CommentModel extends mongoose.Model< any >{

    build( attrs: CommentAttrs ): CommentDoc
}

const commentSchema = new mongoose.Schema({
    author:{
        type: String,
        required: false
    },
    title:{
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
        type: ObjectID,
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
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
          },
    }
})

commentSchema.statics.build = ( attrs: CommentAttrs ) => {
    return new Comment( attrs );
}

const Comment = mongoose.model< CommentDoc, CommentModel >('Comment', commentSchema)





export { Comment }