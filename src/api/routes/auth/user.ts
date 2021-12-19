import express, { Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';

import { currentUser, requireAuth }  from '../../middlewares';
import { Comment, Vote } from '../../models';

const router = express.Router();




// @route /auth/currentUser
// @desc get current logged in user info from jwt
// @access private 
router.get('/', currentUser, requireAuth, async ( req: Request, res: Response ) => {


    let currU = req.currentUser;

    const upVotes = await Vote.countDocuments({
        author: currU.id,
        direction: "up"
    });
    const downVotes = await Vote.countDocuments({
        author: currU.id,
        direction: "down"
    });
    const posts = await Comment.countDocuments({
        author: currU.id
    })
    const userO = {
        ...currU,
        upVotes,
        downVotes,
        posts
    }
    

    return res.status( 200 ).send( { user : userO }  );

});

router.post('/', currentUser, requireAuth, async ( req: Request, res: Response ) => {


    const currU = req.currentUser;
    const body = req.body;
    console.log({ body });

    return res.status( 202 ).send( { user : currU } );

})

export default router;