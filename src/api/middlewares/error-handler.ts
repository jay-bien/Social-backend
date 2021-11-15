import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';


/*
Catch errors, if they are our own custom errors, 
serialize them and send them.
Or else, if not an instance of our own custom error, send error straight back to the client
*/

export const errorHandler = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
 )=> {

    
    if( error instanceof CustomError ){
    
        return res.status( error.statusCode ).send({
            errors: error.serializeErrors()
        })
    }


    
    res.status( 400 ).send([ { msg: error.message } ] )
}