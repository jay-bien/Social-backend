import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface LikeAttrs {
    
}


interface LikeDoc extends mongoose.Document{
   
}

interface LikeModel extends mongoose.Model< any >{

    build( attrs: LikeAttrs ): LikeDoc
}

const likeSchema = new mongoose.Schema({

})

likeSchema.statics.build = ( attrs: LikeAttrs ) => {
    return new Like( attrs );
}

const Like = mongoose.model< LikeDoc, LikeModel >('like', likeSchema)





export { Like }