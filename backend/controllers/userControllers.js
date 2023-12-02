import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

//@desc     Register User
//@route    POST /api/users
//@access   Public
const register = asyncHandler(async(req, res) => {
    res.json(' Register user');
});

export {
    register
}