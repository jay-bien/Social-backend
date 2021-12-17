import express, { Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';

import { currentUser }  from '../../middlewares';

const router = express.Router();




// @route /auth/currentUser
// @desc get current logged in user info from jwt
// @access private 
router.get('/', currentUser, async ( req: Request, res: Response ) => {

    console.log("User route")

    console.log('USER', req.currentUser);
    const currU = req.currentUser;
    if( ! currU ) return res.status( 400 ).send( { user: null } );
    return res.status( 200 ).send( { user : currU } );

})

export default router;