import express from 'express';
import { Auth } from '../../controllers';
const router = express.Router();


// @route POST 
// @desc sign out a user
// @access public
router.post('/', Auth.signout );


// @route GET
// @desc Sign out a user
// @access public
router.get('/', Auth.signout );

export default router;