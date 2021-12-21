import express, { Request, response, Response } from 'express';

import { Bookmark } from '../../models';
import { requireAuth, currentUser } from '../../middlewares';
import mongoose from 'mongoose'

const router = express.Router();



// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {

    await Bookmark.deleteMany({});

    const bookmarks = await Bookmark.find({});
    return res.status( 200 ).send({bookmarks})
});



router.post('/:commentId', [
    currentUser, requireAuth
],
    async ( req: Request, res: Response ) => {
        
    const user = req.currentUser;

    const commentId = req.params.commentId;
    const userId = req.currentUser!.id;

    try{
        let userBookmark = await Bookmark.findOne({ "commentId": commentId, "author": userId}        );
        const createdAt = Date.now();

        if(! userBookmark ){
            //user has not already bookmarkd
            userBookmark = await Bookmark.build(
                {"commentId": commentId, "author": userId,  createdAt }
                );
                await userBookmark.save();
                return res.status( 201 ).send({ userBookmark });

        } else {

            await Bookmark.findOneAndDelete({ "commentId": commentId, "author": userId});
            // user bookmark needs to be modified
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

        let userBookmarks = await Bookmark.find({ "author": userId }        );

        return res.status( 200 ).send({ bookmarks: userBookmarks });
    }
)
export default router;