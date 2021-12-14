import express, { Request, response, Response } from 'express';

import { Click } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();



// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {

    await Click.deleteMany({});

    const clicks = await Click.find({});
    return res.status( 200 ).send({clicks})
});



router.post('/:commentId', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {
        


    const user = req.currentUser;

    const commentId = req.params.commentId;
    const userId = req.currentUser!.id;

    // try to find if user has already clickd 


    try{
        let userClick = await Click.findOne({ "commentId": commentId, "author": userId}        );
        const createdAt = Date.now();

        if(! userClick ){
            //user has not already clickd
            userClick = await Click.build(
                {"commentId": commentId, "author": userId,  createdAt }
                );
                await userClick.save();
                return res.status( 201 ).send({ userClick });

        } else {

            await Click.findOneAndDelete({ "commentId": commentId, "author": userId});
            // user click needs to be modified
            return res.status( 204 ).send({ });
          
        }

    } catch( e ){
        console.log({ e });
        return res.status( 400 ).send({});
    }
} );



router.get('/', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {

        const user = req.currentUser;
        const userId = req.currentUser!.id;

        let userClicks = await Click.find({ "author": userId }        );

        return res.status( 200 ).send({ clicks: userClicks });
    }
)
export default router;