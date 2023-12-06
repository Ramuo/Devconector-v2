import Post from '../models/postModel.js';
import User from '../models/userModel.js'
import asyncHandler from '../middleware/asyncHandler.js';

//@desc     Create Post
//@route    POST api/posts
//@access   Private
const createPost = asyncHandler(async(req, res) => {
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
        throw new Error("Publication non créée, une erreur s'est produite")
    }
    
});

//@desc     Get all posts
//@route    GET api/posts
//@access   Private
const getPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find().sort({date: -1});

    if(posts){
        res.status(200).json(posts)
    }else{
        res.status(404);
        throw new Error("Aucune publication trouvé")
    }
});

//@desc     Get post by ID
//@route    GET api/posts/:id
//@access   Private
const getPost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);

    if(post){
        res.status(200).json(post)
    }else{
        res.status(404);
        throw new Error("Aucune publication trouvé")
    }
});

//@desc     Delete a post
//@route    DELETE api/posts/:id
//@access   Private
const deletePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);

    if(post){
    if(post.user.toString() !== req.user.id){
        res.status(400);
        throw new Error("Vous ne pouver pas supprimé la publication d'un autre utilisateur")
    }
    await Post.deleteOne({_id: post._id});
    res.status(200).json({msg: "Publication supprimée avec succès"})
    }else{
    res.status(404);
    throw new Error("Publication non supprimée, une erreur s'est produite")
    }  
});

//@desc     Like post
//@route    PUT api/posts/like/:id
//@access   Private
const likePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);

    if(post){
        if(post.likes.filter((like) => like.user.toString() === req.user.id).length > 0){
            res.status(400).json({msg: "Vous avez déjà liké cette Publication"})
        } 
        
        post.likes.unshift({user: req.user.id});

        await post.save();

        res.status(200).json(post.likes);
    }else{
    res.status(404);
    throw new Error("Publication non supprimée, une erreur s'est produite")
    } 
});

//@desc     Unlike post
//@route    PUT api/posts/unlike/:id
//@access   Private
const unlikePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);

    if(post){
        if(post.likes.filter((like) => like.user.toString() === req.user.id).length === 0){
            res.status(400).json({msg: "Vous n'avez pas liké cette Publication encore"})
        } 
        
        // remove the like
        post.likes = post.likes.filter(({user}) => user.toString() !== req.user.id)
        
        await post.save();

        res.status(200).json(post.likes);
    }else{
    res.status(404);
    throw new Error("Publication non supprimée, une erreur s'est produite")
    } 
});

//@desc     Comment on a post
//@route    POST api/posts/comment/:id
//@access   Private
const commentPost = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();
        res.status(200).json(post.comments);
    } catch (error) {
        console.error(err.message);
        res.status(404);
        throw new Error("Publication non créée, une erreur s'est produite")
    }
});

//@desc     Delete comment
//@route    DELETE api/posts/comment/:id/:comment_id
//@access   Private
const deleteComment = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);

    if(post){
        // Pull out comment
        const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

        // Make sure comment exists
        if(!comment){
           return res.status(404).json({msg: "Ce commentaire n'existe pas"})
        };

        // Check user
        if(comment.user.toString() !== req.user.id){
            res.status(401).json({msg: "Vous êtes pas authorisé"})
        };

        post.comments = post.comments.filter(({id}) => id !== req.params.comment_id);

        await post.save();

        res.status(200).json(post.comments);
    }else{
        res.status(404);
        throw new Error("Commentaire non créée, une erreur s'est produite")
    }
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