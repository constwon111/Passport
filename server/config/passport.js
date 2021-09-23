const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

PassportStrategy = function (passport) {
    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
                clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
                callbackURL: process.env.PASSPORT_NAVER_CALLBACK_URL,
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    //const 쓰면 안됨
                    let user = await User.findOne({ naverId: profile.id });
                    if (!user) {
                        user = new User({
                            naverId: profile.id,
                            email: profile.emails[0].value,
                            username: profile.displayName,
                        });
                        await user.save();
                    }
                    return done(null, user);
                } catch (err) {
                    console.log(err);
                }
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
                clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK_URL,
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    //const 쓰면 안됨
                    let user = await User.findOne({ googleId: profile.id });
                    if (!user) {
                        user = new User({
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            username: profile.name.givenName,
                        });
                        await user.save();
                    }
                    return done(null, user);
                } catch (err) {
                    console.log(err);
                }
            }
        )
    );
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            //email, password 는 req.body의 값
            async (email, password, done) => {
                try {
                    let user = await User.findOne({ email });
                    if (!user)
                        throw new Error("there is no user with that email");

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw new Error("유저가 없습니다");
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            //done(null,false,{message : ""}) 로 쓸 수 있음, flash메세지 이용할때
                            return done(true);
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};

module.exports = { PassportStrategy };
