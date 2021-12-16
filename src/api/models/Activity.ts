import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";


export enum ActivityTypes {
    Login = "signin",
    Signup ="signup",
    Logout ='signout',
    ViewedPage = "pageView",
    ViewedPost ="postView",
}

interface ActivityAttrs {
    author: string,
    commentId: string,
    createdAt: number
    type: ActivityTypes,
    page: string

}


interface ActivityDoc extends mongoose.Document{
    author: string,
    commentId: string,
    created_at: number,
    type: string,
    page: string
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
    created_at: {
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    page: {
        type: String,
        required:true
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