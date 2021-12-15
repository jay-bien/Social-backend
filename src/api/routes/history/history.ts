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

        let upVotes = await Vote.find({
            author: userId,
            direction:"up"
        }).populate('commentId')
        .populate("author")
        .sort({ "created_at": -1 });

        let downVotes = await Vote.find({
            author: userId,
            direction:"down"
        }).populate('commentId')
        .populate("author")
        .sort({ "created_at": -1 });

        let allBookmarks = await Bookmark.find({
            author: userId
        }).populate('commentId')
        .sort({ "created_at": -1 });

        let allComments = [];

            allComments = await Comment.find({ author: userId
            }).populate("author")
            .populate('link').sort({ "created_at": -1 });
     
          
    
        return res.status(200).send({ comments: allComments, upVotes, downVotes, bookmarks: allBookmarks});

    } catch( e ){
        console.log({ e });
    }

    res.status(200).send({})
    return;
})



export default router;