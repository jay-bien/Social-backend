import express from 'express';
require('express-async-errors');


import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';



const app = express();




import { Signin,
         Signout,
         Signup,
         CurrentUser,
         LinkPost,
         Tickets
        } 
        from './api/routes';

import { PATHS } from './api/constants';
import { errorHandler } from './api/middlewares/error-handler';
import { CustomError } from './api/errors';
import { NotFoundError } from './api/errors/404';

app.use( cors() );
app.use( express.urlencoded( { extended: false} ) );
app.use( express.json() );
app.use( cookieSession({
    signed: false
}))


app.use( PATHS.signin, Signin );
app.use( PATHS.signout, Signout );
app.use( PATHS.signup, Signup );
app.use(  PATHS.currentUser , CurrentUser );
app.use( PATHS.tickets, Tickets )
app.use( PATHS.link, LinkPost )

app.all( '*', ()=>{
    throw new NotFoundError();
})
app.use( errorHandler );
 
export default app;