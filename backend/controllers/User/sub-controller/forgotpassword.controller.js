const User = require('../../../models/user.models');

const jwt = require('jsonwebtoken');


// forgot password 
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({success:false, message: "User Not Found" });
        }
        // generate token
        const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_FORGOT_PASSWORD, { expiresIn: '5m' });

        // generate opt 6 digit
