import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

//@desc     Login User
//@route    POST /api/auth/login
//@access   Public
const login = asyncHandler(async(req, res) => {
    res.json(' Login user');
});

//@desc     Get User By Id
//@route    POST /api/auth
//@access   Public
const getUser = asyncHandler(async(req, res) => {
    res.json(' get user');
});

export {
   login,
   getUser
}