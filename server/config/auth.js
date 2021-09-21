// module.exports = {
//     ensureAuthenticated: function (req, res, next) {
//         if (req.isAuthenticated()) {
//             // console.log(req.isAuthenticated());
//             res.json({
//                 isAuth: true,
//             });
//             // return next();
//         } else {
//             console.log("error_msg", "Please log in to view that resource");
//             res.json({
//                 isAuth: false,
//             });
//         }

//         // res.redirect("/users/login");
//     },
//     forwardAuthenticated: function (req, res, next) {
//         if (!req.isAuthenticated()) {
//             res.json({ isAuth: false });
//             // return next();
//         } else {
//             console.log("Now you can enter to the dashboard");

//             res.json({
//                 isAuth: true,
//             });
//             // res.redirect("/dashboard");
//         }
//     },
// };
