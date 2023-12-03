import express from "express";
import {
    register,
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


export default router;