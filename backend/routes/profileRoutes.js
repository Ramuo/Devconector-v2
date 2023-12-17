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
import {protect} from '../middleware/authMiddleware.js'


const router = express.Router(); 

router.route('/')
    .post(protect, createUpdateProfile)
    .get(getProfiles)
    .delete(protect, deleteProfile);
router.route('/me').get(protect, getProfile);
router.route('/experience').put(protect, addExperience);
router.route('/education').put(protect, addEducation);
router.route('/user/:id').get(getProfilesById);
router.route('/experience/:id').delete(protect, deleteExperience);
router.route('/education/:id').delete(protect, deleteEducation);
router.route('/github/:username').get(getGithub);




export default router; 