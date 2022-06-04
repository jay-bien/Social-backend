import { Request, Response } from 'express';
import { Comment } from '../../models';
import { BadRequest, NotAuthorizedError } from '../../errors';


export const removePost = async ( req: Request, res: Response ) => {
    const postId = req.params.id;
    const userId = req.currentUser.id;

    if( !postId ) throw new BadRequest('Cannot process this action.');
    if(!userId ) throw new NotAuthorizedError();
    try{
        const comment = await Comment.findOneAndDelete({ author: userId, _id: postId });
        return res.status( 200 ).send( comment )
    } catch( e ){
        
    }
}
