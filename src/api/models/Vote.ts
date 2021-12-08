import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface VoteAttrs {
    direction: string,
    user: string | null,
    post: string,
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
          },
    }
})

voteSchema.statics.build = ( attrs: VoteAttrs ) => {
    return new Like( attrs );
}

const Like = mongoose.model< VoteDoc, LikeModel >('Like', voteSchema)





export { Like }