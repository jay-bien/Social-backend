import express, { Request, Response } from 'express';

import { Like, Comment } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();


router.post('/:commentId/:direction', [
    currentUser
],
    async ( req: Request, res: Response ) => {


    const user = req.currentUser;
    console.log( req.body );
   
    const direction = req.params.direction;
    const commentId = req.params.commentId;
    console.log({ direction});
    console.log( typeof commentId);


    if( direction ==="up"){

        try{
        
            const likeDoc = Like.build({
                post: commentId,
                direction: "up",
                user: "user"
            })
        
            await likeDoc.save();
            console.log({ commentId });
    
            const comment = await Comment.findById( commentId).populate("link");
            const commentLikes = await Like.find({ post: {'$in': commentId },
                    direction:{'$in': direction}});
                    
            console.log({ comment });
            if( comment ){
                comment.likes = commentLikes.length;
                console.log( comment );
                await comment.save();
                return res.status( 200 ).send( comment );

            }   
            return res.status( 200 ).send({});
    
        } catch( e ){
            console.log( e );
            return res.status( 400 ).send({});
        }

    } else if( direction==="down"){

        try{
        
            const likeDoc = Like.build({
                post: commentId,
                direction: "down",
                user: "user"
            })
        
            await likeDoc.save();
            console.log({ commentId });
    
            const comment = await Comment.findById( commentId);
            const commentDislikes = await Like.find({ post: {'$in': commentId }, direction:{'$in': direction}});
            console.log({ comment });
            if( comment ){
                comment.dislikes = commentDislikes.length;
                console.log( comment );
                await comment.save();
            }
            return res.status( 200 ).send( comment );
    
        } catch( e ){
            console.log( e );
            return res.status( 400 ).send({});
        }

    } else {

    }

  



} );

export default router;