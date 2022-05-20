import express, { Request, Response } from 'express';

import { currentUser, requireAuth }  from '../../middlewares';
import { Auth } from '../../controllers';

const router = express.Router();




// @route /auth/currentUser
// @desc get current logged in user info from jwt
// @access private 
router.get('/', currentUser, requireAuth, Auth.currentUser );

router.post('/', currentUser, requireAuth, async ( req: Request, res: Response ) => {

    const currU = req.currentUser;
    const body = req.body;
    return res.status( 202 ).send(  currU  );

})

export default router;