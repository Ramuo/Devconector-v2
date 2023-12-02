import express from "express";
import {
    login,
    getUser
} from '../controllers/authController.js'



const router = express.Router();


router.route('/login').post(login);
router.route('/:id').get(getUser);


export default router;