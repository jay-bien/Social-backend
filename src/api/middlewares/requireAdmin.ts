import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError, DatabaseConnectionError } from '../errors/not-authorized';
import { } from '../middlewares/'
import { User } from '../models';


/*
Blocks requests to routes unless user sent a valid jwt that current-user middleware was able to decode
*/



export const requireAdmin = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction 
    ) => {
    if( !req.currentUser ){
        throw new NotAuthorizedError();
    }


    const userId = req.currentUser?.id;
    let user = null;

    try{
        user = await User.findById( userId );

    } catch( e ){
        throw new DatabaseConnectionError('Cannot complete that request.');
    }

    if( !user ) throw new NotAuthorizedError();

    if( ! user.roles || ! Array.isArray( user.roles ) || ! user.roles.includes('admin')){
        throw new NotAuthorizedError();
    }

    next();
}