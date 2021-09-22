const mongoose = require("mongoose");
const crypto = require("crypto");
const saltRounds = 10;
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: false,
    // },
    googleId: {
        type: String,
        required: false,
    },
    naverId: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    passwordConfirm: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
});
UserSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    console.log(resetToken, this.passwordResetToken);

    return resetToken;
};

// userSchema.methods.generateToken = function (cb) {
//     var user = this;
//     var token = jwt.sign(user._id.toHexString(), "secretToken");
//     user.token = token;
//     user.save(function (err, user) {
//         if (err) return cb(err);
//         cb(null, user);
//     });
// };

// userSchema.statics.findByToken = function (token, cb) {
//     var user = this;

//     jwt.verify(token, "secretToken", function (err, decoded) {
//         user.findOne({ _id: decoded, token }, function (err, user) {
//             if (err) return cb(err);
//             cb(null, user);
//         });
//     });
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
