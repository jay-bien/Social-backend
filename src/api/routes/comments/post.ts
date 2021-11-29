import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequest } from '../../errors';
import { RequestValidationError } from '../../errors/request-validation';

import { Comment, Link, Like } from '../../models';
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


    const { title, link, content, type, categories, tags } = req.body;
    const createdAt = Date.now();
    let linkId = null;

    if( type === "text"){

    } else if( type ==="link"){

    if( link ) {    
        const unfurlResult = await unfurl( link );
        console.log( unfurlResult );
        const linkDoc = Link.build({ url: link, metadata: unfurlResult });
        await linkDoc.save();
        linkId = linkDoc._id;
        console.log({ linkDoc });
    }
    

    } else if( type === "qa"){

    }



    try{
        const commentDoc = Comment.build( { 
            title,
             link: linkId, 
             content, author:"",
              parentId:"",
               rootId:"",
                likes:0,
                 dislikes: 0,
                 categories,
                 tags,
                 type,
                 created_at: createdAt,
        } );

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
        const allComments = await Comment.find({}).populate('link').sort({ "created_at": -1 });

        console.log({
            allComments
        });

        return res.status(200).send({ comments: allComments});

    } catch( e ){
        console.log({ e });
    }

    res.status(200).send({})
    return;
})

router.delete("/:comment_id", async ( req: Request, res: Response ) => {
    
    console.log(" delete this");
    try{
        const id = req.params.comment_id;
        console.log({ id });
        await Comment.findByIdAndRemove( id );

        return res.status( 200 ).send({})
    } catch( e ){
        console.log({ e});
        return res.status( 500 ).send({e})

    }
})

export default router;