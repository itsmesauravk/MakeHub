const express = require('express');
const router = express.Router();

const { login, register, userInfo, userProfile, inspectUser } = require('../controllers/User/index');



//routes
router.post('/login', login);
router.post('/signup', register);
router.get('/user-info', userInfo);
router.get('/user-profile/:slug', userProfile)

router.get('/inspect-user/:userId', inspectUser);


module.exports = router;