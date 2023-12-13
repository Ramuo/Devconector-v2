import express from "express";
import {
    register,
    logout
} from '../controllers/userControllers.js';

import {check, validationResult} from 'express-validator'



const router = express.Router();


router.route('/').post([
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({min: 6})
], register);

router.route('/logout').post(logout);

export default router;