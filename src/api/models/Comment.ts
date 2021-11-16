import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface CommentAttrs {
    
}


interface CommentDoc extends mongoose.Document{
   
}

interface CommentModel extends mongoose.Model< any >{

    build( attrs: CommentAttrs ): CommentDoc
}

const commentSchema = new mongoose.Schema({

})

commentSchema.statics.build = ( attrs: CommentAttrs ) => {
    return new comment( attrs );
}

const comment = mongoose.model< CommentDoc, CommentModel >('comment', commentSchema)





export { comment }