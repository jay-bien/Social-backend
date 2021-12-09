import express, { Request, Response } from 'express';

import { Vote, Comment } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();


router.post('/:commentId/:direction', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {
        


    const user = req.currentUser;
    const direction = req.params.direction;
    const commentId = req.params.commentId;
    const userId = req.currentUser!.id;
    console.log("OK VOTE")

    // try to find if user has already voted 

    try{
        let userVote = await Vote.findOne({ $and: [{ "$comment": commentId}, {"user": userId}]});
        const comment = await Comment.findById( commentId );

        if(!userVote ){
            console.log("No vote");

            // user vote needs to be created
            userVote = Vote.build({
                comment: commentId,
                direction: direction,
                user: userId
            });
            
            // update like count on comment doc
            console.log(" SEt vote to 0");
            direction === "up"
            ? comment.likes = 1
            : comment.dislikes = 1;
            console.log({ comment });


        } else {

            // user vote needs to be modified
            console.log("Modify vote");

            
            if( userVote.direction === direction ){
                // if user is cancelling vote

                console.log("Cancel vote");

                userVote.direction = "neutral";

            // update like count on comment doc
                direction === "up"
                ? comment.likes = comment.likes - 1
                : comment.dislikes = comment.dislikes - 1;
                console.log({ comment });


            } else {
                // user is not cancelling vote
                userVote.direction = direction;
                console.log("Switch vote");



                // update like count on comment doc
                direction === "up"
                ? comment.likes = comment.likes + 1
                : comment.dislikes = comment.dislikes + 1;

                console.log({ comment });
            }
        }

        console.log( comment )
        await userVote.save();
        await comment.save();
        
        const response = {
            id: commentId,
            likes: comment.likes,
            dislikes: comment.dislikes
        }
        
        return res.status( 200 ).send( response );

    } catch( e ){
        console.log("Big catch block.")
        console.log({ e });
        return res.status( 400 ).send({});
    }



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