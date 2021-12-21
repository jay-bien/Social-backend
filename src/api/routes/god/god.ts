import express, {Request, Response } from 'express';
import { currentUser, requireAuth } from '../../middlewares';
import { User, Vote, Comment } from '../../models';


const router = express.Router();

router.get("/", [
    currentUser, requireAuth
], async ( req: Request, res: Response) => {

    const users = await User.find({});
    const posts = await Comment.find({})

    return res.status( 200 ).send({

        users: users,
        posts: posts,

    })
})


export default router;