import Post from '../models/postModel.js';
import User from '../models/userModel.js'
import asyncHandler from '../middleware/asyncHandler.js';

//@desc     Create Post
//@route    POST api/posts
//@access   Private
const createPost = asyncHandler(async(req, res) => {
    //const user = await Post.findById(req.user.id).select('-password');
    const user = await User.findById(req.user.id).select('-password');
   
    const newPost = new Post ({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    });

    if(newPost){
        const post = await newPost.save();
        res.status(200).json(post);
    }else{
        res.status(400);
        throw new Error('Publication créée avec succès')
    }
    
});

//@desc     Get all posts
//@route    GET api/posts
//@access   Private
const getPosts = asyncHandler(async(req, res) => {
    res.json(' Get all posts');
});

//@desc     Get post by ID
//@route    GET api/posts/:id
//@access   Private
const getPost = asyncHandler(async(req, res) => {
    res.json(' Get post By Id');
});

//@desc     Delete a post
//@route    DELETE api/posts/:id
//@access   Private
const deletePost = asyncHandler(async(req, res) => {
    res.json(' Delete Post');
});

//@desc     Like post
//@route    PUT api/posts/like/:id
//@access   Private
const likePost = asyncHandler(async(req, res) => {
    res.json(' Like Post');
});

//@desc     Unlike post
//@route    PUT api/posts/unlike/:id
//@access   Private
const unlikePost = asyncHandler(async(req, res) => {
    res.json(' unLike Post');
});

//@desc     Comment on a post
//@route    POST api/posts/comment/:id
//@access   Private
const commentPost = asyncHandler(async(req, res) => {
    res.json(' comment Post');
});

//@desc     Delete comment
//@route    DELETE api/posts/comment/:id/:comment_id
//@access   Private
const deleteComment = asyncHandler(async(req, res) => {
    res.json(' Delete comment');
});

export {
    createPost,
    getPosts,
    getPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment
}