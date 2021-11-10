import express from 'express';
import ('express-async-errors');
import cors from 'cors';


import { LinkGetRoute, LinkPostRoute } from './api/routes/index.js';

const app = express();


app.use( express.urlencoded( { extended: false} ) );
app.use( express.json() );
app.use( cors() );


const PORT = process.env.PORT || 8083;


app.listen( PORT , ( ) => {
    console.log( ` app listening at ${PORT}`);
} )

app.use('/api/link', LinkPostRoute );
app.use('/api/link', LinkGetRoute );

app.get('/', ( req, res ) =>{
  return res.status(200).json( 'Welcome to the Link Shortener API'
  );
})
app.all( '*', ( req, res )=>{

  res.status( 404 ).send({
    data: null,
  })

})
 
export default app;