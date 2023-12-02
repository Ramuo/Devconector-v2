import express from "express";
import {
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
} from '../controllers/profileContollers.js'



const router = express.Router();

router.route('/')
    .post(createUpdateProfile)
    .get(getProfiles)
    .delete(deleteProfile);
router.route('/me').get(getProfile);
router.route('/experience').put(addExperience);
router.route('/education').put(addEducation);
router.route('/user/:id').get(getProfilesById);
router.route('/experience/:id').delete(deleteExperience);
router.route('/education/:id').delete(deleteEducation);
router.route('/github/:id').get(getGithub);




export default router;