const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const authController = require("../controllers/authController");

router.post("/register", async (req, res) => {
    try {
        const { username, email, password, password2 } = req.body;
        let errors = [];

        if (!username || !email || !password || !password2) {
            errors.push({ message: "Please enter all fields" });
        }

        if (password != password2) {
            errors.push({ message: "Passwords do not match" });
        }

        if (password.length < 6) {
            errors.push({ message: "Password must be at least 6 characters" });
        }

        if (errors.length > 0) {
            res.json({
                registerSuccess: false,
                message: errors,
            });
        } else {
            let user = await User.findOne({ email });
            if (!user) {
                user = new User({
                    username,
                    email,
                    password,
                });
                await user.save();
                res.json({
                    registerSuccess: true,
                });
            } else {
                res.json({
                    registerSuccess: false,
                    message: "Email already exists",
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
});

// Login
router.post("/login", (req, res, next) => {
    console.log("loinpage");
    passport.authenticate("local", (err, user) => {
        if (err) {
            return res.json({
                message: "아이디 혹은 비밀번호 오류입니다",
            });
        }
        if (!user) {
            return res.json({
                message: "아이디 혹은 비밀번호 오류입니다",
            });
        }
        req.logIn(user, function (err1) {
            if (err1) {
                return next(err1);
            }

            return res.json({
                loginSuccess: true,
                info: req.body,
            });
        });
    })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
    if (req.user) {
        req.logout();
        res.json({ logoutSuccess: true });
    } else {
        res.json({
            logoutSuccess: false,
            message: "Logout failed, You must login frist",
        });
    }
});
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("http://localhost:3000");
    }
);

router.get("/getUser", (req, res) => {
    res.json(req.user);
});

router.get(
    "/auth/naver",
    passport.authenticate("naver", { scope: ["profile", "email"] })
);

router.get(
    "/auth/naver/callback",
    passport.authenticate("naver", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("http://localhost:3000");
    }
);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// router.get();

module.exports = router;
