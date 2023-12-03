import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import gravatar from 'gravatar';
import generateToken from '../utils/generateToken.js'
import {check, validationResult} from 'express-validator'

//@desc     Register User
//@route    POST /api/users
//@access   Public
const register = asyncHandler(async(req, res) => {
    //Validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    // Find user by email
    const userExist = await User.findOne({email});

    // Check if user exist alredy
    if(userExist){
        res.status(400);
        throw new Error("L'utilisateur existe déja")
    };

    //Gravatar 
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    //TO Cretate new user if he doesn't exist
    const user = await User.create({
        name,
        email,
        avatar,
        password
    });

    //Once user created, then set him into DB
    if(user){
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        })
    }else{
        res.status(400);
        throw new Error("Information invalide");
    }
    
});

export {
    register
}