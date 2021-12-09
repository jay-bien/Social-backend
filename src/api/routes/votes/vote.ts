import express, { Request, Response } from 'express';

import { Vote, Comment } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();


router.post('/:commentId/:direction', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {
        


    const cookie = req.cookies;
    const session = req.session?.sessionCookies;

    const user = req.currentUser;
   
    const direction = req.params.direction;
    const commentId = req.params.commentId;
    const userId = req.currentUser!.id;
    console.log("OK VOTE")

    // try to find if user has already voted 

    try{
        const userVote = await Vote.findOne({ $and: [{ "$comment": commentId}, {"user": userId}]});
        await Vote.deleteMany({});

        console.log({ userVote });
        if(!userVote ){
            const userVote = Vote.build({
                comment: commentId,
                direction: direction,
                user: userId
            });
            await userVote.save();
            let votes = await Vote.find({});
            console.log({ votes });
        } else {
            console.log(" User has already voted on this post.");
        }

    } catch( e ){
        console.log({ e });
    }

    return res.status( 200 );


    // if( direction ==="up"){

    //     try{
            
        
    //         const voteDoc = Vote.build({
    //             comment: commentId,
    //             direction: "up",
    //             user: "user"
    //         })
        
    //         await voteDoc.save();
    //         console.log({ commentId });
    
    //         const comment = await Comment.findById( commentId).populate("link");
    //         const commentLikes = await Vote.find({ post: {'$in': commentId },
    //                 direction:{'$in': direction}});
                    
    //         if( comment ){
    //             comment.likes = commentLikes.length;
    //             await comment.save();
    //             return res.status( 201 ).send( comment );

    //         }   
    //         return res.status( 200 ).send({});
    
    //     } catch( e ){
    //         console.log( e );
    //         return res.status( 400 ).send({});
    //     }

    // } else if( direction==="down"){

    //     try{
        
    //         const voteDoc = Vote.build({
    //             comment: commentId,
    //             direction: "down",
    //             user: commentId
    //         })
        
    //         await voteDoc.save();
    
    //         const comment = await Comment.findById( commentId);
    //         const commentDislikes = await Vote.find({ post: {'$in': commentId }, direction:{'$in': direction}});
    //         if( comment ){
    //             comment.dislikes = commentDislikes.length;
    //             await comment.save();
    //             return res.status( 201 ).send( comment );
    //         }

    //         return res.status( 200 ).send({})
    
    //     } catch( e ){
    //         return res.status( 400 ).send({});
    //     }

    // } else {

    // }

  



} );

export default router;