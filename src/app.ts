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
         History,
         Bookmark,
         Search,
         Users,
         Comments
        } 
        from './api/routes';

import { PATHS } from './api/constants';
import { errorHandler } from './api/middlewares/error-handler';
import { CustomError } from './api/errors';
import { NotFoundError } from './api/errors/404';


const whitelist = [
    'http://localhost:3000',
    'localhost:3000',
    'http://localhost:3000.org'
];

const corsOptions = {
  origin: function ( origin : any, callback : any ): any {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use( cors({
    credentials: true,
    origin: process.env.ORIGIN
}) );
app.use( express.urlencoded( { extended: false} ) );
app.use( express.json() );
app.use( cookieSession({
    signed: false
}))


app.use( PATHS.signin, Signin );
app.use( PATHS.signout, Signout );
app.use( PATHS.signup, Signup );
app.use(  PATHS.currentUser , CurrentUser );
app.use( PATHS.posts, Posts );
app.use( PATHS.comments, Comments );
app.use( PATHS.link, LinkPost );
app.use( PATHS.votes , Votes );
app.use( PATHS.history , History );
app.use( PATHS.bookmark, Bookmark );
app.use( PATHS.search, Search );
app.use( PATHS.users, Users );



app.all( '*', ()=>{
    console.log("404 route");
    throw new NotFoundError();
})
app.use( errorHandler );
 
export default app;