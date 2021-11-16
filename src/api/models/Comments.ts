import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface CommentAttrs {
    title: string,
    author: string,
    content: string,
    parentId: string,
    rootId: string,
    link: string
}


interface CommentDoc extends mongoose.Document{
    title: string,
    author: string,
    content: string,
    parentId: string,
    rootId: string,
    createdAt: Date,
    link: string
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
})

commentSchema.statics.build = ( attrs: CommentAttrs ) => {
    return new Comment( attrs );
}

const Comment = mongoose.model< CommentDoc, CommentModel >('Comment', commentSchema)





export { Comment }