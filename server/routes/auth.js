const express = require("express");
const router = express.Router();
// const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
//
// Welcome Page
// router.get("/", forwardAuthenticated, (req, res) => {
//     console.log("wow you are in home");
// });
router.get("/", (req, res) => {
    // console.log("i am in serverRouter");
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        // console.log("isAuth : true");
        res.json({
            isAuth: true,
        });
    } else res.json({ isAuth: false });
    // res.redirect("/login");
});

// Dashboard
// router.get("/dashboard", ensureAuthenticated, (req, res) =>
//     res.send("dashboard")
// );

module.exports = router;
