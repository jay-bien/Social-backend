import express, { Request, Response } from 'express';

import { Like, Comment } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';

const router = express.Router();


router.post('/:direction', [
    currentUser
],
    async ( req: Request, res: Response ) => {


    const user = req.currentUser;
    console.log( req.body );
    const post = req.body.post;
    console.log(post );
    const direction = req.params.direction;
    console.log({ direction});
    console.log( typeof post );

    try{
        
        const likeDoc = Like.build({
            post: post,
            direction: "up",
            user: "user"
        })
    
        await likeDoc.save();
        const comment = await Comment.findById(post);
        const commentLikes = await Like.find({ post: {'$in': post}});
        console.log({ commentLikes});
        if( comment ){
            comment.likes = commentLikes.length;
        }
        return res.status( 200 ).send( likeDoc );

    } catch( e ){
        console.log( e );
        return res.status( 400 ).send({});
    }



} );

export default router;