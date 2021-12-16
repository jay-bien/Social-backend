import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface CategoryAttrs {
    author: string,
    commentId: string,
    createdAt: number

}


interface CategoryDoc extends mongoose.Document{
    author: string,
    commentId: string,
    createdAt: number

}

interface CategoryModel extends mongoose.Model< any >{

    build( attrs: CategoryAttrs ): CategoryDoc
}

const categorySchema = new mongoose.Schema({
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

categorySchema.statics.build = ( attrs: CategoryAttrs ) => {
    return new Category( attrs );
}

const Category = mongoose.model< CategoryDoc, CategoryModel >('Category', categorySchema)





export { Category }