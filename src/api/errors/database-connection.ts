import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError {
    public reason = 'Database error.'
    statusCode = 500;
    constructor( message: string){

        super( message );

        Object.setPrototypeOf( this, DatabaseConnectionError.prototype )
    }

    serializeErrors( ){
        return [{ msg: this.reason }]
    }
}