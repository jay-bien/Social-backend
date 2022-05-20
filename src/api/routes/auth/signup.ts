import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../../middlewares';

import { Auth } from '../../controllers';

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
Auth.signup
)


// @route 
// @desc 
// @access 
router.get('/', ( req: Request, res: Response ) => {
    res.send( 'Sign Up Endpoint')
    return;
})


export default router;