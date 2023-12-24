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
    .get(protect, getPosts);
router.route('/like/:id').put(protect, likePost);
router.route('/unlike/:id').put(protect, unlikePost);
router.route('/comment/:id').post(protect, commentPost);
router.route('/comment/:id/:comment_id').delete(protect, deleteComment);
router.route('/:id')
    .get(protect, getPost)
    .delete(protect, deletePost);

export default router;