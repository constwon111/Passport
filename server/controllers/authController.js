const User = require("../models/User");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

exports.forgotPassword = async (req, res, next) => {
    // 1)Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.log("there is no user in forgotPassword");
        next();
    }

    //2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    //if I dont make this option, Schema pre-check the rule so it could make error
    //3) send it to user's email
    const resetURL = `${req.protocol}://${req.get(
        "host"
    )}/api/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't , ignore this`;
    sendEmail({
        email: user.email,
        subject: "Your password reset token ( vaild for 10min)",
        message,
    }).catch((err) => {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.save({ validateBeforeSave: false }, (err) => {
            if (err) console.log(err);
        });
        return next(err);
    });

    res.status(200).json({
        status: "success",
        message: "Token sent to email!",
    });
};

exports.resetPassword = async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }, //greater than
    });
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        console.log(
            "there is no user in resetPassword/ Token is invalid or has expired"
        );
        return next();
    }
    if (req.body.password != req.body.passwordConfirm) {
        console.log("비밀번호와 비밀번호확인이 일치하지 않습니다");
        return next();
    }
    user.password = req.body.password;
    user.passwordConfirm = undefined;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        resetPassword: true,
    });
    // 3) Update changedPasswordAt property for the user
    //4) Log the user in, send JWT
};
