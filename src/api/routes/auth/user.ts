import express, { Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';

import { currentUser }  from '../../middlewares';

const router = express.Router();




// @route /auth/currentUser
// @desc get current logged in user info from jwt
// @access private 
router.get('/', currentUser, async ( req: Request, res: Response ) => {

    const currU = req.currentUser;
    if( ! currU ) return res.status( 400 ).send( { user: null } );
    return res.status( 200 ).send( { user : currU } );

})

export default router;