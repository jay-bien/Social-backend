import express, { Request, Response } from 'express';



 export const signout = async ( req: Request, res: Response ) => {
     req.session = null;
     return res.status( 200 ).send();
 }



