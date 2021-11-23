import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";



interface VoteAttrs {
    author: {
        type: ObjectID,
        ref: "User",
        required: true
    },
    commentId: {
        required: true,
        type: ObjectID,
        direction: 1 | -1
    }

    

    
}


interface VoteDoc extends mongoose.Document{
   
}

interface VoteModel extends mongoose.Model< any >{

    build( attrs: VoteAttrs ): VoteDoc
}

const voteSchema = new mongoose.Schema({

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
          },
    }
})

voteSchema.statics.build = ( attrs: VoteAttrs ) => {
    return new Vote( attrs );
}

const Vote = mongoose.model< VoteDoc, VoteModel >('Vote', voteSchema)





export { Vote }