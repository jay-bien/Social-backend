import mongoose from 'mongoose';
import { Password } from '../services/password'


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type: Number,
        required: true
    },
    gender_ID:{
        type: Number,
        required: false
    },
    username:{
        type: String,
        required: false
    },
    last_active:{
        type: Number,
        required: false
    },
    role: {
        type: Array,
        required: false
    },
    display_name:{
        type: String,
    },
    bio:{
        type: String,
    },
    city:{
        type: String
    },
    country:{
        type: String
    },
    given_name:{},
    family_name:{},
    preferred_name:{},
    zip:{},
    photo:{},
    membership_active:{ },
    membership_tier:{},
    recurring:{},
    recur_start:{},
    recur_end:{},
    recur_interval:{},
    permissions:{}
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
          },
    }
});

userSchema.pre('save', async function( done ){

    if( this.isModified( 'password' )){
        const hashed = await Password.toHash( this.get( 'password' ));

        this.set('password', hashed);
    }

    done();
})

interface UserAttrs {
    email: string;
    password: string;
    created_at: number;
    username: string
}
interface UserDoc extends mongoose.Document{
    email: string,
    password: string;
    created_at: number;
    username: string;
    bio: string;
    last_active: Date;
    display_name: string;
    role: string[]

}

userSchema.statics.build = ( attrs: UserAttrs ) => {
    return new User( attrs )
};
interface UserModel extends mongoose.Model< any > {
    build( attrs: UserAttrs ): UserDoc;
}

const User =  mongoose.model< UserDoc , UserModel >( 'User', userSchema ); 

export { User }