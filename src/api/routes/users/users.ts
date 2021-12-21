import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequest, DatabaseConnectionError } from '../../errors';
import { currentUser, validateRequest } from '../../middlewares';
import { User } from '../../models';
import { Password } from '../../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();


// @route POST 
// @desc sign in a user
// @access public
router.get('/', currentUser, async ( req: Request, res: Response ) => {


    let users: any;
    try{
        users = await User.find({});
        return res.status( 200 ).send( { 
            users
        });
    } catch( e ){
        throw new DatabaseConnectionError( 'Please try again later.' ); 
    }


 


    console.log("Session jwt from signing in.");
    console.log( req.session.jwt );



    return res.status( 200 ).send( { 
    });
        
})


// @route 
// @desc 
// @access 
router.post('/', ( req: Request, res: Response ) => {

    res.send( 'No Users')
    return;
})

router.delete(  '/:id', async ( req:Request, res:Response) => {
    const { id } = req.params;


    try{
        const deleteOperation = await User.deleteOne({
            _id: id 
        });
        console.log({
            deleteOperation
        });
        return res.status( 200 ).send({ deleteOperation })
    } catch( e ){

    }

    console.log({ id })

    return res.status( 200).send("Delete user route")
})

export default router;