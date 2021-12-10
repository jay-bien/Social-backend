import express, { response } from 'express';
require('express-async-errors');


import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

import cors from 'cors';



const app = express();




import { Signin,
         Signout,
         Signup,
         CurrentUser,
         LinkPost,
         Posts,
         Votes,
         History
        } 
        from './api/routes';

import { PATHS } from './api/constants';
import { errorHandler } from './api/middlewares/error-handler';
import { CustomError } from './api/errors';
import { NotFoundError } from './api/errors/404';


const whitelist = ['http://localhost:3000', 'https://dap-next-jay-bien.vercel.app/'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use( cors(  corsOptions) );
app.use( express.urlencoded( { extended: false} ) );
app.use( express.json() );
app.use( cookieSession({
    signed: false
}))
app.use( cookieParser() );


app.use( PATHS.signin, Signin );
app.use( PATHS.signout, Signout );
app.use( PATHS.signup, Signup );
app.use(  PATHS.currentUser , CurrentUser );
app.use( PATHS.posts, Posts );
app.use( PATHS.link, LinkPost );
app.use( PATHS.votes , Votes );
app.use( PATHS.history , History );
app.get('/history/', () => {
    console.log("history");

    return response.status( 200).send({});
})

app.all( '*', ()=>{
    console.log("404 route");
    throw new NotFoundError();
})
app.use( errorHandler );
 
export default app;