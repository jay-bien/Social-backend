import mongoose, { ObjectId } from 'mongoose';


import { ObjectID } from "mongodb";

interface CommentAttrs {
    author: string,
    content: string,
    parentId: string,
    rootId: string,
    likes: number,
    dislikes: number,
    created_at: number
}


interface NestedCommentDoc extends mongoose.Document{
    author: string,
    content: string,
    parentId: string,
    rootId: string,
    likes: number,
    dislikes: number,
    created_at: Date,
    sentiment: string
}

export interface NestedCommentModel extends mongoose.Model< any >{
    build( attrs: CommentAttrs ): NestedCommentDoc;
    fuzzySearch( arg: String ): [];
}

const nestedCommentSchema = new mongoose.Schema({
    author:{
        type: String,
        required: false,
        ref: "User"
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
    likes: {
        type: Number,
        required: false,
    },
    dislikes: {
        type: Number,
        required: false
    },
    created_at: {
        type: Number,
        required: true
    },
    is_deleted:{
        type: Boolean
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
          },
    }
})

nestedCommentSchema.statics.build = ( attrs: CommentAttrs ) => {
    return new NestedComment( attrs );
}




const NestedComment = mongoose.model< NestedCommentDoc, NestedCommentModel >('NestedComment', nestedCommentSchema);




export { NestedComment }