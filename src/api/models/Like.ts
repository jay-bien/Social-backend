import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface LikeAttrs {
    
}


interface LikeDoc extends mongoose.Document{
   
}

interface LikeModel extends mongoose.Model< any >{

    build( attrs: LikeAttrs ): LikeDoc
}

const commentSchema = new mongoose.Schema({

})

commentSchema.statics.build = ( attrs: LikeAttrs ) => {
    return new comment( attrs );
}

const comment = mongoose.model< LikeDoc, LikeModel >('comment', commentSchema)





export { comment }