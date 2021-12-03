import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequest } from '../../errors';
import { RequestValidationError } from '../../errors/request-validation';

import { User } from '../../models';

import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares';

const router = express.Router();

// @route POST 
// @desc sign up a user
// @access public

router.post('/', [

    body('email').
        trim()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage(' Email is invalid'),
    body( 'password' )
        .trim()
        .isLength( { min: 6 , max: 20 } )
        .withMessage(' Password must be between 6 and 20 characters.'),
], 
validateRequest,
 async ( req: Request, res: Response ) => {



    const { email, password, password2 } = req.body;

    if('' + password.trim() !== '' + password2.trim() ){
        throw new BadRequest("Passwords do not match")
    }
    let user = null;

    try{

    const exists = await User.findOne({ email });
    if( exists ){
        console.log("Email is in use");
        throw new BadRequest( 'Email is already registered.' )
    }
    } catch( e ){
        console.log({ e});
        throw e;
    }

    try{

    user = User.build( { email, password } );
    await user.save();


    } catch( e ){
        console.log({ e });
        return res.status(400).send({errors:[{msg:"An error has occured."}]});
    }

    
    const uJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, "" + process.env.JWT_KEY ! );

    req.session = {
        jwt: uJwt
     };


     return res.status( 201 ).send( { 
        auxillaryId: uJwt,
        user
    });
    
})


// @route 
// @desc 
// @access 
router.get('/', ( req: Request, res: Response ) => {

    res.send( 'Sign Up Endpoint')
    return;
})

export default router;