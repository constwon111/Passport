const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");
const authController = require("../controllers/authController");

// const { forwardAuthenticated } = require("../config/auth");

// Login Page
// router.get("/login", (req, res) => res.send("login"));

// // Register Page
// router.get("/register", (req, res) => res.send("register"));

// Register
router.post("/register", (req, res) => {
    // console.log("iam register");
    console.log(req.body);
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
        errors.push({ message: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
        console.log(errors);

        res.json({
            registerSuccess: false,
            detail: errors,
        });
    } else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                errors.push({ message: "Email already exists" });
                res.json({
                    registerSuccess: false,
                    message: "이미 등록된 이메일입니다",
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => {
                                res.json({
                                    registerSuccess: true,
                                });

                                // res.redirect("/users/login");
                            })
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post("/login", (req, res, next) => {
    console.log("loinpage");
    passport.authenticate("local", (err, user) => {
        if (err) {
            return res.json({
                message: "authenticat 아래 에러가 있습니다",
            });
        }
        if (!user) {
            return res.json({
                message: "아이디 혹은 비밀번호 오류입니다",
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
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
        console.log("로그인되지 않았습니다.");
        res.json({
            logoutSuccess: false,
            message: "logout failed",
        });
    }
    // res.redirect("/use rs/login");
});
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        // console.log("wow you are in cb of google");
        // Successful authentication, redirect home.
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
        // console.log("wow you are in cb of naver");
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000");
    }
);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// router.get();

module.exports = router;
