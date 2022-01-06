require('dotenv').config();



import app from './app';


const PORT = process.env.PORT || 8083;


import { start as mongoStart } from './api/db/mongo';
import { DatabaseConnectionError } from './api/errors';


if( ! process.env.JWT_KEY)  throw new DatabaseConnectionError( 'Error starting app.' );


mongoStart();
app.listen( PORT , ( ) => {
    console.log( ` app listening on ${PORT}.`);
    return;
} )