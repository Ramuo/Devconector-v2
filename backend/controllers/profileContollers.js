import Profile from '../models/profileModel.js';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import normalize from 'normalize-url';



//@desc     Get current user profile
//@route    GET api/profile/me
//@access   Private
const getProfile = asyncHandler(async(req, res) => {
    // const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
    const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);

    
    //Check if profile
    if(profile){
        res.status(200).json(profile)
    }else{
        res.status(404);
        throw new Error("Pas de profil pour cet utilisateur");
    }
});

//@desc     Create or update user profile
//@route    POST api/profile
//@access   Private
const createUpdateProfile = asyncHandler(async(req, res) => {
   // destructure the request
   const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

  // build a profile
  const profileFields = {
    user: req.user.id,
    website:
      website && website !== ''
        ? normalize(website, { forceHttps: true })
        : '',
    skills: Array.isArray(skills)
      ? skills
      : skills.split(',').map((skill) => ' ' + skill.trim()),
    ...rest
  };

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalize(value, { forceHttps: true });
  }
  // add to profileFields
  profileFields.social = socialFields;

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//@desc     Get all profiles
//@route    GET api/profile
//@access   Public
const getProfiles = asyncHandler(async(req, res) => {
    const profile = await Profile.find().populate('user', ['name', 'avatar']);

    if(profile){
        res.status(200).json(profile)
    }else{
        res.status(404);
        throw new Error("Aucun Profil trouvé")
    }
});

//@desc     Get profile by user ID
//@route    GET api/profile/user/:user_id
//@access   Private
const getProfilesById = asyncHandler(async(req, res) => {
    
    const profile = await Profile.findOne({user: req.params.id}).populate('user', ['name', 'avatar']);

    // console.log(req.params.id)

    if(!profile ){
        res.status(404);
        throw new Error(`Aucun profil trouvé avec cet identifiant: ${req.params.id}`)
    }else{
        res.status(200).json(profile);
    };
});

//@desc     Delete profile, user & posts
//@route    DELETE api/profile
//@access   Private
const deleteProfile = asyncHandler(async(req, res) => {

  const profile = await Profile.findOne({user: req.user.id});
  console.log(profile)

  if(profile){
    await profile.deleteOne({user: req.user.id});
    await User.findByIdAndDelete({_id: req.user.id})
    res.status(200).json({message: 'Profil supprimé'});
  }else{
    res.status(404);
    throw new Error("Profil non trouvé")
  }

});

//@desc     Add profile experience
//@route    PUT api/profile/experience
//@access   Private
const addExperience = asyncHandler(async(req, res) => {
   const profile = await Profile.findOne({user: req.user.id});

   if(profile){
    profile.experience.unshift(req.body);

    await profile.save();

    res.status(200).json(profile);
   }else{
    res.status(404);
    throw new Error('Aucune Experience trouvée')
   }

});

//@desc     Delete experience from profile
//@route    DELETE api/profile/experience/:exp_id
//@access   Private
const deleteExperience = asyncHandler(async(req, res) => {
    const profile = await Profile.findOne({user: req.user.id});

    if(profile ){
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id);

      profile.experience.splice(removeIndex, 1)

      await profile.save();

      res.status(200).json(profile );
    }else{
      res.status(404);
      throw new Error("Expérience non supprimée, une erreur s'est produite")
    };
});

//@desc     Add profile education
//@route    PUT api/profile/education
//@access   Private
const addEducation = asyncHandler(async(req, res) => {
  const profile = await Profile.findOne({user: req.user.id});

  if(profile){
   profile.education.unshift(req.body);

   await profile.save();

   res.status(200).json(profile);
  }else{
   res.status(404);
   throw new Error('Aucune Experience trouvée')
  }
});

//@desc     Delete education from profile
//@route    DELETE api/profile/education/:edu_id
//@access   Private
const deleteEducation = asyncHandler(async(req, res) => {
  const profile = await Profile.findOne({user: req.user.id});

  if(profile ){
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id);

    profile.education.splice(removeIndex, 1)

    await profile.save();

    res.status(200).json(profile );
  }else{
    res.status(404);
    throw new Error("Expérience non supprimée, une erreur s'est produite")
  };
});

//@desc     Get user repos from Github
//@route    Get api/profile/github/:username
//@access   Private
const getGithub = asyncHandler(async(req, res) => {
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${GITHUB_TOKEN}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'Aucun profil github trouvé' });
  }
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