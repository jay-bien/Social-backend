import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface BookmarkAttrs {
    author: string,
    commentId: string,
    createdAt: number

}


interface BookmarkDoc extends mongoose.Document{
    author: string,
    commentId: string,
    createdAt: number

}

interface BookmarkModel extends mongoose.Model< any >{

    build( attrs: BookmarkAttrs ): BookmarkDoc
}

const bookmarkSchema = new mongoose.Schema({
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

bookmarkSchema.statics.build = ( attrs: BookmarkAttrs ) => {
    return new Bookmark( attrs );
}

const Bookmark = mongoose.model< BookmarkDoc, BookmarkModel >('Bookmark', bookmarkSchema)





export { Bookmark }