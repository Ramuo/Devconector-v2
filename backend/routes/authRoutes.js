import express from "express";
import {
    login,
    getUser
} from '../controllers/authController.js'

import {protect} from '../middleware/authMiddleware.js';


const router = express.Router();


router.route('/login').post(protect, login);
router.route('/:id').get(getUser);


export default router;