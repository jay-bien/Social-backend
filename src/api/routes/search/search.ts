import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';

import { Comment } from '../../models';
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


    return res.status( 200 ).send({ data: null });

    
 
    
})


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