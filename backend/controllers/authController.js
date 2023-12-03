import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

//@desc     Login User
//@route    POST /api/auth/login
//@access   Public
const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    //Let us find a user
    const user = await User.findOne({email});

    //Let us validate user credentials
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }else{
        res.status(401);
        throw new Error("Email ou mot de passe invalide")
    };
    
});

//@desc     Get Current user
//@route    POST /api/auth/:id
//@access   Public
const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404);
        throw new Error("Utilisateur non trouvé")
    }
});

export {
   login,
   getUser
}