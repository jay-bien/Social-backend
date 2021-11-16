import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequest } from '../../errors';
import { RequestValidationError } from '../../errors/request-validation';

import { Comment, Link } from '../../models';
import { unfurl } from 'unfurl.js';


import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares';

const router = express.Router();

// @route POST 
// @desc sign up a user
// @access public

router.post('/', [

    body('title').
        trim()
        .not()
        .isEmpty()
        .withMessage('title is invalid'),
    body( 'content' )
        .trim()
], 
validateRequest,
 async ( req: Request, res: Response ) => {

    console.log(req.body);


    const { title, link, content } = req.body;



    let linkId = '';
    if( link ) {    
        const unfurlResult = await unfurl( link );
        console.log( unfurlResult );
        const linkDoc = Link.build({ url: link, metadata: unfurlResult });
        await linkDoc.save();
        linkId = linkDoc._id;
        console.log({ linkDoc });
        
    }
    try{
        const commentDoc = Comment.build( { title, link: linkId, content, author:"", parentId:"", rootId:"" } );
        await commentDoc.save();
        console.log({ commentDoc });
        return res.status( 200 ).send({ data: commentDoc });

    
    } catch( e ){
        console.log({ e });
    }


    return res.status( 200 ).send({ data: null });

    
 
    
})


// @route 
// @desc 
// @access 
router.get('/', async ( req: Request, res: Response ) => {



    try{
        const allComments = await Comment.find({}).populate('link');
        return res.status(200).send({ comments: allComments});

    } catch( e ){
        console.log({ e });
    }

    res.status(200).send({})
    return;
})

export default router;