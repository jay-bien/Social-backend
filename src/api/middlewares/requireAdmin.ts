import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized';
import { } from '../middlewares/'


/*
Blocks requests to routes unless user sent a valid jwt that current-user middleware was able to decode
*/



export const requireAuth = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction 
    ) => {``
    if( !req.currentUser ){
        console.log("No user");
        throw new NotAuthorizedError();
    }


    const userId = req.currentUser?.id;


    next();
}