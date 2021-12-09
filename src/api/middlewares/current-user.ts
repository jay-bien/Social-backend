import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

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

    if( ! req.session?.jwt){
        // temporary remove once cookie issue sorted
        // cookie not setting on next app and I have no idea why
        // installed certs and running app on HTTPS: still not working
        //

        

        const ujwt = req.body.auxillaryID;
        if( ujwt ){

            try{
                const payload = jwt.verify( ujwt, "" + process.env.JWT_KEY !) as UserPayload;
                req.currentUser = payload;
                console.log({ payload });

            } catch( e ){
                console.log({ e })
            }


            

        } else {
            console.log(" Else block on jwt, fallback key");
            req.currentUser = null;
        }


        next();
    }
    try{

        const payload =  jwt.verify( req.session?.jwt , "" + process.env.JWT_KEY !) as UserPayload;
        req.currentUser = payload;
    } catch( e ){
        // todo
        req.currentUser = null;
        console.log("Bad compare")
    }
    next();

}