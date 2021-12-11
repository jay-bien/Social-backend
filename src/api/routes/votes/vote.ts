import express, { Request, response, Response } from 'express';

import { Vote, Comment } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();



// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {

    await Vote.deleteMany({});

    const votes = await Vote.find({});
    return res.status( 200 ).send({votes})
});



router.post('/:commentId/:direction', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {
        


    const user = req.currentUser;

    const direction = req.params.direction;
    const commentId = req.params.commentId;
    const userId = req.currentUser!.id;

    // try to find if user has already voted 


    try{
        let userVote = await Vote.findOne({ "commentId": commentId, "author": userId}        );
        console.log({ userVote });

        if(! userVote ){
            //user has not already voted
            userVote = await Vote.build(
                {"commentId": commentId, "author": userId, direction}
                );

        } else {

            // user vote needs to be modified


            
            if( userVote.direction === direction ){
                // if user is cancelling vote

            
                userVote.direction = "neutral";



            } else {
                // user is not cancelling vote

            
                userVote.direction = direction;

            

            }
        }

        await userVote.save();
        const votes = await Vote.find({});
        console.log({ votes });
        const likes = await Vote.find({ commentId, direction:"up" });
        const dislikes = await Vote.find({ commentId, direction:"down"})

        const response = {
            likes: likes.length,
            dislikes: dislikes.length,
            commentId
        }

        console.log({
            response
        })
        
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