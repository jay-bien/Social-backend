import express, { Request, Response } from 'express';
import { DatabaseConnectionError, NotAuthorizedError, BadRequest } from '../../errors';

import { Comment, Link, Vote } from '../../models';
import { unfurl } from 'unfurl.js';



export const createPost = async ( req: Request, res: Response ) => {
    const user = req.currentUser;

    if( ! user ) throw new NotAuthorizedError();
    const { title, link, content, type, categories, tags } = req.body;

    if( !type ) throw new BadRequest("Invalid request");
    let id = user.id;

    const postCreationDate = Date.now();
    let linkId = null;

    if( type === "link" && link){
        const unfurledLink =  await unfurl( link );
        const linkDoc = Link.build({
            url: link,
            metadata: unfurledLink,
            created_at: postCreationDate
        });
        await linkDoc.save();
        linkId = linkDoc._id;
    } else {
        // not a link
        // type === text as their are only 2 options right now 
        // logic for text only post here

    }

    const commentDoc = Comment.build({
        title,
        link: linkId,
        content,
        author: user.id,
        parentId:"",
        rootId:"",
        categories,
        tags,
        type,
        created_at: postCreationDate
    });
    try{
        await commentDoc.save();
        return res.status( 201 ).send({
            data: commentDoc
        })
    } catch( e ){
        throw new DatabaseConnectionError("We cannot complete that action right now.")
    }
 
}
