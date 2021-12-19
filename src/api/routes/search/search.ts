import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';

import { Comment, Link, Search } from '../../models';
import { unfurl } from 'unfurl.js';


import jwt from 'jsonwebtoken';
import { currentUser, requireAuth } from '../../middlewares';

const router = express.Router();

// @route POST 
// @desc sign up a user
// @access public


// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {


    return res.status( 200 ).send({ })
});


router.get('/', currentUser, requireAuth,
 async ( req: Request, res: Response ) => {

    console.log( req.body );
    const { q } = req.body;
    console.log({ q });
    console.log("query", q);

    const createdAt = Date.now();

        const regex = new RegExp( escapeRegex( q ), 'gi' );
        console.log({ regex });
        try{
            const results = await Comment.find({ 
                $or:[{ title: regex}, { content: regex }, {}]
            });
    
            // const search = Search.build({
            //    author: req.currentUser?.id || 'anonymous',
            //    query: q,
            //    created_at: createdAt
            // });
            // await search.save();

            console.log( req.currentUser)
    
    
        return res.status( 200 ).send({ data: results });

        } catch( e ){
            console.log({ e });
            return res.status( 200 ).send({ errors: [ e ] });
        }

    
})

function escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// @route 
// @desc 
// @access 
router.get('/all', currentUser, async ( req: Request, res: Response ) => {
 
    try{
        const searches = await Search.find({ });
        return res.status( 200 ).send({ searches });
    } catch( e ){
        console.log( { e });
        return res.status( 500 ).send({ errors: [ e ]});
    }

    res.status(200).send({})
    return;
})

// @route 
// @desc 
// @access 
router.get('/:id', async ( req: Request, res: Response ) => {
   
    res.status(200).send({})
    return;
})

router.delete("/:search_id", async ( req: Request, res: Response ) => {
    
 
})

export default router;