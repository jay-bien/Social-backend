import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";


export enum ClickTypes {
    Login,
    Signup,
    ViewedPage,
    ViewedPost,
}

interface ClickAttrs {
    author: string,
    commentId: string,
    createdAt: number
    type: string,
    page: string

}


interface ClickDoc extends mongoose.Document{
    author: string,
    commentId: string,
    created_at: number,
    type: string,
    page: string
}

interface ClickModel extends mongoose.Model< any >{

    build( attrs: ClickAttrs ): ClickDoc
}

const clickSchema = new mongoose.Schema({
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

clickSchema.statics.build = ( attrs: ClickAttrs ) => {
    return new Click( attrs );
}

const Click = mongoose.model< ClickDoc, ClickModel >('Click', clickSchema)





export { Click }