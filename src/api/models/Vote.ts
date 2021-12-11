import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface VoteAttrs {
    author: string,
    commentId: string,
    direction: string,
    created_at: number
}


interface VoteDoc extends mongoose.Document{
    direction: string,
    author: string,
    commentId: string,
    created_at: number
}

interface VoteModel extends mongoose.Model< any >{

    build( attrs: VoteAttrs ): VoteDoc
}

const voteSchema = new mongoose.Schema({
    direction: {
        type: String,
        required: true
    },
    author:{
        type: ObjectID,
        required: true,
        ref: "User"
    },
    commentId:{
        type: ObjectID,
        ref: "Post",
        required: true,
    },
    created_at:{
        type: Number,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
1          },
    }
})

voteSchema.statics.build = ( attrs: VoteAttrs ) => {
    return new Vote( attrs );
}

const Vote = mongoose.model< VoteDoc, VoteModel >('Vote', voteSchema)





export { Vote }