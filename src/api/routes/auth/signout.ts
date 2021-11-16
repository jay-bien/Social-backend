import express, { Request, Response } from 'express';

const router = express.Router();


// @route POST 
// @desc sign out a user
// @access public
router.post('/', ( req: Request, res: Response ) => {

    req.session = null;
    res.status( 200 ).send({})
    return;
})


// @route GET
// @desc Sign out a user
// @access public
router.get('/', ( req: Request, res: Response ) => {
    req.session = null;
    res.status( 200 ).send({})
    return;
})

export default router;