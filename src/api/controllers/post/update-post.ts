import { Request, Response } from 'express';
import { BadRequest, NotAuthorizedError, DatabaseConnectionError } from '../../errors';
import { Comment } from '../../models';


export const updatePost = async ( req: Request, res: Response ) => {


    console.warn("Update Post");
    const postId = req.params.postId;
    const userId = req.currentUser.id;

    if( !postId ) throw new BadRequest('We cannot process this request.');
    if(!userId ) throw new NotAuthorizedError();

    const { title, content } = req.body;
    try{
        const post = await Comment.findOne({
            _id: postId,
            author: userId
        });
    
        if(!post) throw new BadRequest("We cannot process this request.");
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();
        return res.status( 200 ).send( post );
    } catch( e ){
        throw new DatabaseConnectionError("Cannot complete this action right now");
    }
}