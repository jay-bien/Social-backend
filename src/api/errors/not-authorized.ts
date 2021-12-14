import { CustomError } from './custom-error';


export class NotAuthorizedError extends CustomError {


    statusCode = 401

    constructor(){
        super( 'Not Authorized' );
        Object.setPrototypeOf( this, NotAuthorizedError.prototype );
    }
    serializeErrors( ){
        return [{ msg: "Not Authorized to perform that action. Please login with a valid account."}]
    }
}