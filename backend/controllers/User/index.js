
const login = require('./sub-controller/login.controller');
const register = require('./sub-controller/register.controller');
const {userInfo, userProfile} = require('./sub-controller/userinfo.controller');
const inspectUser = require('./sub-controller/inspectuser.controller');



module.exports = {
    login,
    register,
    userInfo,
    userProfile,
    inspectUser
}