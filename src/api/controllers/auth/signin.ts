import express, { Request, Response } from 'express';
import { BadRequest, DatabaseConnectionError } from '../../errors';
import { User } from '../../models';
import { Password } from '../../services/password';
import jwt from 'jsonwebtoken';



export const signin = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;
    let user: any;

    try{
        user = await User.findOne({ email });
    } catch( e ){
        
        throw new DatabaseConnectionError("Please try again.")
    }

    if( !user ){
        throw new BadRequest("Cannot find this user.")
    }

    const isMatch = Password.compare( password, user.password );
    if( !isMatch ) throw new BadRequest('Invalid credentials');

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, "" + process.env.JWT_KEY );
    req.session = {
        jwt: userJwt
    }

    return res.status( 200 ).send({
        user
    })

}

