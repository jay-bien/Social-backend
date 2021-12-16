import express, { Request, response, Response } from 'express';

import { Category } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();



// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {

    await Category.deleteMany({});

    const categorys = await Category.find({});
    return res.status( 200 ).send({categorys})
});



router.post('/', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {
        


    const user = req.currentUser;

    const commentId = req.params.commentId;
    const userId = req.currentUser!.id;

    // try to find if user has already categoryd 


    try{
        let usercategory = await Category.findOne({ "commentId": commentId, "author": userId}        );
        const createdAt = Date.now();

        if(! usercategory ){
            //user has not already categoryd
            usercategory = await Category.build(
                {"commentId": commentId, "author": userId,  createdAt }
                );
                await usercategory.save();
                return res.status( 201 ).send({ usercategory });

        } else {

            await Category.findOneAndDelete({ "commentId": commentId, "author": userId});
            // user category needs to be modified
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

        let usercategorys = await Category.find({ "author": userId }        );

        return res.status( 200 ).send({ categorys: usercategorys });
    }
)
export default router;