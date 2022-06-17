import {Request,Response } from 'express';
import { Comment } from '../../models';
import { currentUser } from '../../middlewares';
import { DatabaseConnectionError } from '../../errors';



export const readPost = async( req: Request, res: Response ) => {

    try{

    } catch( e ){

    }


    return res.status( 500 ).send({ })
}



export const readPosts = async( req: Request, res: Response ) => {

    let allComments = [];

    try{
        allComments = await Comment.find({}).populate('link').sort({"created_at": -1});
        return res.status( 200 ).send({ data: allComments });
    } catch( e ){

        throw new DatabaseConnectionError("We cannot process that request right now.");
    }

    return res.status(500).send()
    
}

