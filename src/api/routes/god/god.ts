import express, {Request, Response } from 'express';
import { User, Vote, Comment } from '../../models';


const router = express.Router();

router.get("/", async ( req: Request, res: Response) => {


    console.log("god route");






    const users = await User.find({});

    const posts = await Comment.find({})




    return res.status( 200 ).send({

        users: users,
        posts: posts,

    })
})


export default router;