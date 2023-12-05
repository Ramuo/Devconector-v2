import express from "express";
import {
    createPost,
    getPosts,
    getPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment
} from '../controllers/postControllers.js';

import { protect } from "../middleware/authMiddleware.js";



const router = express.Router();


router.route('/')
    .post(protect, createPost)
    .get(getPosts);
router.route('/like/:id').put(likePost);
router.route('/unlike/:id').put(unlikePost);
router.route('/comment/:id').post(commentPost);
router.route('/comment/:id/:id').delete(deleteComment);
router.route('/:id')
    .get(getPost)
    .delete(deletePost);

export default router;