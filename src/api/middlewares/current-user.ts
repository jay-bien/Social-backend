import e, { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


/*
if client sends valid jwt,
decode jwt and add the user to the request object
if invalid jwt or no jwt, req.user will be set to null
*/
interface UserPayload {
    id: string,
    email: string
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload | null
        }
    }
}

export const currentUser = async ( req: Request, res: Response, next: NextFunction ) => {



    const cookieHeaders = req.headers.cookie;
    console.log({ cookieHeaders });
    let cookie = null;
    if( cookieHeaders && cookieHeaders.length ){
        cookie = cookieHeaders.split('=')[1];


        const jwtKey = process.env.JWT_KEY!;
        console.log({ cookie });
    
        try{
            
            const payload =  jwt.verify( cookie, "" + jwtKey) as UserPayload;
            req.currentUser = payload;
        } catch( e ){
            // todo
            console.log({ e });
            req.currentUser = null;
            console.log("Bad compare")
        }
    } 


    next();

}