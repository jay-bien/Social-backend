import { validationResult } from 'express-validator';
import {    Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors';

/*
catches express-validor errors and throws our custom ReequestValidationError
*/



export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const errors = validationResult( req );

    if( ! errors.isEmpty() ) throw new RequestValidationError( errors.array() )
    next();
}