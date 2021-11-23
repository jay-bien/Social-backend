import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from "mongodb";

interface LinkAttrs {
    url: string,
    metadata: object,
}


interface LinkDoc extends mongoose.Document{
    url: string,
    metadata: object,
}

interface LinkModel extends mongoose.Model< any >{

    build( attrs: LinkAttrs ): LinkDoc
}

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    metadata:{
        type: Object,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
          },
    }
})

linkSchema.statics.build = ( attrs: LinkAttrs ) => {
    return new Link( attrs );
}

const Link = mongoose.model< LinkDoc, LinkModel >('Link', linkSchema)





export { Link }