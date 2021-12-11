import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';
import { RequestValidationError } from '../../errors/request-validation';

import { Comment, Link, Vote , Bookmark} from '../../models';
import { unfurl } from 'unfurl.js';


import jwt from 'jsonwebtoken';
import { currentUser, validateRequest } from '../../middlewares';

const router = express.Router();




// @route 
// @desc 
// @access 
router.get('/', 
currentUser,
 async ( req: Request, res: Response ) => {
    try{

    const user = req.currentUser;
    const userId = req.currentUser?.id;

        let allVotes = await Vote.find({
            author: userId
        }).populate('post')
        .sort({ "created_at": -1 });
        let allBookmarks = await Bookmark.find({
            author: userId
        }).populate('post')
        .sort({ "created_at": -1 });

        let allComments = [];

            allComments = await Comment.find({ author: userId
            }).populate('link').sort({ "created_at": -1 });
            console.log({ allComments });
            console.log( userId );
          
        

        return res.status(200).send({ comments: allComments, votes: allVotes, bookmarks: allBookmarks});

    } catch( e ){
        console.log({ e });
    }

    res.status(200).send({})
    return;
})



export default router;