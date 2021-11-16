import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../api/errors';

let mongo: any;
beforeAll( async  ( ) => {


    mongo = await  MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    try{
        await mongoose.connect( mongoUri,{
            useFindAndModify: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );
    
       } catch( e ){
            throw new DatabaseConnectionError("Cannot connect to databse.")
       }
})

beforeEach( async ( ) => {


    jest.setTimeout(120000);
    jest.useFakeTimers('legacy');


    const collections = await mongoose.connection.db.collections();
    for( let collection of collections ){
        if( collection ) await collection.deleteMany( {} ); 
        return;
    }
})

afterAll( async ( ) => {
    await mongo.stop();
    await mongoose.connection.close();
})