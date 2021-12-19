import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface SearchAttrs {
    author: string,
    created_at: number,
    query: string
}


interface SearchDoc extends mongoose.Document{
    author: ObjectID,
    created_at: string,
    query: string
}

interface SearchModel extends mongoose.Model< any >{

    build( attrs: SearchAttrs ): SearchDoc
}

const searchSchema = new mongoose.Schema({

    author:{
        type: ObjectID,
        required: true,
        ref: "User"
    },
    created_at:{
        type: Number,
        required: true
    },
    query: {
        type: String,
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

searchSchema.statics.build = ( attrs: SearchAttrs ) => {
    return new Search( attrs );
}

const Search = mongoose.model< SearchDoc, SearchModel >('Search', searchSchema)





export { Search }