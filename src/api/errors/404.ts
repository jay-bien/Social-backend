import { CustomError } from ".";


export class NotFoundError extends CustomError {

    statusCode = 404;

    constructor( ){
        super('Not found.');
        Object.setPrototypeOf( this, NotFoundError.prototype );
    }
    serializeErrors(){
        return [ { msg: "Resource not found." } ]
    }

}