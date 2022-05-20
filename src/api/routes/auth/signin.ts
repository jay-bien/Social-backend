import express, { Request, Response } from 'express';
import { body } from 'express-validator';


const router = express.Router();

import { Auth } from '../../controllers';


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
], Auth.signin )


// @route 
// @desc 
// @access 
router.get('/', ( req: Request, res: Response ) => {

    res.send( 'Sign In Endpoint')
    return;
})

export default router;