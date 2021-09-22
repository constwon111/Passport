const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");

PassportStrategy = function (passport) {
    passport.use(
        new NaverStrategy(
            {
                clientID: "p_kACq4lnv13V2dejrmy",
                clientSecret: "U5iiwh9b36",
                callbackURL:
                    "http://localhost:5000/api/users/auth/naver/callback",
            },
            function (accessToken, refreshToken, profile, done) {
                // console.log(accessToken);
                // console.log(profile);
                User.findOne(
                    {
                        naverId: profile.id,
                    },
                    function (err, user) {
                        if (!user) {
                            user = new User({
                                naverId: profile.id,
                                // name: profile.displayName,
                                email: profile.emails[0].value,
                                username: profile.displayName,
                                // provider: "naver",
                                // naver: profile._json,
                            });
                            user.save(function (err) {
                                if (err) console.log(err);
                                return done(err, user);
                            });
                        } else {
                            return done(err, user);
                        }
                    }
                );
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID:
                    "108465165695-90gk45hmb4gfehvh2e9k5hbh1sc05i7u.apps.googleusercontent.com",
                clientSecret: "M2dXoiaeYBaWrZUnzFV_JPCs",
                callbackURL: "/api/users/auth/google/callback",
            },

            function (accessToken, refreshToken, profile, done) {
                // console.log(profile);
                // console.log(profile.emails[0].value);
                // done(null, profile);
                User.findOne({ googleId: profile.id }, function (err, user) {
                    if (err) done(err, null);
                    else {
                        if (!user) {
                            const user = new User({
                                email: profile.emails[0].value,
                                googleId: profile.id,
                                username: profile.name.givenName,
                            });
                            user.save(function (err) {
                                if (err) console.log(err);
                                return done(err, user);
                            });
                        }
                        done(null, user); //여기서 넘기는 애가 serialize로 들어감
                    }
                });
            }
        )
    );
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (email, password, done) => {
                //req.body에 있는 email, password
                // Match user
                User.findOne({
                    email: email,
                }).then((user) => {
                    if (!user) {
                        return console.log("유저가 없습니다");
                        // res.json({
                        //     loginsucess: false,
                        //     message: "that email is not registered",
                        // })
                        // done(err, false, {
                        //     message: "That email is not registered",
                        //     // 이렇게 보내면 HEAD를 두개 썼다는 오류 뜸
                        // }
                        // )
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) console.log("err");
                        if (isMatch) {
                            return done(null, user), console.log("로그인성공!");
                        } else {
                            return console.log("로그인실패 , 비밀번호 오류");
                            // done(null, false, {
                            //     message: "Password incorrect",
                            // })
                        }
                    });
                });
            }
        )
    );

    passport.serializeUser(function (user, done) {
        // console.log("user.id === ", user.id);
        // console.log("user._id===", user._id);
        // console.log("seial", user);
        done(null, user._id);

        // done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        // console.log(id);
        User.findById(id, function (err, user) {
            // console.log(user);

            done(err, user);
        });
    });
};

// PassportGoogle = function (passport) {
//     passport.use(
//         new GoogleStrategy(
//             {
//                 clientID:
//                     "108465165695-90gk45hmb4gfehvh2e9k5hbh1sc05i7u.apps.googleusercontent.com",
//                 clientSecret: "M2dXoiaeYBaWrZUnzFV_JPCs",
//                 callbackURL: "auth/google/callback",
//             },
//             function (accessToken, refreshToken, profile, cb) {
//                 console.log(profile);
//                 cb(null, profile);
//                 // User.findOrCreate(
//                 //     { googleId: profile.id },
//                 //     function (err, user) {
//                 //         return cb(err, user);
//                 //     }
//                 // );
//             }
//         )
//     );
// };

module.exports = { PassportStrategy };
