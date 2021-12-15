import express, { Request, response, Response } from 'express';

import { Vote, Comment } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose';

const router = express.Router();



// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {

    await Vote.deleteMany({});

    const votes = await Vote.find({});
    return res.status( 200 ).send({votes})
});


router.get('/', [
    currentUser, requireAuth
], async( req: Request, res:Response ) => {

    console.log( req.currentUser );

    try{
        const id = req.currentUser.id;
        const userVotes = await Vote.find({ author: id});
        return res.status( 200 ).send(userVotes);

    } catch( e ){
        console.log({ e });
    }

})
router.post('/:commentId/:direction', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {
        


    const user = req.currentUser;

    const direction = req.params.direction;
    const commentId = req.params.commentId;
    const userId = req.currentUser!.id;
    const commentIdParsed = mongoose.Types.ObjectId( commentId );
    const authorParsed = mongoose.Types.ObjectId( userId )

    // try to find if user has already voted 


    try{
        let userVote = await Vote.findOne({ "commentId": commentIdParsed, "author": authorParsed }        );
        let comment = await Comment.findById( commentIdParsed );

        if(! userVote ){
            //user has not already voted
            const createdAt = Date.now();
            userVote = await Vote.build(
                {"commentId": commentIdParsed, "author": authorParsed, direction,  created_at: createdAt}
                );

        
        } else {

            // user vote needs to be modified


            if( userVote.direction === direction ){
                // if user is cancelling vote

            
                userVote.direction = "neutral";
  



            } else {
                // user is not cancelling vote
                // vote needs to switch directions not be cancelled
                userVote.direction = direction;
   

            }
        }

        await userVote.save();
        console.log({ comment });

        const likes = await Vote.find({ commentId, direction:"up" });
        const dislikes = await Vote.find({ commentId, direction:"down"});


        comment.likes = likes.length;
        comment.dislikes = dislikes.length;
        await comment.save();


        const response = {
            likes: likes.length,
            dislikes: dislikes.length,
            commentId
        }
        console.log({ response });

        return res.status( 200 ).send( response );

    } catch( e ){
        console.log({ e });
        return res.status( 400 ).send({});
    }
} );

export default router;