import express, { Request, Response } from 'express';

import { Comment, Link, Search } from '../../models';


import { currentUser, requireAuth } from '../../middlewares';

const router = express.Router();



// development only
router.delete('/', 
    async ( req: Request, res: Response ) => {
    

        try{
            await Search.deleteMany({});
            return res.status( 200 ).send({ })

        } catch( e ){
            console.log( e );
            return res.status( 500 ).send({ })

        }

});

router.delete('/:id', 
    async ( req: Request, res: Response ) => {


        const id = req.params.id;
        if( !id ) return res.status( 400 ).send({ });
        try{

            await Search.findByIdAndDelete( id );
            return res.status( 200 ).send({ })


        } catch( e ){
            console.log({ e });
            return res.status( 500 ).send({ });
        }

});


router.get('/', currentUser, requireAuth,
 async ( req: Request, res: Response ) => {

    const { q } = req.body;


    const createdAt = Date.now();

        const regex = new RegExp( escapeRegex( q ), 'gi' );
        console.log({ regex });
        try{
            const results = await Comment.find({ 
                $or:[{ title: regex}, { content: regex }]
            });
    
            const search = Search.build({
               author: req.currentUser.id,
               query: q,
               created_at: createdAt
            });
            await search.save();

    
    
        return res.status( 200 ).send({ data: results });

        } catch( e ){
            console.log({ e });
            return res.status( 200 ).send({ errors: [ e ] });
        }
})

function escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// @route 
// @desc 
// @access 
router.get('/history', currentUser, async ( req: Request, res: Response ) => {
 
    try{
        const id = req.currentUser.id;
        const searches = await Search.find({author: id }).sort({ created_at: -1 });
        return res.status( 200 ).send({ searches });
    } catch( e ){
        console.log( { e });
        return res.status( 500 ).send({ errors: [ e ]});
    }

    return;
})

// @route 
// @desc 
// @access 
router.get('/:id', async ( req: Request, res: Response ) => {
    
    res.status(200).send({})
    return;
});

router.get('/all', [
    currentUser, requireAuth
], async ( req: Request, res: Response ) => {


    //requireAdmin middleware

    console.log("Get all searches.")

    try{
        const searches = await Search.find();
        
        return res.status( 200 ).send( searches );

    } catch( e ){
        res.status( 500 ).send({ errors:[ e ]});
    }
    res.status(200).send({})
    return;
})



export default router;