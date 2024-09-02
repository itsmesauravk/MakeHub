const express = require('express');
const router = express.Router();

const { login, register, userInfo, userProfile, inspectUser,
    followController,
    updateProfile, updatePrivacy

 } = require('../controllers/User/index');
const uploader = require('../Utils/multer');



//routes
router.post('/login', login);
router.post('/signup', register);
router.get('/user-info', userInfo);
router.get('/user-profile/:slug', userProfile)

router.get('/inspect-user/:userId', inspectUser);

//follow , unfollow
router.post('/follow-unfollow', followController);


// profile updates
router.patch('/update-profile', uploader.single('image') ,updateProfile);
router.patch('/update-privacy', updatePrivacy);


module.exports = router;