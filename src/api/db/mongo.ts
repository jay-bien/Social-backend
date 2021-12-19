import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../errors';
const dbUrl = process.env.MONGO_URL || "mongodb://localhost/fluance";

const start = async ( ) => {

   try{
    await mongoose.connect( dbUrl,{
        useFindAndModify: true,
        useCreateIndex: true,
        
        useNewUrlParser: true,
        useUnifiedTopology: true
    } );

   } catch( e ){
       console.log({ e });
        throw new DatabaseConnectionError("Cannot connect to databse.")
        console.log("Unable to connect to database.");
   }

}

export {start}