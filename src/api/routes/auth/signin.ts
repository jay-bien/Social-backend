import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequest, DatabaseConnectionError } from '../../errors';
import { validateRequest } from '../../middlewares';
import { User } from '../../models';
import { Password } from '../../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();


// @route POST 
// @desc sign in a user
// @access public
router.post('/', [
    body( 'email' )
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage( "Email is badly formatted" ),
    body( 'password' )
        .trim()
        .notEmpty()
        .withMessage( "Password cannot be empty." )
], validateRequest, async ( req: Request, res: Response ) => {

    const { email, password } = req.body;

    let user: any;
    try{
        user = await User.findOne({ email });
    } catch( e ){
        throw new DatabaseConnectionError( 'Please try again later.' ); 
    }
    if( ! user ) {
        throw new BadRequest( 'Cannot find this user.' )
    }

    const isMatch = await Password.compare( password, user.password );
    if( ! isMatch ){
        throw new BadRequest( 'Invalid credentials.' )
    }

    const uJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, "" + process.env.JWT_KEY ! );

    req.session = {
        jwt: uJwt
    };


    const session = req.session;


    const headers = req.headers;



    if( !headers ){
        console.log( " No headers. ");
        console.log( req.headers );
        console.log('headers printerd');

    };



    return res.cookie(
        'jwt', uJwt,
        { domain: '.localhost.org'}
    ).cookie('expre', uJwt, {
    }).cookie('jwt3', uJwt, {
        domain:'.localhost.org:3003'
    }).status( 200 ).send( { 
        auxillaryId: uJwt,
        user
    });
    console.log({ uJwt });
        
})


// @route 
// @desc 
// @access 
router.get('/', ( req: Request, res: Response ) => {

    res.send( 'Sign In Endpoint')
    return;
})

export default router;