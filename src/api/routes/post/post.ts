import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequest, NotAuthorizedError } from '../../errors';

import { Comment, Link, Vote } from '../../models';
import { unfurl } from 'unfurl.js';

import { currentUser, requireAuth, validateRequest } from '../../middlewares';
import { Post as PostController } from '../../controllers';
const router = express.Router();

// @route POST 
// @desc sign up a user
// @access public

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
    PostController.createPost
)
router.get('/', currentUser, PostController.readPosts)
router.get('/:postId', currentUser, PostController.readPost );
router.put('/:postId', currentUser, PostController.updatePost);
router.delete('/:postId', currentUser, PostController.removePost)


export default router;