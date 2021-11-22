import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface LikeAttrs {
    direction: string,
    user: string | null,
    post: string,
}


interface LikeDoc extends mongoose.Document{
    direction: string,
    user: string | null,
    post: string,
}

interface LikeModel extends mongoose.Model< any >{

    build( attrs: LikeAttrs ): LikeDoc
}

const likeSchema = new mongoose.Schema({
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
})

likeSchema.statics.build = ( attrs: LikeAttrs ) => {
    return new Like( attrs );
}

const Like = mongoose.model< LikeDoc, LikeModel >('Like', likeSchema)





export { Like }