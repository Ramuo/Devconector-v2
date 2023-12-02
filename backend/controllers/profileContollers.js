import Profile from '../models/profileModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

//@desc     Get current user profile
//@route    GET api/profile/me
//@access   Private
const getProfile = asyncHandler(async(req, res) => {
    res.json(' Get current user profile');
});

//@desc     Create or update user profile
//@route    POST api/profile
//@access   Private
const createUpdateProfile = asyncHandler(async(req, res) => {
    res.json('  Create or update user profile');
});

//@desc     Get all profiles
//@route    GET api/profile
//@access   Private
const getProfiles = asyncHandler(async(req, res) => {
    res.json('  Get all profiles');
});

//@desc     Get profile by user ID
//@route    GET api/profile/user/:user_id
//@access   Private
const getProfilesById = asyncHandler(async(req, res) => {
    res.json('  Get profile by user ID');
});

//@desc     Delete profile, user & posts
//@route    DELETE api/profile
//@access   Private
const deleteProfile = asyncHandler(async(req, res) => {
    res.json(' Delete profile, user & posts');
});

//@desc     Add profile experience
//@route    PUT api/profile/experience
//@access   Private
const addExperience = asyncHandler(async(req, res) => {
    res.json(' Add profile experience');
});

//@desc     Delete experience from profile
//@route    DELETE api/profile/experience/:exp_id
//@access   Private
const deleteExperience = asyncHandler(async(req, res) => {
    res.json(' Delete experience from profile');
});

//@desc     Add profile education
//@route    PUT api/profile/education
//@access   Private
const addEducation = asyncHandler(async(req, res) => {
    res.json('  Add profile education');
});

//@desc     Delete education from profile
//@route    DELETE api/profile/education/:edu_id
//@access   Private
const deleteEducation = asyncHandler(async(req, res) => {
    res.json(' Delete education from profile');
});

//@desc     Get user repos from Github
//@route    Get api/profile/github/:username
//@access   Private
const getGithub = asyncHandler(async(req, res) => {
    res.json(' Get user repos from Github');
});

export {
    getProfile,
    createUpdateProfile,
    getProfiles,
    getProfilesById,
    deleteProfile,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    getGithub
}