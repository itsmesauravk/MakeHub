
const login = require('./sub-controller/login.controller');
const register = require('./sub-controller/register.controller');
const {userInfo, userProfile} = require('./sub-controller/userinfo.controller');
const inspectUser = require('./sub-controller/inspectuser.controller');

const followController = require('./sub-controller/follow.controller');

const {updateProfile, updatePrivacy} = require('./sub-controller/updateprofile.controller');



module.exports = {
    login,
    register,
    userInfo,
    userProfile,
    inspectUser,
    followController,
    updateProfile,
    updatePrivacy
}