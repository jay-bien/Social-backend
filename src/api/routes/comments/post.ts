import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';
import { RequestValidationError } from '../../errors/request-validation';

import { Comment, Link, Vote } from '../../models';
import { unfurl } from 'unfurl.js';


import jwt from 'jsonwebtoken';
import { currentUser, requireAuth, validateRequest } from '../../middlewares';

const router = express.Router();

// @route POST 
// @desc sign up a user
// @access public


// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {

    await Comment.deleteMany({});

    const comments = await Comment.find({});
    return res.status( 200 ).send({ comments })
});


router.post('/', currentUser, [

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



    const { title, link, content, type, categories, tags } = req.body;

    const user = req.currentUser;
    const userId = user?.id;

    if(! userId ){
        throw new NotAuthorizedError()
    }
    
    const createdAt = Date.now();
    let linkId = null;

    if( type === "text"){

    } else if( type ==="link"){

    if( link ) {    
        const unfurlResult = await unfurl( link );
        console.log( unfurlResult );
        const linkDoc = Link.build({ url: link, metadata: unfurlResult, created_at: createdAt });
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
             content,
              author: userId,
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
router.get('/', currentUser, async ( req: Request, res: Response ) => {
    try{
        const body = req.body;


        

        let allComments = [];

        allComments = await Comment.find({}).populate('link').sort({ "created_at": -1 });
        let uuu = req.currentUser;
        if( req.currentUser ){
            // user exists hydrate with user sentiment;
            const votes = await Vote.find({ author: req.currentUser.id });
            let modComments = allComments.map( comment => {

                for(let i = 0; i < votes.length; i++ ){
                    if( ""+ votes[ i ].commentId === ""+ comment._id ){
                        comment.sentiment = votes[ i ].direction;
                    }
                }
                
                return comment;

            })
      
        }

        

        return res.status(200).send({ comments: allComments});

    } catch( e ){
        console.log({ e });
    }

    res.status(200).send({})
    return;
})

// @route 
// @desc 
// @access 
router.get('/:id', async ( req: Request, res: Response ) => {
    try{
  
        const id = req.params.id;
         const comment = await Comment.findById( id ).populate('link');
        console.log({ comment });
        

        return res.status(200).send({ comment });

    } catch( e ){
        console.log({ e });
    }

    res.status(200).send({})
    return;
})

router.delete("/:comment_id", async ( req: Request, res: Response ) => {

    console.log("Delete comment ");
    
    try{
        const id = req.params.comment_id;
        console.log({ id });
        const del = await Comment.findByIdAndRemove( id );

        console.log({ del  });
        return res.status( 200 ).send( del );
    } catch( e ){
        console.log({ e});
        return res.status( 500 ).send({ errors:[ e ]})

    }
})

export default router;