import {Request,Response } from 'express';
import { Comment } from '../../models';
import { currentUser } from '../../middlewares';



export const readPost = async( req: Request, res: Response ) => {

    try{

    } catch( e ){

    }


    return res.status( 500 ).send({ })
}



export const readPosts = async( req: Request, res: Response ) => {

    let allComments = [];

    try{

        allComments = await Comment.find({}).populate('link').sort({"created_at": -1})
    } catch( e ){

    }

    return res.status(500).send()
    
}

