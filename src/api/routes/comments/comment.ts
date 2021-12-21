import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';
import { RequestValidationError } from '../../errors/request-validation';

import { NestedComment } from '../../models';
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

    await NestedComment.deleteMany({});

    const comments = await NestedComment.find({});
    return res.status( 200 ).send({ comments })
});


router.post('/', currentUser, [

    body('content').
        trim()
        .not()
        .isEmpty()
        .withMessage('Must include content'),
    body( 'rootId' )
        .trim()
        .not()
        .isEmpty()
        .withMessage("Root Id is required."),
    body( 'parentId' )
        .trim()
        .not()
        .isEmpty()
        .withMessage("Parent Id is required.")
], 
validateRequest,
 async ( req: Request, res: Response ) => {



    const { content, rootId, parentId } = req.body;

    const user = req.currentUser;
    const userId = user?.id;

    if(! userId ){
        throw new NotAuthorizedError()
    }
    
    const createdAt = Date.now();
    let linkId = null;





    try{
        const commentDoc = NestedComment.build( { 
             content,
              author: userId,
              parentId: parentId,
               rootId: rootId,
                likes:0,
                 dislikes: 0,
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
router.get('/', currentUser, requireAuth, async ( req: Request, res: Response ) => {
    try{
        const body = req.body;


        

        let allComments = [];
        let uuu = req.currentUser;

        allComments = await NestedComment.find({ author: uuu.id}).sort({ "created_at": -1 });
        return res.status(200).send({ comments: allComments});

    } catch( e ){
        console.log({ e });
        return res.status( 500 ).send({ errors: [{msg: "Something went wrong."}]})
    }


})

// @route 
// @desc 
// @access 
router.get('/:parent_id', async ( req: Request, res: Response ) => {
    try{
  
        const parentId = req.params.parent_id;
        console.log({ parentId });

        if( !parentId ) return res.status( 400 ).send({});

         const comments = await NestedComment.find( { parentId: parentId } ).populate("author");
        console.log({ comments });
        

        return res.status(200).send({ comments });

    } catch( e ){
        console.log({ e });
        return res.status( 500 ).send({ });
    }

})

router.delete("/:comment_id", async ( req: Request, res: Response ) => {

    console.log("Delete comment ");
    
    try{
        const id = req.params.comment_id;
        const del = await NestedComment.findByIdAndRemove( id );

        return res.status( 200 ).send( del );
    } catch( e ){
        console.log({ e});
        return res.status( 500 ).send({ errors:[ e ]})

    }
})

export default router;