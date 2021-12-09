import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface VoteAttrs {
    user: string,
    comment: string,
    direction: string
}


interface VoteDoc extends mongoose.Document{
    direction: string,
    user: string,
    comment: string,
}

interface VoteModel extends mongoose.Model< any >{

    build( attrs: VoteAttrs ): VoteDoc
}

const voteSchema = new mongoose.Schema({
    direction: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true,
        ref: "User"
    },
    comment:{
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

const Vote = mongoose.model< VoteDoc, VoteModel >('Vote', voteSchema)





export { Vote }