import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized';


/*
Blocks requests to routes unless user sent a valid jwt that current-user middleware was able to decode
*/



export const requireAuth = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction 
    ) => {
    if( !req.currentUser ){
        throw new NotAuthorizedError();
    }

    next();
}