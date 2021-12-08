import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface VoteAttrs {
    user:{
        type: ObjectID,
        required: true,
        ref: "User"
    },
    comment: {
        type: ObjectID,
        required: true,
        ref: "Comment"
    },
    direction: {
        type: -1 | 1,
        required: true
    }
}


interface VoteDoc extends mongoose.Document{
    direction: string,
    user: string | null,
    post: string,
}

interface LikeModel extends mongoose.Model< any >{

    build( attrs: VoteAttrs ): VoteDoc
}

const voteSchema = new mongoose.Schema({
    direction: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: false,
    },
    post:{
        type: ObjectID,
        ref: "Post",
        required: true,
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

const Vote = mongoose.model< VoteDoc, LikeModel >('vote', voteSchema)





export { Vote }