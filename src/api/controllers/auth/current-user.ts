import { Request, Response } from 'express';
import { DatabaseConnectionError } from '../../errors';
import { Vote, Comment } from '../../models';

export const currentUser =  async ( req: Request, res: Response ) => {

    let user = req.currentUser;

    try{
            
    const upVotes = await Vote.countDocuments({
        author: user.id,
        direction: "up"
    });
    const downVotes = await Vote.countDocuments({
        author: user.id,
        direction: "down"
    });
    const posts = await Comment.countDocuments({
        author: user.id
    });

    const constructedUser = {
        ...user,
        upVotes,
        downVotes,
        posts
    }
    return res.status( 200 ).send( constructedUser );

    } catch( e ){
        console.log({ e });
        throw new DatabaseConnectionError("Data error. Please try again later.")
    }

}
