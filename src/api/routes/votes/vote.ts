import express, { Request, Response } from 'express';

import { Like, Comment } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();


router.post('/:commentId/:direction', [
    currentUser
],
    async ( req: Request, res: Response ) => {

    

    const cookie = req.cookies;
    console.log({ cookie });
    const session = req.session?.sessionCookies;
    console.log({ session });
    console.log( req.currentUser );
    const user = req.currentUser;
    console.log( req.body );
   
    const direction = req.params.direction;
    const commentId = req.params.commentId;
    const userId = req.body.user;


    // try to find if user has already voted 

    try{
        const commentLikes = await Like.find({ post: {'$in': commentId },
                    direction:{'$in': direction}, user:{'$in': userId }});

        console.log({ commentLikes });

        // check if user has already voted
        if( Array.isArray( commentLikes )){
            const userLikeIdx = commentLikes.indexOf( like => ( like.user === userId ));

            if( userLikeIdx ){
                commentLikes.splice( userLikeIdx, 1 );
                await Like.save()
            }
        }

    } catch( e ){
        console.log({ e});
    }


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
                    
            if( comment ){
                comment.likes = commentLikes.length;
                await comment.save();
                return res.status( 201 ).send( comment );

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
    
            const comment = await Comment.findById( commentId);
            const commentDislikes = await Like.find({ post: {'$in': commentId }, direction:{'$in': direction}});
            if( comment ){
                comment.dislikes = commentDislikes.length;
                await comment.save();
                return res.status( 201 ).send( comment );
            }

            return res.status( 200 ).send({})
    
        } catch( e ){
            console.log( e );
            return res.status( 400 ).send({});
        }

    } else {

    }

  



} );

export default router;