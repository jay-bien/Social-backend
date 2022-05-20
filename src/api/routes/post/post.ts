import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';
import { RequestValidationError } from '../../errors/request-validation';

import { Comment, Link, Vote } from '../../models';
import { unfurl } from 'unfurl.js';

import { currentUser, requireAuth, validateRequest } from '../../middlewares';

const router = express.Router();

// @route POST 
// @desc sign up a user
// @access public


// development only
router.delete('/',
    async (req: Request, res: Response) => {

        await Comment.deleteMany({});
        const comments = await Comment.find({});
        return res.status(200).send({ comments })
    });


router.post('/', currentUser, requireAuth, [

    body('title').
        trim()
        .not()
        .isEmpty()
        .withMessage('title is invalid'),
    body('content')
        .trim(),
    body('type')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Must specify post type.")
],
    validateRequest,
    async (req: Request, res: Response) => {



        const { title, link, content, type, categories, tags } = req.body;

        const user = req.currentUser;
        const userId = user?.id;

        if (!userId) {
            throw new NotAuthorizedError()
        }

        const createdAt = Date.now();
        let linkId = null;

        if (type === "text") {

        } else if (type === "link") {

            if (link) {
                const unfurlResult = await unfurl(link);
                const linkDoc = Link.build({ url: link, metadata: unfurlResult, created_at: createdAt });
                await linkDoc.save();
                linkId = linkDoc._id;
            }


        } else {
            throw new BadRequest("Please specify valid type")
        }



        try {
            const commentDoc = Comment.build({
                title,
                link: linkId,
                content,
                author: userId,
                parentId: "",
                rootId: "",
                categories,
                tags,
                type,
                created_at: createdAt,
            });

            await commentDoc.save();
            return res.status(201).send({ data: commentDoc });

        } catch (e) {
            console.log({ e });
        }


        return res.status(200).send({ data: null });




    })


// @route 
// @desc 
// @access 
router.get('/', currentUser, async (req: Request, res: Response) => {

    try {
        const body = req.body;




        let allComments = [];

        allComments = await Comment.find({}).populate('link').sort({ "created_at": -1 });

        let aggComments = await Comment.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "userR"
                }
            },

            {
                $addFields: {
                    currentAuth: "$author",

                },
            },
        ]);


        console.log({ allComments });

        //   console.log({ allVotes });
        return res.status(200).send(allComments);



        let uuu = req.currentUser;
        if (req.currentUser) {

            const votes = await Vote.find({ author: req.currentUser.id });
            let modComments = allComments.map(comment => {

                for (let i = 0; i < votes.length; i++) {
                    if ("" + votes[i].commentId === "" + comment._id) {
                        comment.sentiment = votes[i].direction;
                    }
                }

                return comment;

            })

        }



        return res.status(200).send({ comments: allComments });

    } catch (e) {
        console.log({ e });
        return res.status(500).send({ errors: [{ msg: "An error has occurred" }] });
    }



})

// @route 
// @desc 
// @access 
router.get('/:id', async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        const comment = await Comment.findById(id).populate('link');


        return res.status(200).send({ comment });

    } catch (e) {
        console.log({ e });
    }

    res.status(200).send({})
    return;
})

router.delete("/:comment_id", async (req: Request, res: Response) => {


    try {
        const id = req.params.comment_id;
        const del = await Comment.findByIdAndRemove(id);

        return res.status(200).send(del);
    } catch (e) {
        console.log({ e });
        return res.status(500).send({ errors: [e] })

    }
})

router.put("/", async (req: Request, res: Response) => {

    return res.status(200).send({});
})

export default router;