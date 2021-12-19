import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';

import { Comment, Search } from '../../models';
import { unfurl } from 'unfurl.js';


import jwt from 'jsonwebtoken';
import { currentUser } from '../../middlewares';

const router = express.Router();

// @route POST 
// @desc sign up a user
// @access public


// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {


    return res.status( 200 ).send({ })
});


router.post('/', currentUser,
 async ( req: Request, res: Response ) => {


    console.log("Post Request search route");
    const { q } = req.body;

    const createdAt = Date.now();

        const regex = new RegExp( escapeRegex( q ), 'gi' );
        const results = await Comment.find({ 
            $or:[{ title: regex}, { content: regex }]
        });
        console.log({ results });


    return res.status( 200 ).send({ data: results });

    
 
    
})

function escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// @route 
// @desc 
// @access 
router.get('/', currentUser, async ( req: Request, res: Response ) => {
 

        


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