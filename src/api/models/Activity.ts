import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";


export enum ActivityTypes {
    Login,
    ViewedHome,
    ViewedPost
}

interface ActivityAttrs {
    author: string,
    commentId: string,
    createdAt: number
    type: ActivityTypes

}


interface ActivityDoc extends mongoose.Document{
    author: string,
    commentId: string,
    createdAt: number
}

interface ActivityModel extends mongoose.Model< any >{

    build( attrs: ActivityAttrs ): ActivityDoc
}

const activitySchema = new mongoose.Schema({
    author:{
        type: ObjectID,
        required: true,
        ref: "User"
    },
    commentId:{
        type: ObjectID,
        ref: "Comment",
        required: true,
    },
    createdAt: {
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

activitySchema.statics.build = ( attrs: ActivityAttrs ) => {
    return new Activity( attrs );
}

const Activity = mongoose.model< ActivityDoc, ActivityModel >('Activity', activitySchema)





export { Activity }