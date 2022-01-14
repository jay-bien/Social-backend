import e, { Request, Response, NextFunction } from 'express';
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

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {

    const cookieHeaders = req.headers.cookie;
    let token = req.session?.jwt;

    const jwtKey = "" + process.env.JWT_KEY;
    if (token) {
        try {

            const payload = jwt.verify(token, jwtKey) as UserPayload;
            req.currentUser = payload;
            console.warn({ payload });

        } catch (e) {
            // todo
            console.log({ e });
            req.currentUser = null;
            console.log("Bad compare")
        }

    }





    next();

}